import * as React from 'react';
import Inputs from '../inputs/Iputs';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  return (
    <>
      <h1>Register Form</h1>
      <Inputs name='first name' label='First name' type='text' placeholder='first name' />
    </>
  );
};

export default Register;
