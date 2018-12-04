import React from 'react';

export default function EventList(props) {
  return ( <div>
    {props.events ? 
      <ul>
        {props.events.map(event => 
          <li key={event.id}>
            <a href={`/events/${event.id}`}>
              {event.name}
            </a>
          </li>)}
          {!props.events[0] && <p>No events found</p>}
      </ul> 
    : 
    <p> Loading... </p>}
  </div> );
}