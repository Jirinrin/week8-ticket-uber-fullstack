// import User from "./users/entity";
import { NotFoundError, BadRequestError } from "routing-controllers";
import Ticket from "./tickets/entity";
import Comment from "./comments/entity";


function getAveragePrice(tickets: Ticket[]): number {
  return tickets
          .map(ticket => ticket.price)
          .reduce((sum, price) => sum + price)
          / tickets.length;
}

/// moet hier nog kijken hoe het createdAt geformat uit de database komt
function timeDuringBusinessHours(time: string): boolean {
  return true;
}

function fraudRiskAlgorithm(ticketsOfAuthor: number, averagePrice: number, price: number, createdAt: string, commentCount: number): number {
  let risk = 0;

  if (ticketsOfAuthor <= 1) risk += 10;

  const priceRisk: number = ((averagePrice - price) / averagePrice);
  risk += priceRisk < -10 ? priceRisk : -10;
  /// kijken of dat hier gewerkt heeft

  risk += timeDuringBusinessHours(createdAt) ? -10 : 10;
  
  if (commentCount > 3) risk += 5;

  if (risk < 5) return 5;
  if (risk > 95) return 95;
  return risk;
}

/// als de fraudRisk field nog niet null is ga dan intelligent doen... maar dat doen we gwn in de plek waar het gecalled wordt
export async function updateFraudRisks(tickets: Ticket[], commonFeature: 'event'|'author'): Promise<void> {
  switch (commonFeature) {
    case 'event':
      const avgPrice = await Ticket.find({eventId: tickets[0].eventId}).then(getAveragePrice);
      tickets.forEach(ticket => updateFraudRisk(ticket, avgPrice));
      break;
    case 'author':
      const authorTickets = await Ticket.find({authorId: tickets[0].authorId}).then(ts => ts.length);
      tickets.forEach(ticket => updateFraudRisk(ticket, undefined, authorTickets));
      break;
    default:
      tickets.forEach(ticket => updateFraudRisk(ticket));
  }
}

/// dit kan missch makkelijker door alles gewoon eagerly te laten loaden binnen ticket enzo zodat je het hele pakket in 1x kan sturen?
/// of nee beter: het gwn via een queryconstructor doen!
export async function updateFraudRisk(ticket: Ticket, avgPriceInherit?: number, authorTicketsInherit?: number) {
  let ticketComments: number|null = null;
  let avgPrice = avgPriceInherit || null;
  let authorTickets = authorTicketsInherit || null;

  const queries: Promise<number>[] = [ Comment.find({ticketId: ticket.id})
                                              .then(comments => ticketComments = comments.length) ];
  if (!avgPriceInherit) queries.push( Ticket.find({eventId: ticket.eventId})
                                            .then(tickets => avgPrice = getAveragePrice(tickets)) )
  if (!authorTicketsInherit) queries.push( Ticket.find({authorId: ticket.authorId})
                                                 .then(tickets => authorTickets = tickets.length) )

  await Promise.all(queries)
          .catch(e => {throw new BadRequestError(e)});

  if (authorTickets === null || ticketComments === null || avgPrice === null) {
    throw new NotFoundError('Cannot find certain information related to the ticket you are trying to update');
  }
  
  return fraudRiskAlgorithm(authorTickets, avgPrice, ticket.price, ticket.createdAt!, ticketComments);
}