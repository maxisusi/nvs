import type { NextPage } from 'next';
import Button from '../components/button/Button';
import AddIcon from '@mui/icons-material/Add';

const Customer: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl mb-3 font-bold'>Customers</h1>
          <p className='text-skin-gray'>Create and manage your customers</p>
        </div>

        <Button icon={<AddIcon />} text='Create Customer' />
      </div>
    </>
  );
};

export default Customer;
