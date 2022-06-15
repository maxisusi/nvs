import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Avatar } from '@mui/material';

import { $TSFixIt } from '@nvs-shared/types/general';
import { Customer } from '@nvs-shared/types/customer';
type Props = {
  dispatch: any;
  state: any;
  customerList: any;
};

const CustomerSearchList = (props: Props) => {
  const { dispatch, state, customerList } = props;
  return (
    <div className='relative  bg-white rounded border h-44 col-span-5 hover:bg-slate-100 cursor-pointer'>
      <div
        onClick={() => dispatch({ type: 'OPEN_CUSTOMER_LIST' })}
        className='flex justify-center items-center h-full gap-3'>
        <AccountCircleIcon className='text-gray-300 text-4xl' />
        <p className='text-skin-sc text-xl font-semibold'>
          New Customer <span className='text-red-500'>*</span>
        </p>
      </div>

      {/* Add new customer */}
      {state.customerListMenu && (
        <SelectCustomerMenu
          setCustomer={dispatch}
          setQuery={dispatch}
          customers={customerList}
        />
      )}

      {state.customerSelectedMenu && (
        <SelectedCustomerInfo
          setCustomer={dispatch}
          customer={state.selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerSearchList;

type SelectedCustomer = {
  customer: Customer;
  setCustomer: any;
};

const SelectedCustomerInfo = (props: SelectedCustomer) => {
  const { address, firstName, lastName, postalCode, city } = props.customer;

  const handleRemoveSelectedCustomer = (): void => {
    props.setCustomer({ type: 'REMOVE_SELECTED_CUSTOMER' });
  };

  return (
    <div className='absolute cursor-default p-6 flex flex-col justify-between min-h-full bg-white drop-shadow w-full z-30 top-0 rounded'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>
          {firstName} {lastName}
        </h3>
        <div
          onClick={() => handleRemoveSelectedCustomer()}
          className=' cursor-pointer font-semibold flex items-center gap-1 text-skin-fill'>
          <CancelIcon className='text-skin-gray hover:text-skin-fill' />
        </div>
      </div>
      <div>
        <h3 className='uppercase text-skin-gray space-x-2'>Bill to</h3>
        <p className='truncate'>
          {postalCode} - {city}{' '}
        </p>
        <p>{address}</p>
      </div>
    </div>
  );
};

type CustomerMenu = {
  customers: Customer[];
  setQuery: $TSFixIt;
  setCustomer: $TSFixIt;
};

const SelectCustomerMenu = (props: CustomerMenu) => {
  const handleSelectCustomer = (id: string) => {
    const index = props.customers.findIndex((customer) => customer.id === id);
    const customer = props.customers[index];

    props.setCustomer({ type: 'SELECTED_CUSTOMER', payload: customer });
  };
  return (
    <div className='absolute overflow-hidden hover:overflow-y-auto  max-h-96 flex flex-col justify-between min-h-full bg-white drop-shadow w-full z-30 top-0 rounded'>
      <div className='px-6 py-4 border border-r-0 border-l-0 border-t-0'>
        <input
          onChange={(e) =>
            props.setQuery({ type: 'SEARCH_CUSTOMER', payload: e.target.value })
          }
          type='text'
          className=' w-full rounded border-skin-fill border-2'
          placeholder='Search'
        />
      </div>

      {props.customers?.length === 0 ? (
        <h4 className='text-skin-gray text-center'>No customer found!</h4>
      ) : (
        props.customers?.map((customer: Customer) => (
          <div
            onClick={() => handleSelectCustomer(customer.id as string)}
            key={customer.id}>
            <CustomerList customer={customer} />
          </div>
        ))
      )}

      <div className='flex w-full justify-center items-center px-6 py-3 gap-3 text-skin-fill bg-slate-100 hover:bg-slate-200 cursor-pointer'>
        <AddReactionIcon className='' />
        Add new customer
      </div>
    </div>
  );
};

type SingleCustomer = {
  customer: Customer;
};

const CustomerList = (props: SingleCustomer) => {
  const { firstName, lastName, postalCode, city } = props.customer;

  return (
    <div className='hover:bg-slate-100 flex px-6 py-8 items-center gap-4 h-14 border border-r-0 border-l-0 border-t-0'>
      <Avatar>{firstName?.substring(0, 1)}</Avatar>
      <div>
        <h4 className='font-semibold'>
          {firstName} {lastName}
        </h4>
        <h4 className='text-sm text-skin-gray'>
          {postalCode} - {city}
        </h4>
      </div>
    </div>
  );
};
