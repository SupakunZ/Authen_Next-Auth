import * as React from 'react';

interface IInputsProps {
  name: string,
  label: string,
  type: string,
  placeholder: string
}

const Inputs: React.FunctionComponent<IInputsProps> = (props) => {
  const { name, label, type, placeholder } = props
  return (
    <>
      <h1>Inputs</h1>
      <input name={name} type={type} placeholder={placeholder} />
    </>
  );
};

export default Inputs;
