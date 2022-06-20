import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  CREATE_CUSTOMER,
  GET_CUSTOMERS_FOR_GRID,
} from '@nvs-shared/graphql/customers';
import CustomerSearchList from './CustomerSearchList';
import TableRecord from './TableRecord';
import { $TSFixIt } from '@nvs-shared/types/general';
import { v4 as uuidv4 } from 'uuid';

const termsList = {
  NET_7: 'Net 7 days',
  NET_21: 'Net 21 days',
  NET_30: 'Net 30 days',
};
const initialTableValues = {
  isRemovable: false,
  itemData: [{ id: uuidv4(), item: '', quantity: 0, price: 0, amount: 0 }],
};
const emptyEntry = () => {
  return { id: uuidv4(), item: '', quantity: 0, price: 0, amount: 0 };
};

const CreateInvoiceForm = () => {
  const reducer = (state: $TSFixIt, action: $TSFixIt) => {
    switch (action.type) {
      case 'REMOVE_ENTRY': {
        return {
          ...state,
          itemData: state.itemData.filter(
            (item: $TSFixIt) => item.id !== action.payload
          ),
        };
      }
      case 'ADD_NEW_ENTRY': {
        return {
          isRemovable: true,
          itemData: [...state.itemData, emptyEntry()],
        };
      }

      case 'NOT_REMOVABLE': {
        return {
          ...state,
          isRemovable: false,
        };
      }

      case 'UPDATE_ENTRY': {
        const arrayIndex = state.itemData.findIndex(
          (item: any) => item.id === action.payload.id
        );
        let newArr = state.itemData;
        newArr[arrayIndex] = action.payload;

        return {
          ...state,
          itemData: newArr,
        };
      }
    }
  };
  // * Form Params
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
  const [state, dispatch] = useReducer(reducer, initialTableValues);

  console.log(state);
  // * Checks if the length of the list is above 1
  useEffect(() => {
    if (state.itemData.length === 1) {
      dispatch({ type: 'NOT_REMOVABLE' });
    }
  }, [state.itemData]);
  // * Create a new customer mutation
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const formSubmit = async (data: CustomerFormInputs) => {
    try {
      await createCustomer({
        variables: { createCustomerInput: data },

        refetchQueries: () => [
          {
            query: GET_CUSTOMERS_FOR_GRID,
          },
        ],
      }).then(() => {
        reset();
        router.push('/customer');
      });
    } catch (e) {
      alert('There was an error, please check the console for further details');
      console.error(e);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>New Invoice</h1>
          <p className='text-skin-gray'>
            Please fill-up the mandatory fields to create the invoice.
          </p>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={() => reset()}
            className={`px-3 py-2 text-sm rounded flex gap-2 items-center font-semibold border border-skin-fill text-skin-fill hover:bg-skin-fill hover:text-skin-white`}>
            Reset
            <ClearIcon />
          </button>
          <button
            onClick={handleSubmit(formSubmit)}
            className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <SaveAltOutlinedIcon />
            Save Invoice
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className='h-fit grid grid-cols-12 gap-y-10'>
        <button hidden type='submit'></button>

        {/* Customer Selector */}

        <CustomerSearchList />

        {/* Invoice Details */}

        <div className='h-14  col-start-7 col-span-full'>
          <div className='grid grid-cols-2 gap-3'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Basic example'
                value={invoiceDate}
                onChange={(newValue) => {
                  setInvoiceDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-medium capitalize'>
                      Invoice Date
                      <span className='text-red-500'>*</span>
                    </label>
                    <div className='flex items-center relative'>
                      <input
                        className={` w-full rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill`}
                        ref={inputRef}
                        {...inputProps}
                      />
                      <span className='absolute right-5 '>
                        {InputProps?.endAdornment}
                      </span>
                    </div>
                  </div>
                )}
              />
            </LocalizationProvider>
            <SelectInput values={termsList} required label='Terms' />
            <TextInput disabled label='Payment Date' />
          </div>
        </div>

        {/* Table */}

        <div className='bg-white rounded border col-span-full pt-3 relative mb-10'>
          {/* Header */}
          <div className='grid grid-cols-8 gap-x-6 '>
            <div className='col-span-3 h-8 flex items-center font-semibold pl-12 text-slate-700 text-sm'>
              Items
            </div>
            <div className=' col-span-2 h-8 flex items-center justify-end font-semibold text-slate-700  text-sm'>
              Quantity
            </div>
            <div className=' col-span-2 h-8 flex items-center font-semibold text-slate-700  text-sm'>
              Price
            </div>
            <div className='col-span-1 h-8 flex items-center font-semibold text-slate-700 justify-end text-sm pr-12 '>
              Amount
            </div>
            <hr className='col-span-full border-slate-200  w-full mt-2' />

            {/* Items */}

            {state.itemData.map((item: $TSFixIt) => (
              <TableRecord
                key={item.id}
                isRemovable={state.isRemovable}
                dispatch={dispatch}
                id={item.id}
              />
            ))}
            {/* Add new Item */}
            <div
              onClick={() => dispatch({ type: 'ADD_NEW_ENTRY' })}
              className='col-span-full hover:bg-slate-200 cursor-pointer h-14 items-center w-full bg-slate-100 flex justify-center gap-2'>
              <AddCircleIcon className='text-skin-fill' />
              <p className='text-skin-fill'>Add New Item</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='col-span-4  h-14 relative'>
          <h3 className='font-semibold absolute -top-7'>Notes</h3>
          <textarea className='w-full h-32 rounded border border-gray-200 resize-none' />
        </div>

        <div className='col-start-10 col-span-full bg-white border p-6 rounded '>
          <div className='flex justify-between items-center '>
            <h3 className='uppercase font-bold text-skin-gray text-sm'>
              Total
            </h3>
            <h3 className='text-lg font-semibold'>
              <span>CHF </span>45.00
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceForm;

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

type InputProps = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  formHandler?: any;
  onError?: any;
  disabled?: boolean;
};

const TextInput = (props: InputProps) => {
  const { required, size, label, formHandler, onError, disabled } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          disabled={disabled}
          {...formHandler}
          type='text'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          } ${disabled && `bg-slate-200`}`}
        />
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};

type SelectInput = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  formHandler?: any;
  onError?: any;
  values: any;
};

type Country = {
  name: string;
  code: string;
};

const SelectInput = (props: SelectInput) => {
  const { required, size, label, formHandler, onError, values } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>

        <select
          {...formHandler}
          type='select'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}>
          <option hidden value={''}>
            Select term
          </option>
          {Object.keys(values).map((term: any) => (
            <option key={term} value={term}>
              {values[term]}
            </option>
          ))}
        </select>
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};
