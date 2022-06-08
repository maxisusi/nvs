import React from 'react';

type Props = {};

const CreateCustomerForm = (props: Props) => {
  return (
    <div className='bg-white h-fit p-8 rounded drop-shadow grid grid-cols-8 gap-3 gap-y-6'>
      {/* Basic Infos */}

      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Basic Info</h4>
      </div>
      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>First name</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
          />
        </div>
      </div>
      <div className='  h-14 col-span-3'>
        <div className=' h-50 col-span-3'>
          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm font-medium'>Last Name</label>
            <input
              type='text'
              className='rounded p-2 px-3 drop-shadow-sm border'
              required
            />
          </div>
        </div>
      </div>

      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>Email</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
            required
          />
        </div>
      </div>
      <div className='  h-14 col-span-3'>
        <div className=' h-50 col-span-3'>
          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm font-medium'>Phone</label>
            <input
              type='text'
              className='rounded p-1.5 px-3 drop-shadow-sm border'
              required
            />
          </div>
        </div>
      </div>
      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>Mobile</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
            required
          />
        </div>
      </div>

      <hr className='col-span-full my-2 border-gray-200' />

      {/* Address */}

      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Billing Address</h4>
      </div>
      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>Country</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
          />
        </div>
      </div>
      <div className='  h-14 col-span-3'>
        <div className=' h-50 col-span-3'>
          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm font-medium'>City</label>
            <input
              type='text'
              className='rounded p-2 px-3 drop-shadow-sm border'
              required
            />
          </div>
        </div>
      </div>

      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>Region</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
            required
          />
        </div>
      </div>
      <div className='  h-14 col-span-3'>
        <div className=' h-50 col-span-3'>
          <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm font-medium'>Zip Code</label>
            <input
              type='text'
              className='rounded p-1.5 px-3 drop-shadow-sm border'
              required
            />
          </div>
        </div>
      </div>
      <div className=' h-50 col-span-3'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm font-medium'>Address</label>
          <input
            type='text'
            className='rounded p-2 px-3 drop-shadow-sm border'
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerForm;
