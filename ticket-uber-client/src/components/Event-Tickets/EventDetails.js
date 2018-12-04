import React from 'react';

const EventDetails = ({event}) => {
  return ( <div>
    <h1> {event.name} </h1>
    <p> {event.description} </p>
  </div> );
}
 
export default EventDetails;