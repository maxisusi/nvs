import React from 'react';

type Props = {
  icon: any;
  name: string;
  active: boolean;
};

const MenuList = (props: Props) => {
  return (
    <div className='group cursor-pointer'>
      <div
        className={`flex gap-3 h-12 items-center group-hover:bg-skin-hover ${
          props.active && 'bg-skin-hover'
        }`}>
        <span
          className={`h-full w-1  ${props.active && 'bg-skin-fill'}`}></span>
        <div
          className={`text-sm ml-3 text-skin-gray group-hover:text-skin-sc  ${
            props.active && 'text-skin-fill group-hover:text-skin-fill'
          }`}>
          {props.icon}
        </div>
        <p
          className={`text-sm font-semibold  capitalize ${
            props.active && 'text-skin-fill'
          }`}>
          {props.name}
        </p>
      </div>
    </div>
  );
};

export default MenuList;
