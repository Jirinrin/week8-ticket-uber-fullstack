import React from 'react';
import {Link} from 'react-router-dom';
import './EventList.css';

export default function EventList(props) {
  return ( <div>
    {props.events ? 
      <div>
        <div>
          {props.events.map(event => 
            <div className="event-entry" key={event.id}>
              <Link to={`/events/${event.id}`}>
                {event.name} <br/>
                {event.imageUrl} <br/>
                from {new Date(event.startDate).toDateString()} to {new Date(event.endDate).toDateString()}
              </Link>
            </div>)}
        </div>
        {!props.events[0] && <p>No events found</p>}
        {props.prevPage && <button onClick={props.onPrevPage}>{'<'}</button>}
        {props.nextPage && <button onClick={props.onNextPage}>{'>'}</button>}
      </div>
    : 
    <p> Loading... </p>}
  </div> );
}