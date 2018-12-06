import React from 'react';
import './CommentList.css';

const CommentList = ({comments, allowDeleteComments, onDeleteComment}) => {
  return ( <div>
    {comments ? 
      <div>
        {comments.map(comment => 
          <p className="comment-entry" key={comment.id}>
            <em>{comment.author.firstName} {comment.author.lastName}: <br/></em>
            {allowDeleteComments && <button value={comment.id} onClick={onDeleteComment}>-</button>}
            {comment.content}
          </p>)}
          {!comments[0] && <p>No comments found</p>}
      </div> 
    : 
    <p> Loading... </p>}
  </div> );
}
 
export default CommentList;