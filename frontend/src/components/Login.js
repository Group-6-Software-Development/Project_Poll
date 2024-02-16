
import React from 'react';
import UseLoginForm from '../hooks/UseLoginForm';
import './styles/Login.css';

const Login = () => {
  const { email, password, handleEmailChange, handlePasswordChange, resetForm } = UseLoginForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    resetForm();
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        
          <label className='email-message' htmlFor="email">Email:</label>
          <input
            className='email-input'
            type="text"
            id="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        
          <label className='password-message' htmlFor="password">Password:</label>
          <input
            className='password-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />

        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
