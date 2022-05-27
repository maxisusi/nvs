import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
type Props = {};

const Header = (props: Props) => {
  return (
    <div className='fixed z-50 top-0 left-0 right-0 bg-skin-fill h-16 w-screen flex items-center p-6'>
      <div className='flex justify-between w-full items-center'>
        <h1 className='text-skin-white'>KREATER</h1>
        <div className='flex gap-5 items-center'>
          <button className='bg-white p-1 rounded hover:bg-gray-100'>
            <AddIcon className='text-skin-fill' />
          </button>
          <div className='relative flex items-center '>
            <SearchIcon className='absolute left-2 text-skin-gray' />
            <input
              type='text'
              placeholder='Search...'
              id='search'
              className='shadow-sm px-10 py-1 w-56 rounded'
            />
          </div>
          <IconButton sx={{ color: 'white' }}>
            <NotificationsNoneIcon className='text-skin-white' />
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
