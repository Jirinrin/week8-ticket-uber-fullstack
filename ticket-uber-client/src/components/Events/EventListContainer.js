import React from 'react';
import {connect} from 'react-redux';
import {loadEvents} from '../../actions/events';

import EventList from './EventList';
import EventAddContainer from './EventAddContainer';

const PAGE_SIZE = 9;

class EventsListContainer extends React.Component {
  state = {
    addEvent: false,
    currentPage: 0,
  }
  
  componentDidMount() {
    this.props.loadEvents(PAGE_SIZE, 0);
  }

  handleEventAddClick = () => {
    this.setState({addEvent: true});
  }

  handleEventAdded = () => {
    this.setState({addEvent: false});
  }

  onNextPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage + 1);
    this.setState({currentPage: this.state.currentPage + 1});
  }

  onPrevPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage - 1);
    this.setState({currentPage: this.state.currentPage - 1});
  }

  render() {
    return ( <div>
      <EventList events={this.props.events}
                 nextPage={this.props.nextPage}
                 prevPage={this.state.currentPage > 0}
                 onNextPage={this.onNextPage}
                 onPrevPage={this.onPrevPage} />
      
      {this.state.addEvent ?
      <EventAddContainer handleEventAdded={this.handleEventAdded} />
      :
      (this.props.currentUser && <button onClick={this.handleEventAddClick}>Add event</button>)}
      {/* dit met currentUser moet natuurlijk eigenlijk alleen als currentuser een admin is */}
    </div> )
  }
}

const mapStateToProps = ({events, currentUser}) => ({
  events, currentUser,
  nextPage: events && events.length >= PAGE_SIZE
});

export default connect(mapStateToProps, {loadEvents})(EventsListContainer);