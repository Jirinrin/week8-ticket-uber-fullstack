import React from 'react';
import {connect} from 'react-redux';
import {editEvent} from '../../actions/events';
import EventForm from '../Events/EventForm';

class EventEditContainer extends React.Component {
  state = {
    name: '',
    description: '',
    imageUrl: '',
    startDate: new Date(),
    endDate: new Date()
  }

  componentDidMount() {
    this.setState({
      name: this.props.event.name,
      description: this.props.event.description,
      imageUrl: this.props.event.imageUrl || '',
      startDate: new Date(this.props.event.startDate),
      endDate: new Date(this.props.event.endDate)
    });
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
    this.props.editEvent({
      ...this.state,
      startDate: this.state.startDate.toISOString(),
      endDate: this.state.endDate.toISOString()
    }, this.props.eventId);
    this.props.handleEventEdited();
  }

  render() {
    return (<EventForm onSubmit={this.onSubmit}
                       onChange={this.onChange}
                       onChangeDates={this.onChangeDates}
                       onCancel={this.props.handleEventEdited}
                       values={this.state} />);
  }
}

export default connect(null, {editEvent})(EventEditContainer);