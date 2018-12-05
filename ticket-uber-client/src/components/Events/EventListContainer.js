import React from 'react';
import {connect} from 'react-redux';
import {loadEvents} from '../../actions/events';

import EventList from './EventList';
import EventAddContainer from './EventAddContainer';
import EventSearchForm from './EventSearchForm';

const PAGE_SIZE = 9;

class EventsListContainer extends React.Component {
  state = {
    addEvent: false,
    currentPage: 0,
    searchText: ''
  }
  
  componentDidMount() {
    this.props.loadEvents(PAGE_SIZE, 0, this.state.searchText);
  }

  /// zou zelfs dit weg kunnen laten en iedere keer opnieuw loaden in spul ofzo
  onClearSearch = (e) => {
    this.setState({searchText: ''});
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage, '');
  }

  onChangeSearch = (e) => {
    this.setState({searchText: e.target.value});
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage, e.target.value);
  } 

  handleEventAddClick = () => this.setState({addEvent: true});

  handleEventAdded = () => this.setState({addEvent: false});

  onNextPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage + 1, this.state.searchText);
    this.setState({currentPage: this.state.currentPage + 1});
  }

  onPrevPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage - 1, this.state.searchText);
    this.setState({currentPage: this.state.currentPage - 1});
  }

  render() {
    return ( <div>
      <EventSearchForm onClear={this.onClearSearch}
                       onChange={this.onChangeSearch} 
                       searchText={this.state.searchText} />
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