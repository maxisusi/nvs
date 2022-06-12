import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InvoiceGrid from '@nvs-components/InvoiceGrid';
import type { NextPage } from 'next';
import { useState } from 'react';

const Invoice: NextPage = () => {
  const [filterCustomer, setFilterCustomer] = useState(false);
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>Invoices</h1>
          <p className='text-skin-gray'>Create and manage your invoices</p>
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

          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <AddIcon />
            New Invoice
          </button>
        </div>
      </div>
      <InvoiceGrid isActive={false} />
    </>
  );
};

export default Invoice;
