import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomerFilter from '@nvs-components/CustomerFilter';
import CustomerGrid from '@nvs-components/CustomerGrid';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomerFilterProvider from '@nvs-context/CustomerFilterContext';

const Customer: NextPage = () => {
  const [filterCustomer, setFilterCustomer] = useState(false);
  const router = useRouter();
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
                ? '  text-skin-fill hover:bg-skin-fill hover:text-skin-white'
                : 'bg-skin-fill text-skin-white hover:bg-skin-btnHover'
            }`}>
            Filter
            {filterCustomer === false ? <FilterAltIcon /> : <ClearIcon />}
          </button>

          <button
            onClick={() => router.push('/customer/create')}
            className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <AddIcon />
            New Customer
          </button>
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
