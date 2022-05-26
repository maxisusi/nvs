import React from 'react';
import Header from '../../components/header/Header';
import MenuBar from '../../components/menu/MenuBar';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <div className='flex w-screen h-screen '>
        <MenuBar />
        <div className='p-14'>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
