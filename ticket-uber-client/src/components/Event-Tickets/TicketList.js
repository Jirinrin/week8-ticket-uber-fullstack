import React from 'react';
import {Link} from 'react-router-dom';
import './TicketList.css';

export default function TicketList(props) {
  return ( <div>
    {props.tickets ? 
      <div id="ticket-list">
        {props.tickets.map(ticket => 
          <div style={{backgroundColor: fraudRiskToColor(ticket.fraudRisk)}} key={ticket.id}>
            <Link to={`/events/${props.eventId}/tickets/${ticket.id}`}>
              {ticket.price} <br/>
              {ticket.description.slice(0, 10) + '...'} <br/>
              <em>{ticket.author.firstName} {ticket.author.lastName} </em>
            </Link>
          </div>)}
          {!props.tickets[0] && <p>No tickets found</p>}
      </div> 
    : 
    <p> Loading... </p>}
  </div> );
}

// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
const mapNumber = (number, inMin, inMax, outMin, outMax) => {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function fraudRiskToColor(risk) {
  return `hsl(${mapNumber(risk, 5, 95, 80, 0)}, ${80}%, ${75}%)`;
}