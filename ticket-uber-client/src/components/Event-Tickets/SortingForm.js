import React from 'react';

const SortingForm = ({sortType, onChangeSortType, sortOrder, onToggleSortOrder}) => {
  return ( 
    <p> Sort tickets by:
      <select value={sortType} onChange={onChangeSortType}>
        <option value="id">Date</option>
        <option value="author">Author</option>
        <option value="price">Price</option>
      </select> 
      
      Sort order:
      <button onClick={onToggleSortOrder}>{sortOrder === 'DESC' ? '↓' : '↑'}</button> 
    </p> );
}
 
export default SortingForm;