import React from 'react';
import {Link} from 'react-router-dom';

export default function EventList(props) {
  return ( <div>
    {props.events ? 
      <ul>
        {props.events.map(event => 
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              {event.name}
            </Link>
          </li>)}
          {!props.events[0] && <p>No events found</p>}
      </ul> 
    : 
    <p> Loading... </p>}
  </div> );
}