import type { NextPage } from 'next';
import Button from '../components/button/Button';
import AddIcon from '@mui/icons-material/Add';

const Customer: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>Customers</h1>
        <Button icon={<AddIcon />} text='Create Customer' />
      </div>
    </>
  );
};

export default Customer;
