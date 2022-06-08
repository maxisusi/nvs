import React from 'react';
import type { NextPage } from 'next';
import CreateCustomerForm from '@nvs-components/CreateCustomerForm';

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
      </div>

      <CreateCustomerForm />
    </>
  );
};

export default Create;
