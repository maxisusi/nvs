import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import type { NextPage } from 'next';
import { useState } from 'react';
import Button from '@nvs-components/Button/Button';
import CustomerFilter from '@nvs-components/CustomerFilter/CustomerFilter';
import CustomerGrid from '@nvs-components/CustomerGrid';
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from 'framer-motion';
import CustomerFilterProvider from '../../context/CustomerFilterContext';

const Customer: NextPage = () => {
  const [filterCustomer, setFilterCustomer] = useState(false);
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>Customers</h1>
          <p className='text-skin-gray'>Create and manage your customers</p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={() => setFilterCustomer(!filterCustomer)}
            className={`px-3 py-2 text-sm rounded flex gap-2 items-center font-semibold border border-skin-fill ${
              filterCustomer === false
                ? ' text-skin-fill hover:bg-skin-fill hover:text-skin-white'
                : 'bg-skin-fill text-skin-white hover:bg-skin-btnHover'
            }`}>
            Filter
            {filterCustomer === false ? <FilterAltIcon /> : <ClearIcon />}
          </button>
          <Button variant='full' icon={<AddIcon />} text='New Customer' />
        </div>
      </div>
      <CustomerFilterProvider>
        {filterCustomer && (
          <motion.div
            animate={{ y: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.3 }}>
            <CustomerFilter />
          </motion.div>
        )}
        <CustomerGrid isActive={filterCustomer} />
      </CustomerFilterProvider>
    </>
  );
};

export default Customer;
