import React from 'react';
import './TicketList.css';

export default function TicketList(props) {
  return ( <div>
    {props.tickets ? 
      <div id="ticket-list">
        {props.tickets.map(ticket => 
          <div className="ticket-entry" 
               key={ticket.id}
               style={{backgroundColor: fraudRiskToColor(ticket.fraudRisk)}}
               onClick={() => props.history.push(`/events/${props.eventId}/tickets/${ticket.id}`)}>
            {ticket.price} <br/>
            {ticket.description.slice(0, 10) + (ticket.description.length >= 10 ? '...' : '')} <br/>
            {ticket.author && <em>{ticket.author.firstName} {ticket.author.lastName} </em>}
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