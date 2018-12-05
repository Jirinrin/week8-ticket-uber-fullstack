import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';

class LoginLogoutButton extends Component {
  render() { 
    return ( 
      this.props.currentUser ?
      <button onClick={this.props.logout}> Log out </button>
      :
      <Link to={'/login'}><button> Log in </button></Link>      
    )
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {logout})(LoginLogoutButton);