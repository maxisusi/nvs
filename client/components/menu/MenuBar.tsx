import React from 'react';
import MenuList from './menu-list/MenuList';

const MenuBar = () => {
  return (
    <div className='w-64 pt-6 h-screen drop-shadow-xl bg-white'>
      <MenuList />
    </div>
  );
};

export default MenuBar;
