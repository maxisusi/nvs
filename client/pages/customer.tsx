import type { NextPage } from 'next';
import Button from '../components/button/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Customer: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-24'>
        <div>
          <h1 className='text-2xl mb-3 font-bold'>Customers</h1>
          <p className='text-skin-gray'>Create and manage your customers</p>
        </div>
        <Button icon={<AddIcon />} text='Create Customer' />
      </div>

      <div className='relative flex items-center'>
        <SearchIcon className='absolute left-2 text-skin-gray' />
        <input
          type='text'
          placeholder='Search customer'
          id='search'
          className='shadow-sm px-9 py-2 w-80 rounded ring-1 ring-inset ring-gray-200'
        />
      </div>
    </>
  );
};

export default Customer;
