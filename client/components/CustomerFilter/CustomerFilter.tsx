import React from 'react';
import { useCustomerFilter } from '../../context/CustomerFilterContext';
import debounce from 'lodash.debounce';

type Props = {};

const CustomerFilter = (props: Props) => {
  const [filterQuery, setFilterQuery] = useCustomerFilter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery({
      ...filterQuery,
      displayName: e.target.value,
    });
  };

  return (
    <form className='relative'>
      {/* <input
        type='reset'
        value='Clear all'
        className='absolute top-2 right-7 cursor-pointer hover:text-skin-fill'
      /> */}

      <div className='my-10 bg-gray-200 py-8 px-6 rounded flex gap-5'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm'>Display Name</label>
          <input
            onChange={(e) => handleFormChange(e)}
            type='text'
            className='rounded p-1.5 px-3 shadow'
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm text-skin-gray'>Contact Name</label>
          <input disabled type='text' className='rounded p-1.5 px-3 shadow' />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm text-skin-gray'>Phone</label>
          <input disabled type='text' className='rounded p-1.5 px-3 shadow' />
        </div>
      </div>
    </form>
  );
};

export default CustomerFilter;
