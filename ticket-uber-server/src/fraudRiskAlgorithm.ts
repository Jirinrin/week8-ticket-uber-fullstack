import { NotFoundError, BadRequestError } from 'routing-controllers';
import Ticket from './tickets/entity';
import User from './users/entity';


function getAveragePrice(tickets: Ticket[]): number {
  return tickets
          .map(ticket => Number(ticket.price))
          .reduce((sum, price) => sum + price)
          / tickets.length;
}

function timeDuringBusinessHours(time: string): boolean {
  const hour = new Date(time).getHours();
  return hour >= 9 && hour < 17;
}

function fraudRiskAlgorithm(ticketsOfAuthor: number, averagePrice: number, price: number, createdAt: string, commentCount: number): number {
  let risk = 0;

  if (ticketsOfAuthor <= 1) risk += 10;

  const priceRisk: number = ((averagePrice - price) / averagePrice) * 100;
  risk += ((priceRisk > -10) ? priceRisk : -10);

  risk += timeDuringBusinessHours(createdAt) ? -10 : 10;

  if (commentCount > 3) risk += 5;

  if (risk < 5) return 5;
  if (risk > 95) return 95;
  return risk;
}

export async function updateFraudRisks(tickets: Ticket[], commonFeature: 'event'|'author'): Promise<Ticket[]|void> {
  if (!tickets[0]) return;
  switch (commonFeature) {
    case 'event':
      const avgPrice = await Ticket.find({relations: ['event'], where: {event: {id: tickets[0].eventId}}})
                                   .then(getAveragePrice);
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket, avgPrice)));
    case 'author':
      const authorTickets = await User.findOne({id: tickets[0].authorId})
                                      .then((user: User) => user.ticketIds.length);
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket, undefined, authorTickets)));
    default:
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket)));
  }
}

// Could also do all this fetching of data via a single QueryBuilder that embeds everything in the ticket
export async function updateFraudRisk(ticket: Ticket, avgPriceInherit?: number, authorTicketsInherit?: number): Promise<Ticket> {
  const oldFraudRisk: number|undefined = ticket.fraudRisk;
  let ticketComments: number = ticket.commentIds.length || 0;
  let avgPrice = avgPriceInherit || null;
  let authorTickets = authorTicketsInherit || null;

  const queries: Promise<number>[] = [];
  if (!avgPriceInherit) queries.push( Ticket.find({relations: ['event'], where: {event: {id: ticket.eventId}}})
                                            .then(tickets => avgPrice = getAveragePrice(tickets)) );
  if (!authorTicketsInherit) queries.push( User.findOne({id: ticket.authorId})
                                               .then((user: User) => authorTickets = user.ticketIds.length));

  await Promise.all(queries)
          .catch(e => {throw new BadRequestError(e)});

  if (authorTickets === null || ticketComments === null || avgPrice === null) {
    throw new NotFoundError('Cannot find certain information related to the ticket you are trying to update');
  }
  
  ticket.fraudRisk = fraudRiskAlgorithm(authorTickets, avgPrice, ticket.price, ticket.createdAt!, ticketComments);
  if (ticket.fraudRisk === oldFraudRisk) return ticket;
  return ticket.save();
}