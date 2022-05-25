import React from 'react';
import MenuList from './menu-list/MenuList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const menu = [
  {
    id: 0,
    name: 'clients',
    icon: <AccountCircleOutlinedIcon />,
  },
  {
    id: 1,
    name: 'invoices',
    icon: <AssessmentOutlinedIcon />,
  },
];

const MenuBar = () => {
  return (
    <div className='w-60 pt-6 h-screen drop-shadow-xl bg-white'>
      {menu.map((item, key) => (
        <MenuList icon={item.icon} name={item.name} key={item.id} />
      ))}
    </div>
  );
};

export default MenuBar;
