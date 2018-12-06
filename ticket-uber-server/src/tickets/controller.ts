import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, UnauthorizedError, Patch, QueryParam } from 'routing-controllers';
import Ticket from './entity';
import User from '../users/entity';
import Event from '../events/entity';
import { updateFraudRisks } from '../fraudRiskAlgorithm';

@JsonController()
export default class TicketController {
  
  @Get('/events/:eventId/tickets')
  async getTickets( @Param('eventId') eventId: number,
                    @QueryParam('sortType') sortType: 'id'|'price'|'author',
                    @QueryParam('sortOrder') sortOrder: 'ASC'|'DESC' ) {
    // Still looking for a way to not have to load in so much superfluous data of 'event' and 'author'...
    return { tickets: await Ticket.find({
      relations: ['event', 'author'],
      where: {event: {id: eventId}},
      select: ['id', 'price', 'description', 'fraudRisk', 'author'],
      order: {[sortType]: sortOrder},
      cache: true
    })};
  }

  @Get('/events/:eventId/tickets/:id')
  async getTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number ) {
    const ticket = await Ticket.findOne({relations: ['event', 'author'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    return { ticket };
  }

  @Authorized(['admin', 'user'])
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

    await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');
    if (author.ticketIds.length + 1 === 2) {
      await updateFraudRisks(await Ticket.find({relations: ['author'], where: {author: {id: author.id}}}), 'author');
    }

    return Ticket.findOne({relations: ['author'], where: {id: newTicket.id}});
  }

  @Authorized(['admin', 'user'])
  @Patch('/events/:eventId/tickets/:id')
  async patchTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number, 
                   @Body() body: Partial<Ticket>,
                   @CurrentUser() user: User ) {
    const ticket = await Ticket.findOne({relations: ['event'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    if (!(user.id === ticket.authorId || user.role === 'admin')) {
      throw new UnauthorizedError(`Cannot update a ticket that is not your own`);
    }

    const newTicket = await Ticket.merge(ticket, body).save();
    if (body.price) await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');

    return Ticket.findOne({relations: ['author', 'event'], where: {id: newTicket.id}});
  }

  @Authorized(['admin', 'user'])
  @Delete('/events/:eventId/tickets/:id')
  @HttpCode(204)
  async deleteTicket( @Param('eventId') eventId: number,
                      @Param('id') id: number,
                      @CurrentUser() user: User ) {
    const ticket = await Ticket.findOne({relations: ['event'], where: {id, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    if (!(user.id === ticket.authorId || user.role === 'admin')) {
      throw new UnauthorizedError(`Cannot delete a ticket that is not your own`);
    }

    const deleteResult = await Ticket.delete(id);

    await updateFraudRisks(await Ticket.find({relations: ['event'], where: {event: {id: eventId}}}), 'event');
    if (user.ticketIds.length - 1 === 1) {
      updateFraudRisks(await Ticket.find({relations: ['author'], where: {author: {id: user.id}}}), 'author');
    }
    
    return deleteResult;
  }
}