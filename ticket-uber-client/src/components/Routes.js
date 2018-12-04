import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
// import {connect} from 'react-redux';

import EventListContainer from './EventListContainer';
import TicketListContainer from './TicketListContainer';
// import LoginFormContainer from './LoginFormContainer';

function Routes(props) {
  return (<div>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/events" />} />
      <Route exact path="/events" component={EventListContainer} />
      <Route exact path="/events/:id" render={() => <Redirect to="/events/:id/tickets" />} />
      <Route exact path="/events/:id/tickets" component={TicketListContainer} />
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