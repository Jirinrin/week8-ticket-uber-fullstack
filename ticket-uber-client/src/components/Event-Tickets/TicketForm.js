import React from 'react';

export default function({values, onSubmit, onChange, onCancel}) {
  return ( <form onSubmit={onSubmit}>
    <p>
      Price: <input type="text" name="price" value={values.price} onChange={onChange} /> <br/>
      Description: <input type="text" name="description" value={values.description} onChange={onChange} /> <br/>
      Picture: (input URL, optional) <input type="text" name="pictureUrl" value={values.pictureUrl} onChange={onChange} /> <br/>
    </p>
    <input type="submit" value="Save"></input>
    <button onClick={onCancel}> Cancel </button>
  </form> );
}