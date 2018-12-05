import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
// import {connect} from 'react-redux';

import EventListContainer from './Events/EventListContainer';
import TicketListContainer from './Event-Tickets/TicketListContainer';
import LoginFormContainer from './Users/LoginFormContainer';
import SignUpFormContainer from './Users/SignUpFormContainer';
import LoginLogoutButton from './LoginLogoutButton';
import TicketDetailsContainer from './Ticket/TicketDetailsContainer';

function Routes(props) {
  return (<div>
    <Switch>
      <Route path="/login" />
      <Route path="/signup" />
      <Route path="" component={LoginLogoutButton} />
    </Switch>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/events" />} />
      <Route exact path="/events" component={EventListContainer} />
      <Route exact path="/events/:id" component={TicketListContainer} />
      <Route exact path="/events/:eventId/tickets/:id" component={TicketDetailsContainer} />
      <Route exact path="/login" component={LoginFormContainer} />
      <Route exact path="/signup" component={SignUpFormContainer} />
    </Switch>
    
    {/* {!props.authenticated &&
      <Switch>
        <Route path="/login" component={LoginFormContainer} />
        <Route path="" render={() => <Redirect to="/login" />} />
      </Switch>}; */}

    {/* {props.authenticated &&
      <Switch>
        <Route path="/" exact component={EventsListContainer} />
        <Route path="/events/:id" component={EventDetailsContainer} />
        <Route path="" render={() => <Redirect to="/" />} />
      </Switch> }; */}
  </div>);
}

// const mapStateToProps = state => ({
//   authenticated: !!state.currentUser
// });

// export default withRouter(connect(mapStateToProps)(Routes));
export default withRouter(Routes);