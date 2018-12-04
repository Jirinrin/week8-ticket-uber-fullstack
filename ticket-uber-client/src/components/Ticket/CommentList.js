import React from 'react';

export default function CommentList(props) {
  return ( <div>
    {props.comments ? 
      <ul>
        {props.comments.map(comment => 
          <li key={comment.id}>
            {/* En auteur showen ofzo nog */}
            {comment.content}
          </li>)}
          {!props.comments[0] && <p>No comments found</p>}
      </ul> 
    : 
    <p> Loading... </p>}
  </div> );
}