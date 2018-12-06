import React from 'react';

const LoginForm = (props) => {
  return ( <div>
    <form onSubmit={props.onSubmit}>
      <p>
        Email: <input type="email" name="email" onChange={props.onChange} value={props.values.email} />
        Password: <input type="password" name="password" onChange={props.onChange} value={props.values.password} />
        First name: <input type="text" name="firstName" onChange={props.onChange} value={props.values.firstName} />
        Last name: <input type="text" name="lastName" onChange={props.onChange} value={props.values.lastName} />
      </p>
      <p>
        <input type="checkbox" onChange={props.onCheckadmin} checked={props.showAdminPass} /> 
        {props.showAdminPass ? 
        <span>Admin password: <input type="password" name="adminPassword" onChange={props.onChangeAdminPass} value={props.adminPass}/></span>
        :
        <span>Register as admin?</span> }
      </p>
      <input type="submit" name="submit" />
    </form>
  </div> );
}
 
export default LoginForm;