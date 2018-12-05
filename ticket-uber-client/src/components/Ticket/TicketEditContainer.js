import React from 'react';
import {connect} from 'react-redux';
import {editTicket} from '../../actions/tickets';
import TicketForm from '../Event-Tickets/TicketForm';

class TicketEditContainer extends React.Component {
  state = {
    price: '',
    description: '',
    pictureUrl: ''
  }

  componentDidMount() {
    this.setState({
      price: ''+this.props.ticket.price,
      description: this.props.ticket.description,
      pictureUrl: this.props.ticket.pictureUrl || ''
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editTicket({
      ...this.state,
      price: +this.state.price,
      pictureUrl: this.state.pictureUrl || null
    }, this.props.eventId, this.props.ticketId);
    this.props.handleTicketEdited();
  }

  render() {
    return (<TicketForm onSubmit={this.onSubmit}
                        onChange={this.onChange}
                        onCancel={this.props.handleTicketEdited}
                        values={this.state} />);
  }
}

export default connect(null, {editTicket})(TicketEditContainer);