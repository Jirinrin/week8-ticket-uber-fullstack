import React from 'react';
import {connect} from 'react-redux';
import {addEvent} from '../actions/events';
import EventForm from './EventForm';

class EventAddContainer extends React.Component {
  state = {
    name: '',
    description: '',
    imageUrl: '',
    startDate: new Date(),
    endDate: new Date()
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeDates = (dateRange) => {
    this.setState({
      startDate: dateRange[0],
      endDate: dateRange[1]
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addEvent({
      ...this.state,
      startDate: this.state.startDate.toISOString(),
      endDate: this.state.endDate.toISOString()
    });
    this.props.handleEventAdded();
    // this.setState({
    //   name: '',
    //   description: '',
    //   imageUrl: '',
    //   startDate: new Date(),
    //   endDate: new Date()
    // });
  }

  render() {
    return (<EventForm onSubmit={this.onSubmit}
                       onChange={this.onChange}
                       onChangeDates={this.onChangeDates}
                       values={this.state} />);
  }
}

export default connect(null, {addEvent})(EventAddContainer);