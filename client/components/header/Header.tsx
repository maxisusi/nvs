import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='bg-skin-fill h-16 w-screen flex items-center justify-around'>
      <div className='flex justify-between w-full max-w-screen-2xl items-center'>
        <h1 className='text-skin-white'>KREATER</h1>
        <div className='flex gap-5 items-center'>
          <IconButton sx={{ color: 'white' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </IconButton>
          <Avatar
            alt='Remy Sharp'
            src='https://source.unsplash.com/800x800/?face'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
