import React from 'react';

const CommentForm = ({commentText, onSubmit, onChange}) => {
  return ( <form onSubmit={onSubmit}>
    <p>
      Write new comment: <br/>
      <input type="text" name="commentText" value={commentText} onChange={onChange} />
      <input type="submit" value="Post"></input>
    </p>
  </form> );
}
 
export default CommentForm;