import React from 'react';
import {connect} from 'react-redux';
import {addTicket} from '../../actions/tickets';
import TicketForm from './TicketForm';

class TicketAddContainer extends React.Component {
  state = {
    price: '',
    description: '',
    pictureUrl: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTicket({
      ...this.state,
      price: +this.state.price,
      pictureUrl: this.state.pictureUrl || null
    }, this.props.eventId);
    this.props.handleTicketAdded();
  }

  render() {
    return (<TicketForm onSubmit={this.onSubmit}
                        onChange={this.onChange}
                        onCancel={this.props.handleTicketAdded}
                        onChangeDates={this.onChangeDates}
                        values={this.state} />);
  }
}

export default connect(null, {addTicket})(TicketAddContainer);