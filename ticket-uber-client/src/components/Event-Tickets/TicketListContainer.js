import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadTickets} from '../../actions/tickets';
import {loadEvent} from '../../actions/events';

import TicketList from './TicketList';
import EventDetails from './EventDetails';
import TicketAddContainer from './TicketAddContainer';

class TicketListContainer extends React.Component {
  state = {
    addTicket: false
  };
  
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id);
    this.props.loadTickets(this.props.match.params.id);
  }

  handleTicketAddClick = () => {
    this.setState({addTicket: true});
  }

  handleTicketAdded = () => {
    this.setState({addTicket: false});
  }

  render() {
    return ( <div>
      <Link to="/"> {'<'} </Link>

      {this.props.event && <EventDetails event={this.props.event} /> }
      
      <h3> Tickets </h3>
      {(this.state.addTicket) ?
      <TicketAddContainer handleTicketAdded={this.handleTicketAdded} eventId={this.props.match.params.id} />
      :
      (this.props.currentUser && <button onClick={this.handleTicketAddClick}>Add ticket</button>)}

      <TicketList tickets={this.props.tickets} eventId={this.props.match.params.id} />
    </div> )
  }
}

const mapStateToProps = ({tickets, event, currentUser}) => ({tickets, event, currentUser});

export default connect(mapStateToProps, {loadTickets, loadEvent})(TicketListContainer);