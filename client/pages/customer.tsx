import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import type { NextPage } from 'next';
import Button from '../components/button/Button';
import CustomerList from '../components/customerList/customerList';

const Customer: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>Customers</h1>
          <p className='text-skin-gray'>Create and manage your customers</p>
        </div>
        <div className='flex gap-3'>
          <button className='border border-skin-fill font-semibold text-skin-fill px-3 py-2 rounded text-sm hover:bg-skin-fill hover:text-skin-white flex gap-2 items-center'>
            Filter
            <FilterAltIcon />
          </button>
          <Button variant='full' icon={<AddIcon />} text='New Customer' />
        </div>
      </div>

      <form className='relative'>
        <input
          type='reset'
          value='Clear all'
          className='absolute top-2 right-7 cursor-pointer hover:text-skin-fill'
        />

        <div className='my-10 bg-gray-200 py-8 px-6 rounded flex gap-5'>
          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm'>Display Name</label>
            <input type='text' className='rounded p-1.5 px-3 shadow' />
          </div>

          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm'>Contact Name</label>
            <input type='text' className='rounded p-1.5 px-3 shadow' />
          </div>

          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm'>Phone</label>
            <input type='text' className='rounded p-1.5 px-3 shadow' />
          </div>
        </div>
      </form>
      <CustomerList />
    </>
  );
};

export default Customer;
