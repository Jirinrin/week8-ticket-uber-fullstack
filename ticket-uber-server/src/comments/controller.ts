import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */ } from 'routing-controllers';
import Comment from './entity';
import User from '../users/entity';
import Ticket from '../tickets/entity';
import { updateFraudRisk } from '../fraudRiskAlgorithm';

@JsonController()
export default class CommentController {
  
  @Get('/events/:eventId/tickets/:ticketId/comments')
  async getComments( @Param('eventId') eventId: number,
                     @Param('ticketId') ticketId: number ) {
    // const ticket = await Ticket.findOne({eventId, id: ticketId});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id: ticketId, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    return { comments: await Comment.find({
      relations: ['ticket', 'author'],
      where: {ticket: {id: ticketId}},
      select: ['id', 'content', 'author'],
      order: {id: 'DESC'},
      cache: true
    })};
  }

  @Authorized(['admin', 'user'])
  @Post('/events/:eventId/tickets/:ticketId/comments')
  @HttpCode(201)
  async createComment( @Param('eventId') eventId: number,
                       @Param('ticketId') ticketId: number,
                       @Body() {content}: Partial<Comment>,
                       @CurrentUser() author: User ) {
    const ticket = await Ticket.findOne({relations: ['event'], where: {id: ticketId, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    const newComment = await Comment.create({ content, ticket, author }).save();

    if (ticket.commentIds.length + 1 === 4) await updateFraudRisk(ticket);

    return newComment;
  }

  @Authorized(['admin'])
  @Delete('/events/:eventId/tickets/:ticketId/comments/:id')
  @HttpCode(204)
  async deleteComment( @Param('eventId') eventId: number,
                       @Param('ticketId') ticketId: number,
                       @Param('id') id: number,
                       @CurrentUser() user: User ) {
    // const ticket = await Ticket.findOne({eventId, id: ticketId});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id: ticketId, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    
    const comment = await Comment.findOne({relations: ['ticket'], where: {id, ticket: {id: ticketId}}});
    if (!comment) throw new NotFoundError('Cannot find a comment with that id or ticket');
    
    const deleteResult = await Comment.delete(id);

    if (ticket.commentIds.length - 1 === 3) await updateFraudRisk(ticket);
    
    return deleteResult;
  }
}