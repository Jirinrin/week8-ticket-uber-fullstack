import { JsonController, Get, Param, Post, Delete, Body, HttpCode, Authorized, NotFoundError, CurrentUser, /*UnauthorizedError, */Patch, QueryParam } from 'routing-controllers';
import Event from './entity';
import User from '../users/entity';
import { MoreThan, Raw, Between } from 'typeorm';

@JsonController()
export default class EventController {
  
  @Get('/events')
  async getEvents( @QueryParam('pageSize') pageSize: number,
                   @QueryParam('pageNo') pageNo: number,
                   @QueryParam('search') search: string,
                   @QueryParam('dateFilters') dateFilters: [string, string] ) {

    let formattedSearch = `"name"`;
    if (search.trim()[0]) {
      search.replace(/\$\$/g, '').split(' ').forEach((term: string, i) => {
        formattedSearch = formattedSearch.concat(`${i === 0 ? ' AND (' : ' AND '}("name" ILIKE $$%${term.trim()}%$$ OR "description" ILIKE $$%${term.trim()}%$$)`);
      });
      formattedSearch = formattedSearch.concat(')');
    } 

    let formattedFilters = {};
    if (!dateFilters) {
      formattedFilters['endDate'] = MoreThan(new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
    }
    else {
      formattedFilters['startDate'] = MoreThan(dateFilters[0]);
      formattedFilters['endDate'] = Between(new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                                            dateFilters[1]);
    }

    return { events: await Event.find({
      where: { 
        name: Raw(formattedSearch),
        ...formattedFilters
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

  @Authorized(['admin'])
  @Post('/events')
  @HttpCode(201)
  async createEvent( @Body() body: Event ) {
    return body.save();
  }

  @Authorized(['admin'])
  @Patch('/events/:id')
  async patchEvent( @Param('id') id: number, 
                    @Body() body: Partial<Event>,
                    @CurrentUser() user: User ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');

    return Event.merge(event, body).save();
  }

  @Authorized(['admin'])
  @Delete('/events/:id')
  @HttpCode(204)
  async deleteEvent( @Param('id') id: number,
                     @CurrentUser() user: User ) {
    const event = await Event.findOne({id});
    if (!event) throw new NotFoundError('Cannot find an event with that id');
    
    return Event.delete(id);
  }
}