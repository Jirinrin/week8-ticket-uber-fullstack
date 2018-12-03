import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */Patch } from "routing-controllers";
import Event from "./entity";
import User from "../users/entity";

@JsonController()
export default class EventController {
  
  @Get('/events')
  async getEvents() {
    /// oke maar wil de columns eigenlijk filteren zodat hij hier alleen de belangrijkste info laat zien?
    return { events: await Event.find() };
    // const events = await Event.find();
    // return {events};
  }

  @Get('/events/:id')
  async getEvent( @Param('id') id: number ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');
    return { event };
  }

  /// voor admins!
  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent( @Body() body: Event,
                     /*@CurrentUser() user: User */) {
    /// gaat moeilijk worden te testen in httpie want niet echt mogelijk om date te passen en fk's moeten ook automatisch opgezet worden 
    return body.save()
  }

  /// voor admins!
  @Authorized()
  @Patch('/events/:id')
  async putEvent( @Param('id') id: number, 
                  @Body() body: Partial<Event>,
                  /*@CurrentUser() user: User*/ ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');
    // else if (user.email !== event.email) throw new UnauthorizedError(`Cannot update a post that is not your own`);

    return Event.merge(event, body).save();
  }

  /// voor admins!
  @Authorized()
  @Delete('/events/:id')
  @HttpCode(204)
  async deleteEvent( @Param('id') id: number,
                     @CurrentUser() user: User ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');
    // else if (user.email !== event.email) throw new UnauthorizedError(`Cannot delete a post that is not your own`);
    
    return Event.delete(id);
  }
}