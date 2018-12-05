import React from 'react';

const EventDetails = ({event}) => {
  return ( <div>
    <img src={event.imageUrl} alt={event.name} />
    <h1> {event.name} </h1>
    <p> {event.description} </p>
    <p> From: {(new Date(event.startDate)).toDateString()} <br/>
        To: {(new Date(event.endDate)).toDateString()} </p>
  </div> );
}
 
export default EventDetails;