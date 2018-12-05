import React from 'react';

const EventSearchForm = ({searchText, onClear, onChange}) => {
  return ( <form>
    <p>
      Search for events: <br/>
      <input type="text" name="searchText" value={searchText} onChange={onChange} />
      <button onClick={onClear}> Clear </button>
    </p>
  </form> );
}
 
export default EventSearchForm;