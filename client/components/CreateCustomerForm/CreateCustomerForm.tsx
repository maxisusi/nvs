import React from 'react';

type Props = {};

const CreateCustomerForm = (props: Props) => {
  return (
    <div className='bg-white h-fit p-8 rounded drop-shadow grid grid-cols-8 gap-3 gap-y-6'>
      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Basic Info</h4>
      </div>

      <TextInput label='First Name' required />
      <TextInput label='Last Name' required />
      <TextInput label='Email' />
      <TextInput label='Phone' />
      <TextInput label='Mobile' />
      <TextInput label='Mobile' />

      <hr className='col-span-full my-2' />

      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Billing Address</h4>
      </div>

      <TextInput label='Country' required />
      <TextInput label='City' required />
      <TextInput label='Region' required />
      <TextInput label='Zip Code' required />
      <TextInput label='Address' required />
    </div>
  );
};

export default CreateCustomerForm;

type InputProps = {
  label: string;
  required?: boolean;
  onErrorMessage?: string;
  size?: 'standard' | 'full';
};

const TextInput = (props: InputProps) => {
  const { onErrorMessage, required, size, label } = props;
  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-3'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          type='text'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onErrorMessage?.length &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}
        />
      </div>
      {onErrorMessage?.length && (
        <p className='text-sm text-red-500 mt-1'>{onErrorMessage}</p>
      )}
    </div>
  );
};
