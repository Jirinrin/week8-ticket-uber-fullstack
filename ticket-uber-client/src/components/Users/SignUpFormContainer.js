import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignUpForm from './SignUpForm';
import {signUp} from '../../actions/users';

/// wil eigenlijk iets van feedback geven als bepaalde fields niet correct ingevuld zijn... referentie van game-template ofzo
class SignUpFormContainer extends Component {
  state = {
    userInfo: { email: '', password: '', firstName: '', lastName: '' },
    showAdminPass: false,
    adminPass: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.userInfo, this.state.showAdminPass ? this.state.adminPass : null);
    this.props.history.push('/login');
  }

  onChange = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  }

  onCheckadmin = (e) => this.setState({showAdminPass: e.target.checked});

  onChangeAdminPass = (e) => this.setState({adminPass: e.target.value});

  render() {
    if (this.props.currentUser) this.props.history.goBack();
    
    return ( <div>
      <button onClick={() => this.props.history.go(-2)}> x </button>
      <SignUpForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state} />

      {/* wil dit stuk eigenlijk gwn erbij in de signupform maar goed */}
      <p>
        <input type="checkbox" onChange={this.onCheckadmin} checked={this.state.showAdminPass} /> 
        {this.state.showAdminPass ? 
        <span>Admin password: <input type="password" name="adminPassword" onChange={this.onChangeAdminPass} value={this.state.adminPass}/></span>
        :
        <span>Register as admin?</span> }
        
      </p>
    </div> );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {signUp})(SignUpFormContainer);