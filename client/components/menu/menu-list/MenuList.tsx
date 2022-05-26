import React from 'react';

type Props = {
  icon: any;
  name: string;
  active: boolean;
};

const MenuList = (props: Props) => {
  return (
    <div className='group cursor-pointer my-2'>
      <div
        className={`flex gap-3 h-12 items-center group-hover:bg-skin-hover ${
          props.active && 'bg-skin-hover'
        }`}>
        <span
          className={`h-full w-1 group-hover:bg-skin-fill ${
            props.active && 'bg-skin-fill'
          }`}></span>
        <div
          className={`ml-8 text-skin-sc group-hover:text-skin-fill ${
            props.active && 'text-skin-fill'
          }`}>
          {props.icon}
        </div>
        <div
          className={`text-skin-sc group-hover:text-skin-fill capitalize ${
            props.active && 'text-skin-fill'
          }`}>
          {props.name}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
