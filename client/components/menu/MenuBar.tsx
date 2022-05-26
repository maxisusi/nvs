import React from 'react';
import MenuList from './menu-list/MenuList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from 'next/router';
const menu = [
  {
    id: 0,
    name: 'clients',
    icon: <AccountCircleOutlinedIcon />,
    link: `/client`,
  },
  {
    id: 1,
    name: 'invoices',
    icon: <AssessmentOutlinedIcon />,
    link: `/invoice`,
  },
];

const MenuBar = () => {
  const router = useRouter();
  const handleChangePage = (link: string): void => {
    router.push(link);
  };

  return (
    <div className='w-60 pt-6 h-screen drop-shadow-xl bg-white'>
      {menu.map((item) => (
        <div key={item.id} onClick={() => handleChangePage(item.link)}>
          <MenuList icon={item.icon} name={item.name} />
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
