import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { useEffect, useReducer, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COMPANIES } from '@nvs-shared/graphql/companies';
import {
  CREATE_INVOICE,
  GET_INVOICES_FOR_GRID,
} from '@nvs-shared/graphql/invoice';
import { $TSFixIt } from '@nvs-shared/types/general';
import { format, formatISO } from 'date-fns';
import addDays from 'date-fns/addDays';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import CustomerSearchList from './CustomerSearchList';
import TableRecord from './TableRecord';

enum Terms {
  NET_7 = 'NET_7',
  NET_21 = 'NET_21',
  NET_30 = 'NET_30',
}

const emptyEntry = () => {
  return { id: uuidv4(), item: '', quantity: 0, price: 0, amount: 0 };
};

const initEntryTableValues = {
  isEntryRemovable: false,
  entryList: [emptyEntry()],
};

const CreateInvoiceForm = () => {
  enum InvoiceEntryActionKind {
    REMOVE = 'REMOVE_ENTRY',
    ADD = 'ADD_ENTRY',
    FREEZE_REMOVE = 'NOT_REMOVABLE',
    UPDATE = 'UPDATE_ENTRY',
  }

  interface EntryAction {
    type: InvoiceEntryActionKind;
    payload?: any;
  }

  const reducer = (state: typeof initEntryTableValues, action: EntryAction) => {
    switch (action.type) {
      case InvoiceEntryActionKind.REMOVE: {
        return {
          ...state,
          entryList: state.entryList.filter(
            (item: $TSFixIt) => item.id !== action.payload
          ),
        };
      }
      case InvoiceEntryActionKind.ADD: {
        return {
          isEntryRemovable: true,
          entryList: [...state.entryList, emptyEntry()],
        };
      }

      case InvoiceEntryActionKind.FREEZE_REMOVE: {
        return {
          ...state,
          isEntryRemovable: false,
        };
      }

      case InvoiceEntryActionKind.UPDATE: {
        const arrayIndex = state.entryList.findIndex(
          (item: any) => item.id === action.payload.id
        );
        let newArr = state.entryList;
        newArr[arrayIndex] = action.payload;

        return {
          ...state,
          entryList: newArr,
        };
      }
    }
  };
  // * Form Params

  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
  const [{ entryList, isEntryRemovable }, dispatch] = useReducer(
    reducer,
    initEntryTableValues
  );
  const [invoiceTotal, setInvoiceTotal] = useState<number | null>(null);
  const [invoiceSubTotal, setInvoiceSubTotal] = useState<number | null>(null);
  const [invoiceTerms, setInvoiceTerms] = useState<Terms | null>(null);

  const [invoiceTax, setInvoiceTax] = useState<any>(0);
  const [dueDate, setDudeDate] = useState<any>(null);
  const [invoiceNotes, setInvoiceNotes] = useState<any>('');
  const [customerSelected, setCustomerSelected] = useState<any>();
  const { data } = useQuery(GET_ALL_COMPANIES);

  const router = useRouter();
  const [createInvoice] = useMutation(CREATE_INVOICE);
  const handleFormSubmit = async (customerSelected: any) => {
    if (customerSelected.length === 0 || !invoiceDate || !invoiceTerms)
      return alert('Missing input');

    const trimmedData = entryList.map((item: any) => {
      console.log(item);
      const newEntry = {
        description: item.item,
        quantity: parseFloat(item.quantity),
        rate: parseFloat(item.quantity),
        total: parseFloat(item.price),
      };
      return newEntry;
    });

    const invoiceObject = {
      companyId: data.companies[0].id,
      customerId: customerSelected.id,
      date: invoiceDate,
      dueDate: formatISO(dueDate),
      terms: invoiceTerms,
      status: 'draft',
      entryList: trimmedData,
      taxes: parseFloat(invoiceTax),
      total: invoiceTotal,
      remarks: invoiceNotes,
    };

    try {
      await createInvoice({
        variables: { createInvoiceInput: invoiceObject },

        refetchQueries: () => [
          {
            query: GET_INVOICES_FOR_GRID,
          },
        ],
      }).then(() => {
        router.push('/invoice');
      });
    } catch (e) {
      alert('There was an error, please check the console for further details');
      console.error(e);
    }
  };

  // * Checks if the length of the list is above 1
  useEffect(() => {
    if (entryList.length === 1) {
      dispatch({ type: InvoiceEntryActionKind.FREEZE_REMOVE });
    }
  }, [entryList]);

  useEffect(() => {
    if (!invoiceTerms || !invoiceDate) return setDudeDate('');

    const fDate = invoiceTerms.split('_')[1];
    const dueDate = addDays(invoiceDate, fDate);
    setDudeDate(dueDate);
  }, [invoiceTerms, invoiceDate]);

  useEffect(() => {
    const total = entryList
      .map((item: any) => item.amount)
      .reduce((acc: any, value: any) => acc + value);

    setInvoiceSubTotal(total);

    const totalWithTax = total * (invoiceTax / 100) + total;
    setInvoiceTotal(totalWithTax);
  }, [entryList, invoiceTax]);

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
            <SelectInvoiceTerms
              setTermValue={setInvoiceTerms}
              termValueList={termsList}
              required
              label='Terms'
            />

            {dueDate && (
              <InvoiceDueDateInput
                value={format(dueDate, 'MM/dd/yyyy')}
                label='Payment Date'
              />
            )}
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

            {entryList.map((item: $TSFixIt) => (
              <TableRecord
                key={item.id}
                isRemovable={isEntryRemovable}
                dispatch={dispatch}
                id={item.id}
              />
            ))}
            {/* Add new Item */}
            <div
              onClick={() => dispatch({ type: InvoiceEntryActionKind.ADD })}
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
          <div className='flex justify-between items-center mb-6'>
            <h3 className='uppercase font-bold text-skin-gray text-sm'>
              Subtotal
            </h3>
            <h3 className='text-md font-semibold'>
              <span>CHF </span>
              {invoiceSubTotal?.toFixed(2)}
            </h3>
          </div>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='uppercase font-bold text-skin-gray text-sm'>
              Taxes
            </h3>
            <select
              onChange={(e) => setInvoiceTax(e.target.value)}
              className='text-sm font-semibold border-none py-0 '>
              <option value={0.0}>-</option>
              <option value={7.7}>7.7%</option>
            </select>
          </div>
          <hr />
          <div className='flex justify-between items-center mt-6'>
            <h3 className='uppercase font-bold text-skin-gray text-lg'>
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

type InvoiceDueDateInputProps = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  disabled?: boolean;
  value: string;
};

const InvoiceDueDateInput = (props: InvoiceDueDateInputProps) => {
  const { required, size, label, value } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          disabled
          value={value}
          type='text'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill bg-slate-200`}
        />
      </div>
    </div>
  );
};

const termsList = {
  NET_7: 'Net 7 days',
  NET_21: 'Net 21 days',
  NET_30: 'Net 30 days',
};

type SelectInput = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  onError?: any;
  termValueList: typeof termsList;
  setTermValue: (selectedTerm: typeof termsList) => void;
};

const SelectInvoiceTerms = (props: SelectInput) => {
  const { required, size, label, onError, termValueList, setTermValue } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-1'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>

        <select
          onChange={(e) => setTermValue(e.target.value as Terms)}
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}>
          <option hidden value={''}>
            Select term
          </option>
          {Object.keys(termValueList).map((term: any) => (
            <option key={term} value={term}>
              {termValueList[term]}
            </option>
          ))}
        </select>
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};
