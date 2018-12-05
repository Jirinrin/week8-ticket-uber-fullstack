/// wil eigenlijk ook iets van author laten zien hier... toch eager loading? slash dan dus maar inbouwen in het GET ding dat je het geformat terugkrijgt
import React from 'react';

const TicketDetails = ({ticket}) => {
  return ( <div>
    <h2> {ticket.price} </h2>
    <p> {ticket.description} </p>
    <p> {ticket.createdAt} </p>
    <p> Fraud risk: {ticket.fraudRisk}% </p>
  </div> );
}
 
export default TicketDetails;