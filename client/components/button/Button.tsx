import React from 'react';

type Props = {
  text: string;
  variant?: string;
  icon?: any;
};

const Button = (props: Props) => {
  return (
    <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
      {props.icon && props.icon}
      {props.text}
    </button>
  );
};

export default Button;
