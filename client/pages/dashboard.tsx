import { NextPage } from 'next';
import React from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const Dashboard: NextPage = () => {
  return (
    <div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='bg-white drop-shadow-sm col-span-4 p-3 rounded'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>CHF 2'493.20</h3>
              <h5 className='text-skin-gray text-xl'>Amount due</h5>
            </div>

            <div className='  p-3 rounded-full bg-green-200 '>
              <AttachMoneyOutlinedIcon className='text-2xl text-green-500' />
            </div>
          </div>
        </div>
        <div className='bg-white drop-shadow-sm col-span-4 p-3'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>300</h3>
              <h5 className='text-skin-gray text-xl'>Customers</h5>
            </div>

            <div className=' bg-slate-300 p-3 rounded-full bg-skin-hover '>
              <PersonOutlinedIcon className='text-2xl text-skin-fill' />
            </div>
          </div>
        </div>

        <div className='bg-white drop-shadow-sm col-span-4 p-3'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>503</h3>
              <h5 className='text-skin-gray text-xl'>Invoices</h5>
            </div>

            <div className=' bg-slate-300 p-3 rounded-full bg-skin-hover '>
              <DescriptionOutlinedIcon className='text-2xl text-skin-fill' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
