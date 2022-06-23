import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { useEffect, useReducer, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { $TSFixIt } from '@nvs-shared/types/general';
import { v4 as uuidv4 } from 'uuid';
import CustomerSearchList from './CustomerSearchList';
import TableRecord from './TableRecord';
import addDays from 'date-fns/addDays';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPANIES } from '@nvs-shared/graphql/companies';

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

  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
  const [state, dispatch] = useReducer(reducer, initialTableValues);
  const [invoiceTotal, setInvoiceTotal] = useState<number | null>(null);
  const [invoiceTerms, setInvoiceTerms] = useState<any>(null);

  const [dueDate, setDudeDate] = useState<any>(null);
  const [invoiceNotes, setInvoiceNotes] = useState<any>(null);
  const [customerSelected, setCustomerSelected] = useState<any>();
  const { data, loading, error } = useQuery(GET_ALL_COMPANIES);

  const handleFormSubmit = (customerSelected: any) => {
    if (customerSelected.length === 0 || !invoiceDate || !invoiceTerms)
      return alert('Missing input');

    const invoiceObject = {
      companyId: data.companies[0].id,
      customerId: customerSelected.id,
      date: invoiceDate,
      dueDate,
      terms: invoiceTerms,
      status: 'DRAFT',

      entries: state.itemData,
      taxes: 0.0,
      total: invoiceTotal,
      remarks: invoiceNotes,
    };
    console.log(invoiceObject);
  };

  // * Checks if the length of the list is above 1
  useEffect(() => {
    if (state.itemData.length === 1) {
      dispatch({ type: 'NOT_REMOVABLE' });
    }
  }, [state.itemData]);
  useEffect(() => {
    if (!invoiceTerms || !invoiceDate) return setDudeDate('');

    const fDate = invoiceTerms.split('_')[1];
    const dueDate = addDays(invoiceDate, fDate);
    setDudeDate(format(dueDate, 'MM/dd/yyyy'));
  }, [invoiceTerms, invoiceDate]);

  useEffect(() => {
    const total = state.itemData
      .map((item: any) => item.amount)
      .reduce((acc: any, value: any) => acc + value);

    setInvoiceTotal(total);
  }, [state]);

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
            onClick={() => handleFormSubmit(customerSelected)}
            className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <SaveAltOutlinedIcon />
            Save Invoice
          </button>
        </div>
      </div>

      <form
        onSubmit={() => handleFormSubmit(customerSelected)}
        className='h-fit grid grid-cols-12 gap-y-10'>
        <button hidden type='submit'></button>

        {/* Customer Selector */}

        <CustomerSearchList defineCustomer={setCustomerSelected} />

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
            <SelectInput
              state={setInvoiceTerms}
              values={termsList}
              required
              label='Terms'
            />
            <TextInput value={dueDate} disabled label='Payment Date' />
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
          <textarea
            onChange={(e) => setInvoiceNotes(e.target.value)}
            className='w-full h-32 rounded border border-gray-200 resize-none'
          />
        </div>

        <div className='col-start-10 col-span-full bg-white border p-6 rounded '>
          <div className='flex justify-between items-center '>
            <h3 className='uppercase font-bold text-skin-gray text-sm'>
              Total
            </h3>
            <h3 className='text-lg font-semibold'>
              <span>CHF </span>
              {invoiceTotal?.toFixed(2)}
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceForm;

type InputProps = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  formHandler?: any;
  onError?: any;
  disabled?: boolean;
  value?: any;
};

const TextInput = (props: InputProps) => {
  const { required, size, label, formHandler, onError, disabled, value } =
    props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          disabled={disabled}
          value={value}
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
  state: any;
};

type Country = {
  name: string;
  code: string;
};

const SelectInput = (props: SelectInput) => {
  const { required, size, label, formHandler, onError, values, state } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>

        <select
          onChange={(e) => state(e.target.value)}
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
