import React from 'react';
import DatePicker from 'react-date-picker';
import './DatePicker.css';

const DateFilter = ({filterOn, filterDateValues, onChange, onToggleFilter}) => {
  return ( <div>
    <p onClick={onToggleFilter}><input type="checkbox" onChange={() => {}} checked={filterOn} /> Filter by date range </p>
    {filterOn && <DatePicker value={filterDateValues} 
                             onChange={onChange}
                             returnValue="range"
                             selectRange={true}
                             clearIcon={null}
                             minDate={new Date()} /> }
  </div> );
}
 
export default DateFilter;