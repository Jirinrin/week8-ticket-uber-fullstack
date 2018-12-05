import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, UnauthorizedError, Patch } from "routing-controllers";
import Ticket from "./entity";
import User from "../users/entity";
import Event from "../events/entity";
import { updateFraudRisks } from "../fraudRiskAlgorithm";

@JsonController()
export default class TicketController {
  
  @Get('/events/:eventId/tickets')
  async getTickets( @Param('eventId') eventId: number ) {
    // return { tickets: (await Ticket.find({eventId})).reverse() };
    // return { tickets: await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}).then(tickets => tickets.reverse()) };
    return { tickets: await Ticket.find({
      relations: ['event', 'author'], /// ahhhh darnit hij laadt zoveel onnodige info in!!
      where: {event: {id: eventId}},
      select: ['id', 'price', 'description', 'fraudRisk', 'author'],
      order: {id: "DESC"},
      cache: true
    })};
  }

  @Get('/events/:eventId/tickets/:id')
  async getTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number ) {
                                                 /// hoop dat dit werkt met via 'eventId' selecteren
    // const ticket = await Ticket.findOne({eventId, id});
    const ticket = await Ticket.findOne({relations: ['event', 'author'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    return { ticket };
  }

  @Authorized()
  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket( @Param('eventId') eventId: number,
                      @Body() content: Partial<Ticket>,
                      @CurrentUser() author: User ) {
    const event = await Event.findOne({id: eventId});
    if (!event) throw new NotFoundError('Cannot find an event with that id');

    const newTicket = await Ticket.create({
      ...content,
      event, author
    }).save();

    ///  hij update ze wel maar wil dat hij ze dus ook life in de redux dinges update!
    await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');
    const authorTickets: Ticket[] = await Ticket.find({relations: ['author'], where: {author: {id: author.id}}});
    if (authorTickets.length === 2) updateFraudRisks(authorTickets, 'author');

    return Ticket.findOne({id: newTicket.id});
  }

  @Authorized()
  @Patch('/events/:eventId/tickets/:id')
  async putTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number, 
                   @Body() body: Partial<Ticket>,
                   @CurrentUser() user: User ) {
    // const ticket = await Ticket.findOne({eventId, id});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    if (user.id !== ticket.authorId) throw new UnauthorizedError(`Cannot update a ticket that is not your own`);

    const newTicket = await Ticket.merge(ticket, body).save();
    if (body.price) await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');

    return Ticket.findOne({id: newTicket.id});
  }

  @Authorized()
  @Delete('/events/:eventId/tickets/:id')
  @HttpCode(204)
  async deleteTicket( @Param('eventId') eventId: number,
                      @Param('id') id: number,
                      @CurrentUser() user: User ) {
    // const ticket = await Ticket.findOne({eventId, id});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    /// testen dat hij hier wel dat relation-id kan lezen
    if (user.id !== ticket.authorId) throw new UnauthorizedError(`Cannot delete a ticket that is not your own`);
    
    await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');
    const authorTickets: Ticket[] = await Ticket.find({relations: ['author'], where: {author: {id: user.id}}});
    
    const deleteResult = await Ticket.delete(id);
    if (authorTickets.length === 1) updateFraudRisks(authorTickets, 'author');

    return deleteResult;
  }
}