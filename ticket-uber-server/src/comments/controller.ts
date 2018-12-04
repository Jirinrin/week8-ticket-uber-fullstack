import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */ } from "routing-controllers";
import Comment from "./entity";
import User from "../users/entity";
import Ticket from "../tickets/entity";
// import { updateFraudRisk } from "../fraudRiskAlgorithm";

@JsonController()
export default class CommentController {
  
  @Get('/events/:eventId/tickets/:ticketId/comments')
  async getComments( @Param('eventId') eventId: number,
                     @Param('ticketId') ticketId: number ) {
    const ticket = await Ticket.findOne({eventId, id: ticketId});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    return { comments: await Comment.find({ticketId})};
  }

  @Authorized()
  @Post('/events/:eventId/tickets/:ticketId/comments')
  @HttpCode(201)
  async createComment( @Param('eventId') eventId: number,
                       @Param('ticketId') ticketId: number,
                       @Body() {content}: Partial<Comment>,
                       @CurrentUser() author: User ) {
    const ticket = await Ticket.findOne({eventId, id: ticketId});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');

    // function stuff() {updateFraudRisk()}()

    return Comment.create({ content, ticket, author }).save();
  }

  /// voor admin
  @Authorized()
  @Delete('/events/:eventId/tickets/:ticketId/comments/:id')
  @HttpCode(204)
  async deleteComment( @Param('eventId') eventId: number,
                       @Param('ticketId') ticketId: number,
                       @Param('id') id: number,
                       @CurrentUser() user: User ) {
    const ticket = await Ticket.findOne({eventId, id: ticketId});
    if (!ticket) throw new NotFoundError('Cannot find a ticket with that id or event');
    
    const comment = await Comment.findOne({ticketId, id});
    if (!comment) throw new NotFoundError('Cannot find a comment with that id or ticket');
    /// else if (user.email !== comment.email) throw new UnauthorizedError(`Cannot delete a post that is not your own`);
    
    return Comment.delete(id);
  }
}