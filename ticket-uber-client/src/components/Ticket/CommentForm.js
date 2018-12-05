import React from 'react';

const CommentForm = ({commentText, onSubmit, onChange}) => {
  return ( <form onSubmit={onSubmit}>
    <p>
      Write new comment: <br/>
      <input type="text" name="commentText" value={commentText} onChange={onChange} /> <br/>
    </p>
    <input type="submit" value="Post"></input>
  </form> );
}
 
export default CommentForm;