import React from 'react';
import {connect} from 'react-redux';
import {loadEvents} from '../../actions/events';

import EventList from './EventList';
import EventAddContainer from './EventAddContainer';

class EventsListContainer extends React.Component {
  state = {
    addEvent: false
  }
  
  componentDidMount() {
    this.props.loadEvents();
  }

  handleEventAddClick = () => {
    this.setState({addEvent: true});
  }

  handleEventAdded = () => {
    this.setState({addEvent: false});
  }

  render() {
    return ( <div>
      <EventList events={this.props.events} />
      
      {this.state.addEvent ?
      <EventAddContainer handleEventAdded={this.handleEventAdded} />
      :
      <button onClick={this.handleEventAddClick}>Add event</button>}
    </div> )
  }
}

const mapStateToProps = ({events}) => ({
  events: events
});

export default connect(mapStateToProps, {loadEvents})(EventsListContainer);