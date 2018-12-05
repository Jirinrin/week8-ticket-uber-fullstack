import React from 'react';
import './CommentList.css';

export default function CommentList(props) {
  return ( <div>
    {props.comments ? 
      <div>
        {props.comments.map(comment => 
          <p className="comment-entry" key={comment.id}>
            <em>{comment.author.firstName} {comment.author.lastName}: <br/></em>
            {comment.content}
          </p>)}
          {!props.comments[0] && <p>No comments found</p>}
      </div> 
    : 
    <p> Loading... </p>}
  </div> );
}