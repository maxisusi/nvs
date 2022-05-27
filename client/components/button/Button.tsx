import React from 'react';

type Props = {
  text: string;
  variant: 'outlined' | 'full';
  icon?: any;
};

const Button = (props: Props) => {
  const buttons = [
    {
      outlined: {
        button: () => (
          <button className='border border-skin-fill font-semibold text-skin-fill px-3 py-2 rounded text-sm hover:bg-skin-fill hover:text-skin-white flex gap-2 items-center'>
            {props.icon && props.icon}
            {props.text}
          </button>
        ),
      },

      full: {
        button: () => (
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            {props.icon && props.icon}
            {props.text}
          </button>
        ),
      },
    },
  ];

  return buttons[0][props.variant].button();
};

export default Button;
