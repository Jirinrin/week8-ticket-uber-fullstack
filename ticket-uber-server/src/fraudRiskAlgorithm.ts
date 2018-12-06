// import User from "./users/entity";
import { NotFoundError, BadRequestError } from "routing-controllers";
import Ticket from "./tickets/entity";
import Comment from "./comments/entity";


function getAveragePrice(tickets: Ticket[]): number {
  return tickets
          .map(ticket => Number(ticket.price))
          .reduce((sum, price) => sum + price)
          / tickets.length;
}

/// moet hier nog kijken hoe het createdAt geformat uit de database komt
function timeDuringBusinessHours(time: string): boolean {
  const hour = new Date(time).getHours();
  return hour >= 9 && hour < 17;
  // return true;
}

function fraudRiskAlgorithm(ticketsOfAuthor: number, averagePrice: number, price: number, createdAt: string, commentCount: number): number {
  let risk = 0;

  if (ticketsOfAuthor <= 1) risk += 10;

  console.log(risk);
  const priceRisk: number = ((averagePrice - price) / averagePrice) * 100;
  console.log('pricerisk: ' + priceRisk);
  risk += ((priceRisk > -10) ? priceRisk : -10);
  /// kijken of dat hier gewerkt heeft
  console.log(risk);

  risk += timeDuringBusinessHours(createdAt) ? -10 : 10;

  console.log(risk);
  
  if (commentCount > 3) risk += 5;

  console.log(risk);

  if (risk < 5) return 5;
  if (risk > 95) return 95;
  return risk;
}

/// als de fraudRisk field nog niet null is ga dan intelligent doen... maar dat doen we gwn in de plek waar het gecalled wordt
export async function updateFraudRisks(tickets: Ticket[], commonFeature: 'event'|'author'): Promise<Ticket[]|void> {
  if (!tickets[0]) return;
  switch (commonFeature) {
    case 'event':
      // const avgPrice = await Ticket.find({eventId: tickets[0].eventId}).then(getAveragePrice);
      const avgPrice = await Ticket.find({relations: ['event'], where: {event: {id: tickets[0].eventId}}}).then(getAveragePrice);
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket, avgPrice)));
    case 'author':
      // const authorTickets = await Ticket.find({authorId: tickets[0].authorId}).then(ts => ts.length);
      const authorTickets = await Ticket.find({relations: ['author'], where: {author: {id: tickets[0].authorId}}}).then(ts => ts.length);
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket, undefined, authorTickets)));
    default:
      return Promise.all(tickets.map(async ticket => await updateFraudRisk(ticket)));
  }
}

/// dit kan missch makkelijker door alles gewoon eagerly te laten loaden binnen ticket enzo zodat je het hele pakket in 1x kan sturen?
/// of nee beter: het gwn via een queryconstructor doen!
export async function updateFraudRisk(ticket: Ticket, avgPriceInherit?: number, authorTicketsInherit?: number): Promise<Ticket> {
  let ticketComments: number = 0;
  let avgPrice = avgPriceInherit || null;
  let authorTickets = authorTicketsInherit || null;

  // const queries: Promise<number>[] = [ Comment.find({ticketId: ticket.id})
  const queries: Promise<number>[] = [ Comment.find({relations: ['ticket'], where: {ticket: {id: ticket.id}}})
                                              .then(comments => ticketComments = comments.length) ];
  // if (!avgPriceInherit) queries.push( Ticket.find({eventId: ticket.eventId})
  if (!avgPriceInherit) queries.push( Ticket.find({relations: ['event'], where: {event: {id: ticket.eventId}}})
                                            .then(tickets => avgPrice = getAveragePrice(tickets)) );
  // if (!authorTicketsInherit) queries.push( Ticket.find({authorId: ticket.authorId})
  if (!authorTicketsInherit) queries.push( Ticket.find({relations: ['author'], where: {author: {id: ticket.authorId}}})
                                                 .then(tickets => authorTickets = tickets.length) );

  await Promise.all(queries)
          .catch(e => {throw new BadRequestError(e)});

  console.log(authorTickets, ticketComments, avgPrice);

  if (authorTickets === null || ticketComments === null || avgPrice === null) {
    throw new NotFoundError('Cannot find certain information related to the ticket you are trying to update');
  }
  
  /// moet eigenlijk ook iets van als het risico niet verandert dan return gelijk etc.
  ticket.fraudRisk = fraudRiskAlgorithm(authorTickets, avgPrice, ticket.price, ticket.createdAt!, ticketComments);
  return ticket.save();
}