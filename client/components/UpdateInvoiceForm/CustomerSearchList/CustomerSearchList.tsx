import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CancelIcon from '@mui/icons-material/Cancel';
import { Avatar } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useEffect, useReducer, useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS_LIST } from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const initMenuState = {
  isCustomerListOpen: false,
  customerSelectedData: [] as Customer | [],
  isCustomerSelected: false,
  searchQuery: '',
};

enum EntryActionKind {
  SELECT = 'SELECTED_CUSTOMER',
  REMOVE = 'REMOVE_SELECTED_CUSTOEMR',
  OPEN = 'OPEN_CUSTOMER_LIST',
  SEARCH = 'SEARCH_CUSTOMER',
}

interface EntryAction {
  type: EntryActionKind;
  payload?: any;
}

type Props = {
  selectedCustomerId: (arg: string | null) => void;
};

const CustomerSearchList = ({ selectedCustomerId }: Props) => {
  const reducer = (
    state: typeof initMenuState,
    action: EntryAction
  ): typeof initMenuState => {
    switch (action.type) {
      case EntryActionKind.SELECT: {
        return {
          ...state,
          isCustomerListOpen: false,
          isCustomerSelected: true,
          customerSelectedData: action.payload,
        };
      }

      case EntryActionKind.REMOVE: {
        return {
          ...initMenuState,
        };
      }

      case EntryActionKind.OPEN: {
        return {
          ...state,
          isCustomerListOpen: true,
        };
      }

      case EntryActionKind.SEARCH: {
        return {
          ...state,
          searchQuery: action.payload,
        };
      }

      default:
        return state;
    }
  };

  // * Reducer
  const [
    {
      isCustomerListOpen,
      isCustomerSelected,
      searchQuery,
      customerSelectedData,
    },
    dispatch,
  ] = useReducer(reducer, initMenuState);

  // * Graphql query to get customer datas
  const [customerList, setCustomerList] = useState<Customer[] | []>([]);
  const { data } = useQuery(GET_CUSTOMERS_LIST);

  // * Displays the data once they got fetched
  useEffect(() => {
    if (!data) return;
    setCustomerList(data.customers);
  }, [data]);

  // * Triggers once the customer has been selected
  useEffect(() => {
    if (!customerSelectedData) {
      selectedCustomerId(null);
      return;
    }

    let customerId;
    if ('id' in customerSelectedData) {
      customerId = customerSelectedData.id;
    }

    selectedCustomerId(customerId as string);
  }, [customerSelectedData]);

  // * Triggers the search query when it detects user input
  useEffect(() => {
    if (searchQuery === '') return setCustomerList(data?.customers);
    const searchResults = filterCustomers(customerList, searchQuery);

    setCustomerList(searchResults);
  }, [searchQuery]);

  // * Close the component if it detects the customer clicks away from it
  const handleClickAwayCustomerList = (isCustomerSelected: boolean) => {
    if (isCustomerSelected) return;
    dispatch({ type: EntryActionKind.REMOVE });
  };

  return (
    <ClickAwayListener
      onClickAway={() => handleClickAwayCustomerList(isCustomerSelected)}>
      <div className='relative  bg-white rounded border h-44 col-span-5 hover:bg-slate-100 cursor-pointer'>
        <div
          onClick={() => dispatch({ type: EntryActionKind.OPEN })}
          className='flex justify-center items-center h-full gap-3'>
          <AccountCircleIcon className='text-gray-300 text-4xl' />
          <p className='text-skin-sc text-xl font-semibold'>
            New Customer <span className='text-red-500'>*</span>
          </p>
        </div>

        {isCustomerListOpen && (
          <CustomerListMenu dispatch={dispatch} customers={customerList} />
        )}

        {/* Add new customer */}

        {isCustomerSelected && (
          <SelectedCustomerInfoMenu
            setCustomer={dispatch}
            customer={customerSelectedData as Customer}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default CustomerSearchList;

// * Displays when the customer has been selected
type SelectedCustomer = {
  customer: Customer;
  setCustomer: (arg: EntryAction) => void;
};

const SelectedCustomerInfoMenu = (props: SelectedCustomer) => {
  const { address, firstName, lastName, postalCode, city } = props.customer;

  const handleRemoveSelectedCustomer = (): void => {
    props.setCustomer({ type: EntryActionKind.REMOVE });
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

// * Menu of customers
type CustomerMenu = {
  customers: Customer[];
  dispatch: (arg: EntryAction) => void;
};

const CustomerListMenu = (props: CustomerMenu) => {
  const { customers, dispatch } = props;

  const handleSelectCustomer = (id: string) => {
    const index = customers.findIndex((customer) => customer.id === id);
    const customer = customers[index];
    dispatch({ type: EntryActionKind.SELECT, payload: customer });
  };

  const router = useRouter();

  return (
    <div className='absolute overflow-hidden hover:overflow-y-auto  max-h-96 flex flex-col justify-between min-h-full bg-white drop-shadow w-full z-30 top-0 rounded'>
      <div className='px-6 py-4 border border-r-0 border-l-0 border-t-0'>
        <input
          onChange={(e) =>
            dispatch({
              type: EntryActionKind.SEARCH,
              payload: e.target.value,
            })
          }
          type='text'
          className=' w-full rounded border-skin-fill border-2'
          placeholder='Search'
        />
      </div>
      <motion.div
        animate={{ y: [15, 0], opacity: [0, 1] }}
        transition={{ duration: 0.3, type: 'spring' }}>
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
      </motion.div>

      <div
        onClick={() => router.push('/customer/create')}
        className='flex w-full justify-center items-center px-6 py-3 gap-3 text-skin-fill bg-slate-100 hover:bg-slate-200 cursor-pointer'>
        <AddReactionIcon />
        Add new customer
      </div>
    </div>
  );
};

// * List label of customer
const CustomerList = (props: { customer: Customer }) => {
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

// * Search algorithm to find the customer
const filterCustomers = (row: any, query: string) => {
  const querySearch = query?.toLocaleLowerCase();
  const keys = ['firstName', 'lastName', 'postalCode', 'city'];
  return row.filter((item: any) =>
    keys.some((key) => item[key].toLowerCase().includes(querySearch))
  );
};
