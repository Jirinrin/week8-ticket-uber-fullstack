import React from 'react';
import {connect} from 'react-redux';
import {loadEvents} from '../../actions/events';

import EventList from './EventList';
import EventAddContainer from './EventAddContainer';
import EventSearchForm from './EventSearchForm';
import DateFilter from './DateFilter';

const PAGE_SIZE = 9;

class EventsListContainer extends React.Component {
  state = {
    addEvent: false,
    currentPage: 0,
    searchText: '',
    filterByDate: false,
    filterDateValues: [new Date(), new Date()]
  }
  
  componentDidMount() {
    this.props.loadEvents(PAGE_SIZE, 0, this.state.searchText, this.getDateFilters());
  }

  onClearSearch = (e) => {
    this.setState({searchText: ''});
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage, '', this.getDateFilters());
  }

  onChangeSearch = (e) => {
    this.setState({searchText: e.target.value});
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage, e.target.value, this.getDateFilters());
  } 

  onChangeFilterDates = (dateRange) => {
    this.setState({filterDateValues: dateRange}, () => {
      this.props.loadEvents(PAGE_SIZE, this.state.currentPage, this.state.searchText, this.getDateFilters());
    }); 
  }

  onToggleFilter = () => {
    this.setState({filterByDate: !this.state.filterByDate}, () => {
      this.props.loadEvents(PAGE_SIZE, this.state.currentPage, this.state.searchText, this.getDateFilters());
    });
  }

  getDateFilters = () => {
    if (!this.state.filterByDate) return null;
    return [
      new Date(new Date(this.state.filterDateValues[0]).setHours(0,0,0,0)).toISOString(),
      new Date(new Date(this.state.filterDateValues[1]).setHours(23,59,59,999)).toISOString()
    ];
  }

  handleEventAddClick = () => this.setState({addEvent: true});

  handleEventAdded = () => this.setState({addEvent: false});

  onNextPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage + 1, this.state.searchText, this.getDateFilters());
    this.setState({currentPage: this.state.currentPage + 1});
  }

  onPrevPage = () => {
    this.props.loadEvents(PAGE_SIZE, this.state.currentPage - 1, this.state.searchText, this.getDateFilters());
    this.setState({currentPage: this.state.currentPage - 1});
  }

  render() {
    return ( <div>
      <EventSearchForm onClear={this.onClearSearch}
                       onChange={this.onChangeSearch} 
                       searchText={this.state.searchText} />
      <DateFilter filterOn={this.state.filterByDate}
                  filterDateValues={this.state.filterDateValues}
                  onChange={this.onChangeFilterDates}
                  onToggleFilter={this.onToggleFilter} />
      <EventList events={this.props.events}
                 nextPage={this.props.nextPage}
                 prevPage={this.state.currentPage > 0}
                 onNextPage={this.onNextPage}
                 onPrevPage={this.onPrevPage}
                 history={this.props.history} />
      
      {this.state.addEvent ?
      <EventAddContainer handleEventAdded={this.handleEventAdded} />
      :
      (this.props.admin && <button onClick={this.handleEventAddClick}>Add event</button>)}
    </div> )
  }
}

const mapStateToProps = ({events, currentUser}) => ({
  events, currentUser,
  admin: currentUser && currentUser.role === 'admin',
  nextPage: events && events.length >= PAGE_SIZE
});

export default connect(mapStateToProps, {loadEvents})(EventsListContainer);