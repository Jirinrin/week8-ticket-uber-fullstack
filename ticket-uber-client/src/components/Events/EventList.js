import React from 'react';
import {Link} from 'react-router-dom';
import './EventList.css';

export default function EventList(props) {
  return ( <div>
    <h2> Events </h2>
    {props.events ? 
      <div>
        <div>
          {props.events.map(event => 
            <div className="event-entry" key={event.id}>
              <Link to={`/events/${event.id}`}>
                {event.name} <br/>
                <img src={event.imageUrl} alt={event.name} /> <br/>
                {new Date(event.startDate).toDateString()} - {new Date(event.endDate).toDateString()}
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