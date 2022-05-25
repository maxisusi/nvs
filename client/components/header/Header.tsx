import { Avatar } from '@mui/material';
import React from 'react';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='bg-skin-fill h-16 w-screen flex items-center justify-around'>
      <div className='flex justify-between w-full max-w-screen-2xl items-center'>
        <h1 className='text-skin-white'>KREATER</h1>
        <div className='flex gap-5 items-center'>
          <h1 className='text-skin-white'> hello mate</h1>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </div>
      </div>
    </div>
  );
};

export default Header;
