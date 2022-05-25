import React from 'react';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

type Props = {};

const MenuList = (props: Props) => {
  return (
    <div className='group cursor-pointer'>
      <div className='flex gap-1 h-12 items-center group-hover:bg-skin-hover'>
        <div className='h-full w-1 group-hover:bg-skin-fill '></div>
        <AssessmentOutlinedIcon className='ml-8 text-skin-sc group-hover:text-skin-fill' />
        <div className='text-skin-sc group-hover:text-skin-fill'>Dashboard</div>
      </div>
    </div>
  );
};

export default MenuList;
