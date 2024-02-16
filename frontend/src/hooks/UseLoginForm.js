// Need to code this to handle connection with the backend COPY CODE FROM Webdev project
import { useState } from 'react';

const UseLoginForm = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return {
    username,
    password,
    handleEmailChange,
    handlePasswordChange,
    resetForm,
  };
};

export default UseLoginForm;
