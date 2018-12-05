import React from 'react';
import {Link} from 'react-router-dom';

export default function EventList(props) {
  return ( <div>
    {props.events ? 
      <div>
        <ul>
          {props.events.map(event => 
            <li key={event.id}>
              <Link to={`/events/${event.id}`}>
                {event.name}
              </Link>
            </li>)}
        </ul>
        {!props.events[0] && <p>No events found</p>}
        {props.prevPage && <button onClick={props.onPrevPage}>{'<'}</button>}
        {props.nextPage && <button onClick={props.onNextPage}>{'>'}</button>}
      </div>
    : 
    <p> Loading... </p>}
  </div> );
}