import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface CustomerFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  postalCode: string;
  countryName: string;
  city: string;
  region: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('The Email must be valid'),
    phone: yup.string(),
    mobile: yup.string(),
    address: yup.string().required('Address is required'),
    postalCode: yup.string().required('Zip Code is required'),
    countryName: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
  })
  .required();

const CreateCustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data: CustomerFormInputs) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className='bg-white h-fit p-8 rounded drop-shadow grid grid-cols-8 gap-3 gap-y-6'>
      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Basic Info</h4>
        <button type='submit'>SUBMIT</button>
      </div>

      <TextInput
        formHandler={register('firstName')}
        onError={errors.firstName}
        label='First Name'
        value='firstName'
        required
      />
      <TextInput
        formHandler={register('lastName')}
        onError={errors.lastName}
        label='Last Name'
        required
      />
      <TextInput
        formHandler={register('email')}
        onError={errors.email}
        label='Email'
      />
      <TextInput
        formHandler={register('phone')}
        onError={errors.phone}
        label='Phone'
      />
      <TextInput
        formHandler={register('mobile')}
        onError={errors.mobile}
        label='Mobile'
      />

      <hr className='col-span-full my-2' />

      <div className='  h-14 col-span-2 row-span-3'>
        <h4 className='text-xl font-bold'>Billing Address</h4>
      </div>

      <TextInput
        formHandler={register('countryName')}
        onError={errors.countryName}
        label='Country'
        required
      />
      <TextInput
        formHandler={register('city')}
        onError={errors.city}
        label='City'
        required
      />
      <TextInput
        formHandler={register('region')}
        onError={errors.region}
        label='Region'
        required
      />
      <TextInput
        formHandler={register('postalCode')}
        onError={errors.postalCode}
        label='Zip Code'
        required
      />
      <TextInput
        formHandler={register('address')}
        onError={errors.address}
        label='Address'
        required
      />
    </form>
  );
};

export default CreateCustomerForm;

type InputProps = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  value?: string;
  formHandler?: any;
  onError?: any;
};

const TextInput = (props: InputProps) => {
  const { required, size, label, value, formHandler, onError } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-3'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          {...formHandler}
          type='text'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}
        />
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};

// <input
//   type='text'
//   className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
//     onErrorMessage?.length &&
//     'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
//   }`}
// />;
