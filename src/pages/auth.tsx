import Register from '@/components/form/Register';
import * as React from 'react';

interface IAuthProps {
}

const Auth: React.FunctionComponent<IAuthProps> = (props) => {
  return (
    <>
      <h1>Auth Page</h1>
      {/* Register Form */}
      <Register />
    </>
  );
};

export default Auth;
