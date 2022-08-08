import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
type Props = {};

const Header = (props: Props) => {
  return (
    <div className='   bg-skin-fill h-11 w-screen flex items-center p-6'>
      <div className='flex justify-between w-full items-center'>
        <h1 className='text-skin-white ml-2'>KREATER</h1>
        <div className='flex gap-5 items-center'>
          <IconButton className='text-sm'>
            <AddIcon className='text-white' />
          </IconButton>

          <IconButton className='text-sm'>
            <NotificationsNoneIcon className='text-skin-white' />
          </IconButton>
          <Avatar
            sx={{ height: '30px', width: '30px' }}
            alt='Max Balej'
            src='https://source.unsplash.com/random/800x600'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
