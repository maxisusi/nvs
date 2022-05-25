import React from 'react';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='bg-skin-fill h-16 w-screen flex items-center justify-around'>
      <div className='flex justify-between w-full max-w-screen-2xl'>
        <h1 className='text-skin-white'>KREATER</h1>
        <div className='flex gap-5'>
          <h1 className='text-skin-white'> hello mate</h1>
          <h1 className='text-skin-white'> hello mate</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
