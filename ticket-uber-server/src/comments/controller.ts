import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */ } from "routing-controllers";
import Comment from "./entity";
import User from "../users/entity";
import Ticket from "../tickets/entity";
import { updateFraudRisk } from "../fraudRiskAlgorithm";

@JsonController()
export default class CommentController {
  
  @Get('/events/:eventId/tickets/:ticketId/comments')
  async getComments( @Param('eventId') eventId: number,
                     @Param('ticketId') ticketId: number ) {
    // const ticket = await Ticket.findOne({eventId, id: ticketId});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id: ticketId, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    // return { comments: await Comment.find({ticketId}).then(comments => comments.reverse())};
    // return { comments: await Comment.find({relations: ['ticket'], where: {ticket: {id: ticketId}}}).then(comments => comments.reverse()) };
    return { comments: await Comment.find({
      relations: ['ticket', 'author'],
      where: {ticket: {id: ticketId}},
      select: ['id', 'content', 'author'],
      order: {id: "DESC"},
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
    // const ticket = await Ticket.findOne({eventId, id: ticketId});
    const ticket = await Ticket.findOne({relations: ['event'], where: {id: ticketId, event: {id: eventId}}});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    const newComment = await Comment.create({ content, ticket, author }).save();

    /// dit spul kan efficienter je kan nml gwn relation-id voor 'comments' hebben in je Ticket entity zodat je direct uit kan lezen!
    /// zelfde voor aantal tickets van author
    const commentCount = await Comment.find({relations: ['ticket'], where: {ticket: {id: ticketId}}});
    /// op dit soort momenten moet de server eigenlijk iets kunnen pushen naar de redux store...
    if (commentCount.length === 4) await updateFraudRisk(ticket);

    return newComment;
  }

  /// voor admin
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
    
    // const comment = await Comment.findOne({ticketId, id});
    const comment = await Comment.findOne({relations: ['ticket'], where: {id, ticket: {id: ticketId}}});
    if (!comment) throw new NotFoundError('Cannot find a comment with that id or ticket');
    /// else if (user.email !== comment.email) throw new UnauthorizedError(`Cannot delete a post that is not your own`);
    
    const deleteResult = await Comment.delete(id);

    const commentCount = await Comment.find({relations: ['ticket'], where: {ticket: {id: ticketId}}});
    if (commentCount.length === 3) await updateFraudRisk(ticket);
    
    return deleteResult;
  }
}