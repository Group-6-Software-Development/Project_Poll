import React from 'react';
import UseRegisterForm from '../hooks/UseRegisterForm';
import './styles/Register.css';

const Register = () => {
  const { firstName, lastName, email, password, passwordAgain, handleFirstNameChange, handleLastNameChange, handleEmailChange, handlePasswordChange, handlePasswordAgainChange, resetForm } = UseRegisterForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering with:', { firstName, lastName, email, password });
    resetForm();
  };

  return (
    <div className='register-page'>
      <form className='register-form' onSubmit={handleSubmit}>
        <label className='first-name-message' htmlFor="firstName">First Name:</label>
        <input
          className='first-name-input'
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => handleFirstNameChange(e.target.value)}
        />
        
        <label className='last-name-message' htmlFor="lastName">Last Name:</label>
        <input
          className='last-name-input'
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => handleLastNameChange(e.target.value)}
        />
        
        <label className='email-message' htmlFor="email">Email:</label>
        <input
          className='email-input'
          type="text"
          id="email"
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

        <label className='password-again-message' htmlFor="passwordAgain">Password again:</label>
        <input
          className='password-again-input'
          type="password"
          id="passwordAgain"
          value={passwordAgain}
          onChange={(e) => handlePasswordAgainChange(e.target.value)}
        />

        <button className='register-button' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;