import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LoginLogoutButton extends Component {
  render() { 
    /// if user is not yet logged in...
    return ( <Link to={'/login'}><button> Log in </button></Link> );
    /// but if there is a user logged in then show logout button and dispatch logout action on click
  }
}
 
/// met connect enzo
export default LoginLogoutButton;