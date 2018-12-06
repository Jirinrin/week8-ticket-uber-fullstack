import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import LoginForm from './LoginForm';
import {login} from '../../actions/auth';

class LoginFormContainer extends Component {
  state = { email: '', password: '' };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
    console.log(this.props.history);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.props.currentUser) this.props.history.goBack();
    
    return ( <div>
      <button onClick={() => this.props.history.goBack()}> x </button>
      <LoginForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state} />
      <Link to="/signup"> Sign up </Link>
    </div> );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {login})(LoginFormContainer);