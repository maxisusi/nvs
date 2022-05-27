import type { NextPage } from 'next';
import Button from '../components/button/Button';
import AddIcon from '@mui/icons-material/Add';

import CustomerList from '../components/customerList/CustomerList';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Customer: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>Customers</h1>
          <p className='text-skin-gray'>Create and manage your customers</p>
        </div>
        <div className='flex gap-3'>
          <Button variant='outlined' icon={<FilterAltIcon />} text='Filter' />
          <Button variant='full' icon={<AddIcon />} text='New Customer' />
        </div>
      </div>

      <CustomerList />
    </>
  );
};

export default Customer;
