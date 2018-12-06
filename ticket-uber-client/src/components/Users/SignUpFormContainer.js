import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignUpForm from './SignUpForm';
import {signUp} from '../../actions/users';

/// wil eigenlijk iets van feedback geven als bepaalde fields niet correct ingevuld zijn... referentie van game-template ofzo
class SignUpFormContainer extends Component {
  state = {
    userInfo: { email: '', password: '', firstName: '', lastName: '' },
    showAdminPass: false,
    adminPass: '',
    errorInfo: []
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.userInfo,
                      this.state.showAdminPass ? this.state.adminPass : null,
                      () => this.props.history.push('/login'),
                      (error) => {
                        if (JSON.parse(error.response.text).message.includes(`check 'errors' property for more info`)) {
                          this.setState({
                            errorInfo: JSON.parse(error.response.text).errors.map(error => Object.values(error.constraints))
                          });
                        }
                        else this.setState({errorInfo: [JSON.parse(error.response.text).message]});
                      });
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
      <SignUpForm onSubmit={this.onSubmit} 
                  onChange={this.onChange} 
                  values={this.state}
                  showAdminPass={this.state.showAdminPass}
                  adminPass={this.state.adminPass}
                  onChangeAdminPass={this.onChangeAdminPass}
                  onCheckadmin={this.onCheckadmin} />
      <p>{this.state.errorInfo.map(error => <span key={error}>{error} <br/></span>)}</p>
    </div> );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {signUp})(SignUpFormContainer);