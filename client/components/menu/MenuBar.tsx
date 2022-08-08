import React, { useEffect, useState } from 'react';
import MenuList from './MenuList/MenuList';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useRouter } from 'next/router';

const menu = [
  {
    id: 0,
    name: 'dashboard',
    icon: <DashboardOutlinedIcon />,
    link: `/dashboard`,
    active: false,
  },
  {
    id: 1,
    name: 'customers',
    icon: <AccountCircleOutlinedIcon />,
    link: `/customer`,
    active: false,
  },
  {
    id: 2,
    name: 'invoices',
    icon: <AssessmentOutlinedIcon />,
    link: `/invoice`,
    active: false,
  },
];

const MenuBar = () => {
  const [barMenu, setBarMenu] = useState(menu);
  const router = useRouter();

  /**
   * Set the menu bar to active according to the current page index
   * @param link
   */
  const activateBarLink = (link: string) => {
    const newMenu = menu.map((e) => {
      if (e.link.includes(link)) {
        e.active = true;
      } else {
        e.active = false;
      }
      return { ...e };
    });
    setBarMenu(newMenu);
  };

  /**
   * Triggers when the user click on a specific link.
   * Change the menu state to "active"
   * @param link
   */
  const handleChangePage = (link: string): void => {
    router.push(link);
    activateBarLink(link);
  };

  /**
   * Tracks the change of the current index page
   */
  useEffect(() => {
    const link: string = router.pathname;
    const linkName = link.split('/')[1];
    activateBarLink(linkName);
  }, [router.pathname]);

  return (
    <div className='w-64 bg-white border-r border-gray-200'>
      {barMenu.map((item) => (
        <div key={item.id} onClick={() => handleChangePage(item.link)}>
          <MenuList icon={item.icon} name={item.name} active={item.active} />
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
