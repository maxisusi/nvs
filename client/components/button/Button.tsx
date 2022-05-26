import React from 'react';

type Props = {
  text: string;
  variant?: string;
  icon?: any;
};

const Button = (props: Props) => {
  return (
    <button className='bg-skin-fill text-skin-white p-3 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-3 items-center'>
      {props.icon && props.icon}
      {props.text}
    </button>
  );
};

export default Button;
