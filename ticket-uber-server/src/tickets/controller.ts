import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, UnauthorizedError, Patch } from "routing-controllers";
import Ticket from "./entity";
import User from "../users/entity";
import Event from "../events/entity";

@JsonController()
export default class TicketController {
  
  @Get('/events/:eventId/tickets')
  async getTickets( @Param('eventId') eventId: number ) {
    /// oke maar wil de columns eigenlijk filteren zodat hij hier alleen de belangrijkste info laat zien?
    return { tickets: await Ticket.find({eventId})};
  }

  @Get('/events/:eventId/tickets/:id')
  async getTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number ) {
                                                 /// hoop dat dit werkt met via 'eventId' selecteren
    const ticket = await Ticket.findOne({eventId, id});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    return { ticket };
  }

  @Authorized()
  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket( @Param('eventId') eventId: number,
                      @Body() {description, pictureUrl, price}: Partial<Ticket>,
                      @CurrentUser() author: User ) {
    const event = await Event.findOne({id: eventId});
    if (!event) throw new NotFoundError('Cannot find an event with that id');

    /// bereken fraud-kans
    const fraudRisk = 50;

    return Ticket.create({
      /// denk dat dit goed gaat met picture url die ook null kan zijn?
      description, pictureUrl, price, fraudRisk,
      event, author
    }).save();
  }

  @Authorized()
  @Patch('/events/:eventId/tickets/:id')
  async putTicket( @Param('eventId') eventId: number,
                   @Param('id') id: number, 
                   @Body() body: Partial<Ticket>,
                   @CurrentUser() user: User ) {
    const ticket = await Ticket.findOne({eventId, id});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    if (user.id !== ticket.authorId) throw new UnauthorizedError(`Cannot update a ticket that is not your own`);

    return Ticket.merge(ticket, body).save();
  }

  @Authorized()
  @Delete('/events/:eventId/tickets/:id')
  @HttpCode(204)
  async deleteTicket( @Param('eventId') eventId: number,
                      @Param('id') id: number,
                      @CurrentUser() user: User ) {
    const ticket = await Ticket.findOne({eventId, id});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    if (user.id !== ticket.authorId) throw new UnauthorizedError(`Cannot delete a ticket that is not your own`);
    
    return Ticket.delete(id);
  }
}