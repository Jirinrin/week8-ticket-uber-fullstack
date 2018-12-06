import React from 'react';
import {connect} from 'react-redux';
import {loadTickets} from '../../actions/tickets';
import {loadEvent, deleteEvent} from '../../actions/events';

import TicketList from './TicketList';
import EventDetails from './EventDetails';
import TicketAddContainer from './TicketAddContainer';
import SortingForm from './SortingForm';
import EventEditContainer from './EventEditContainer';

class TicketListContainer extends React.Component {
  state = {
    editEvent: false,
    addTicket: false,
    sortType: 'id',
    sortOrder: 'DESC'
  };
  
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id);
    this.props.loadTickets(this.props.match.params.id, this.state.sortType, this.state.sortOrder);
  }

  onChangeSortType = (e) => {
    this.setState({sortType: e.target.value}, () => {
      this.props.loadTickets(this.props.match.params.id, this.state.sortType, this.state.sortOrder);
    });
  }

  onToggleSortOrder = (e) => {
    this.setState({sortOrder: this.state.sortOrder === 'DESC' ? 'ASC' : 'DESC'}, () => {
      this.props.loadTickets(this.props.match.params.id, this.state.sortType, this.state.sortOrder);
    });
  }

  handleEventEditClick = () => this.setState({editEvent: true});

  handleEventEdited = () => this.setState({editEvent: false});

  onDeleteEvent = () => {
    this.props.deleteEvent(this.props.match.params.id);
    this.props.history.push('/');
  }

  handleTicketAddClick = () => this.setState({addTicket: true});

  handleTicketAdded = () => this.setState({addTicket: false});

  render() {
    return ( <div>
      <button onClick={() => this.props.history.push('/')}> {'<'} </button>
      
      {this.state.editEvent ?
      <EventEditContainer handleEventEdited={this.handleEventEdited} 
                          eventId={this.props.match.params.id}
                          event={this.props.event} />
      :
      <div>
        {this.props.event && <EventDetails event={this.props.event} /> }
        {this.props.admin && <button onClick={this.handleEventEditClick}>Edit event</button>}
      </div> }

      {this.props.admin && <button onClick={this.onDeleteEvent}>Delete event</button>}
      
      <h3> Tickets </h3>
      <SortingForm sortType={this.state.sortType}
                   onChangeSortType={this.onChangeSortType}
                   sortOrder={this.state.sortOrder}
                   onToggleSortOrder={this.onToggleSortOrder} />

      {(this.state.addTicket) ?
      <TicketAddContainer handleTicketAdded={this.handleTicketAdded} eventId={this.props.match.params.id} />
      :
      (this.props.currentUser && <button onClick={this.handleTicketAddClick}>Add ticket</button>)}

      <TicketList tickets={this.props.tickets} eventId={this.props.match.params.id} history={this.props.history} />
    </div> )
  }
}

const mapStateToProps = ({tickets, event, currentUser}) => ({
  tickets, event, currentUser,
  admin: currentUser && currentUser.role === 'admin',
});

export default connect(mapStateToProps, {loadTickets, loadEvent, deleteEvent})(TicketListContainer);