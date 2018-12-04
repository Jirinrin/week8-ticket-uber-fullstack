import React from 'react';
import {Link} from 'react-router-dom';

export default function TicketList(props) {
  return ( <div>
    {props.tickets ? 
      <ul>
        {props.tickets.map(ticket => 
          <li key={ticket.id}>
            <Link to={`/events/${props.eventId}/tickets/${ticket.id}`}>
              {ticket.price}
            </Link>
          </li>)}
          {!props.tickets[0] && <p>No tickets found</p>}
      </ul> 
    : 
    <p> Loading... </p>}
  </div> );
}