import React, { useEffect } from 'react';
import MenuList from './menu-list/MenuList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from 'next/router';
const menu = [
  {
    id: 0,
    name: 'customers',
    icon: <AccountCircleOutlinedIcon />,
    link: `/customer`,
    active: false,
  },
  {
    id: 1,
    name: 'invoices',
    icon: <AssessmentOutlinedIcon />,
    link: `/invoice`,
    active: false,
  },
];

const MenuBar = () => {
  const router = useRouter();
  const handleChangePage = (link: string): void => {
    router.push(link);

    menu.map((e) => {
      if (e.link.includes(link)) {
        e.active = true;
      } else {
        e.active = false;
      }
    });
  };

  return (
    <div className='fixed z-40 top-16 left-0 right-0 w-64 pt-6 h-screen  bg-white border-r border-gray-200'>
      {menu.map((item) => (
        <div key={item.id} onClick={() => handleChangePage(item.link)}>
          <MenuList icon={item.icon} name={item.name} active={item.active} />
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
