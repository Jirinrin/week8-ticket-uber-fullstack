import React from 'react';

const LoginForm = (props) => {
  return ( <div>
    <form onSubmit={props.onSubmit}>
      <p>
        Email: <input type="email" name="email" onChange={props.onChange} value={props.values.email} />
        Password: <input type="password" name="password" onChange={props.onChange} value={props.values.password} />
        <input type="submit" name="submit" />
      </p>
    </form>
  </div> );
}
 
export default LoginForm;