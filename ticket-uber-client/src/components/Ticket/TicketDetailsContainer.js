import React from 'react';
import {connect} from 'react-redux';
import {loadTicket, deleteTicket, loadTickets} from '../../actions/tickets';
import {loadComments, addComment, deleteComment} from '../../actions/comments';

import TicketDetails from './TicketDetails';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import TicketEditContainer from './TicketEditContainer';

class TicketListContainer extends React.Component {
  state = {
    editTicket: false,
    commentText: ''
  };
  
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.eventId, this.props.match.params.id);
    this.props.loadComments(this.props.match.params.eventId, this.props.match.params.id);
  }

  handleTicketEditClick = () => this.setState({editTicket: true});

  handleTicketEdited = () => this.setState({editTicket: false});

  onDeleteTicket = () => {
    this.props.deleteTicket(this.props.match.params.eventId, 
                            this.props.match.params.id,
                            () => this.props.loadTickets(this.props.match.params.eventId));
    this.props.history.push(`/events/${this.props.match.params.eventId}`);
  }

  onChangeComment = (e) => {
    this.setState({commentText: e.target.value});
  }

  onSubmitComment = (e) => {
    e.preventDefault();
    this.props.addComment({content: this.state.commentText}, 
                           this.props.match.params.eventId, 
                           this.props.match.params.id, 
                           () => this.props.loadTicket(this.props.match.params.eventId, this.props.match.params.id));
    this.setState({commentText: ''});
  }

  onDeleteComment = (e) => {
    this.props.deleteComment(this.props.match.params.eventId, 
                             this.props.match.params.id, 
                             e.target.value,
                             () => this.props.loadTicket(this.props.match.params.eventId, this.props.match.params.id));
  }

  render() {
    return ( <div>
      <button onClick={() => this.props.history.push(`/events/${this.props.match.params.eventId}`)}> {'<'} </button>

      {this.state.editTicket ?
      <TicketEditContainer handleTicketEdited={this.handleTicketEdited} 
                           eventId={this.props.match.params.eventId}
                           ticketId={this.props.match.params.id}
                           ticket={this.props.ticket} />
      :
      <div>
        {this.props.ticket && <TicketDetails ticket={this.props.ticket} />}
        {(this.props.authorOfTicket || this.props.admin) && 
          <button onClick={this.handleTicketEditClick}>Edit ticket</button>}
      </div> }

      {(this.props.authorOfTicket || this.props.admin) && 
        <button onClick={this.onDeleteTicket}>Delete ticket</button>}

      <h3>Comments</h3>
      { this.props.currentUser && <CommentForm onSubmit={this.onSubmitComment} 
                                               onChange={this.onChangeComment}
                                               commentText={this.state.commentText} /> }
      
      <CommentList comments={this.props.comments} allowDeleteComments={this.props.admin} onDeleteComment={this.onDeleteComment} />
    </div> );
  }
}

const mapStateToProps = ({ticket, comments, currentUser}) => ({
  ticket, comments, currentUser,
  authorOfTicket: currentUser && ticket && currentUser.id === ticket.author.id,
  admin: currentUser && currentUser.role === 'admin'
});

const mapDispatchToProps = {
  loadTicket, 
  loadComments, 
  addComment, 
  deleteTicket, 
  deleteComment, 
  loadTickets
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketListContainer);