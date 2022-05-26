import React from 'react';

type Props = {
  icon: any;
  name: string;
};

const MenuList = (props: Props) => {
  return (
    <div className='group cursor-pointer my-2'>
      <div className='flex gap-3 h-12 items-center group-hover:bg-skin-hover'>
        <div className='h-full w-1 group-hover:bg-skin-fill'></div>
        <div className='ml-8 text-skin-sc group-hover:text-skin-fill '>
          {props.icon}
        </div>
        <div className='text-skin-sc group-hover:text-skin-fill capitalize'>
          {props.name}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
