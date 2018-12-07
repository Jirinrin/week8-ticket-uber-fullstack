import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';

import EventListContainer from './Events/EventListContainer';
import TicketListContainer from './Event-Tickets/TicketListContainer';
import LoginFormContainer from './Users/LoginFormContainer';
import SignUpFormContainer from './Users/SignUpFormContainer';
import LoginLogoutButton from './LoginLogoutButton';
import TicketDetailsContainer from './Ticket/TicketDetailsContainer';

function Routes(props) {
  return (<div>
    <Route path="" render={() => <button onClick={() => props.history.push('/')}>Home</button>} />
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
  </div>);
}

export default withRouter(Routes);