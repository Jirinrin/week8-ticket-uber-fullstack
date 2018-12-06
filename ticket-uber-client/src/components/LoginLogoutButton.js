import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';

class LoginLogoutButton extends Component {
  render() { 
    return ( 
      this.props.currentUser ?
      <span><button onClick={this.props.logout}> Log out </button> Logged in as {this.props.currentUser.name} </span>
      :
      <button onClick={() => this.props.history.push('/login')}> Log in </button>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {logout})(LoginLogoutButton);