import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SignUpForm from './SignUpForm';
import {signUp} from '../../actions/users';

/// wil eigenlijk iets van feedback geven als bepaalde fields niet correct ingevuld zijn... referentie van game-template ofzo
class SignUpFormContainer extends Component {
  state = { email: '', password: '', firstName: '', lastName: '' };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    this.props.history.push('/login');
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.props.currentUser) this.props.history.goBack();
    
    return ( <div>
      <button onClick={() => this.props.history.go(-2)}> x </button>
      <SignUpForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state} />
    </div> );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {signUp})(SignUpFormContainer);