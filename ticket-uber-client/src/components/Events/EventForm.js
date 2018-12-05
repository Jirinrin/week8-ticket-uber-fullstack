import React from 'react';
import DatePicker from 'react-date-picker';
import './DatePicker.css';

export default function({values, onSubmit, onChange, onChangeDates, onCancel}) {
  return ( <form onSubmit={onSubmit}>
    <p>
      Name: <input type="text" name="name" value={values.name} onChange={onChange} /> <br/>
      Description: <input type="text" name="description" value={values.description} onChange={onChange} /> <br/>
      Image: (input URL) <input type="text" name="imageUrl" value={values.imageUrl} onChange={onChange} /> <br/>
    </p>
    <DatePicker value={[values.startDate, values.endDate]} 
                onChange={onChangeDates}
                returnValue="range"
                selectRange={true}
                clearIcon={null} 
                minDate={new Date()} /> <br/>
    <input type="submit" value="Save"></input>
    <button onClick={onCancel}> Cancel </button>
  </form> );
}