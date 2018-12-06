import React from 'react';

const TicketDetails = ({ticket}) => {
  return ( <div>
    <h2> Ticket from {ticket.author.firstName} </h2>
    <p> Fraud risk: {parseFloat(ticket.fraudRisk).toFixed(2)}% </p>
    <p> €{ticket.price} </p>
    <p> Event: {ticket.event.name} </p>
    {ticket.pictureUrl && <img src={ticket.pictureUrl} alt={ticket.price} />}
    <p> {ticket.description} </p>
  </div> );
}
 
export default TicketDetails;