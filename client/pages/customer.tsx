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

      <CustomerList />
    </>
  );
};

export default Customer;
