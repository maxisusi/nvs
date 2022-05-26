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
        {props.children}
      </div>
    </>
  );
};

export default Layout;
