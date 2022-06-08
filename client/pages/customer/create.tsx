import React from 'react';
import type { NextPage } from 'next';
import CreateCustomerForm from '@nvs-components/CreateCustomerForm';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const Create: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>New Customer </h1>
          <p className='text-skin-gray'>
            Please fill-up the mandatory fields to create the customer
          </p>
        </div>

        <div className='flex gap-3'>
          <button
            className={`px-3 py-2 text-sm rounded flex gap-2 items-center font-semibold border border-skin-fill text-skin-fill hover:bg-skin-fill hover:text-skin-white`}>
            Reset
            <ClearIcon />
          </button>
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <SaveAltOutlinedIcon />
            Save Customer
          </button>
        </div>
      </div>

      <CreateCustomerForm />
    </>
  );
};

export default Create;
