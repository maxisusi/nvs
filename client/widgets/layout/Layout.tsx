import React from 'react';
import Header from '../../components/Header/Header';
import MenuBar from '../../components/Menu/MenuBar';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <div className='flex flex-row h-screen'>
        <MenuBar />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
