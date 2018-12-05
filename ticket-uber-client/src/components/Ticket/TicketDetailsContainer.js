import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadTicket} from '../../actions/tickets';
import {loadComments, addComment} from '../../actions/comments';

import TicketDetails from './TicketDetails';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class TicketListContainer extends React.Component {
  state = {
    commentText: ''
  };
  
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.eventId, this.props.match.params.id);
    this.props.loadComments(this.props.match.params.eventId, this.props.match.params.id);
  }

  onChangeComment = (e) => {
    this.setState({commentText: e.target.value});
  }

  onSubmitComment = (e) => {
    e.preventDefault();
    this.props.addComment({content: this.state.commentText}, this.props.match.params.eventId, this.props.match.params.id);
    this.setState({commentText: ''});
  }

  render() {
    return ( <div>
      <Link to={`/events/${this.props.match.params.eventId}`}> {'<'} </Link>

      { this.props.ticket && <TicketDetails ticket={this.props.ticket} /> }

      { this.props.currentUser && <CommentForm onSubmit={this.onSubmitComment} 
                                               onChange={this.onChangeComment}
                                               commentText={this.state.commentText} /> }
      
      <CommentList comments={this.props.comments} eventId={this.props.match.params.eventId} ticketId={this.props.match.params.id} />
    </div> );
  }
}

const mapStateToProps = ({ticket, comments, currentUser}) => ({ticket, comments, currentUser});

export default connect(mapStateToProps, {loadTicket, loadComments, addComment})(TicketListContainer);