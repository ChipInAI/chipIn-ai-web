import { useState } from 'react';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

const AuthModal = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleModalChange = () => {
    setIsSignUp(prev => !prev);
  };

  return (
    <>
      {isSignUp ? (
        <RegisterForm handleModalChange={handleModalChange} />
      ) : (
        <LoginForm handleModalChange={handleModalChange} />
      )}
    </>
  );
};

export default AuthModal;
