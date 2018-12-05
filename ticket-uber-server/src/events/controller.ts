import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */Patch, QueryParam } from "routing-controllers";
import Event from "./entity";
import User from "../users/entity";
import { MoreThan, Raw } from "typeorm";

@JsonController()
export default class EventController {
  
  @Get('/events')
  async getEvents( @QueryParam('pageSize') pageSize: number,
                   @QueryParam('pageNo') pageNo: number,
                   @QueryParam('search') search: string,
                   @QueryParam('filters') filters ) {
    let formattedSearch = `"name"`;
    console.log(search);
    if (search.trim()[0]) search.replace(/\$\$/g, '$').split(' ').forEach((term: string, i) => {
      formattedSearch = formattedSearch.concat(`${i === 0 ? ' AND (' : ' OR '}("name" LIKE $$%${term.trim()}%$$ OR "description" LIKE $$%${term.trim()}%$$)`);
      if (i === search.trim().split(' ').length - 1) formattedSearch = formattedSearch.concat(')');
    });

    return { events: await Event.find({
      where: { 
        endDate: MoreThan(new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
        // name: Raw(` "name" AND (("name" LIKE $$%Jiri%$$ OR "description" LIKE $$%Jiri%$$) OR ("name" LIKE $$%stuff%$$ OR "description" LIKE $$%stuff%$$)) `)
        name: Raw(formattedSearch)
      },
      take: pageSize,
      skip: pageNo * pageSize,
      select: ['id', 'name', 'imageUrl', 'startDate', 'endDate'],
      order: {startDate: 'ASC'},
      cache: true
    })};
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
    // return Event.create(body).save();
    return body.save();
  }

  /// voor admins!
  @Authorized()
  @Patch('/events/:id')
  async patchEvent( @Param('id') id: number, 
                    @Body() body: Partial<Event>,
                    @CurrentUser() user: User ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');
    // if (user.email !== event.email) throw new UnauthorizedError(`Cannot update a post that is not your own`);

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