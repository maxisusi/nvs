import { gql, useQuery } from '@apollo/client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import debounce from 'lodash.debounce';
import Skeleton from '@mui/material/Skeleton';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useCustomerFilter } from '../../context/CustomerFilterContext';
import { $TSFixIt } from '../../shared/types';

type Props = {
  isActive: boolean;
};

const columns: GridColDef[] = [
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'name-style',
    headerClassName: 'MuiDataGrid-columnHeaders',
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    disableColumnMenu: true,
    headerAlign: 'left',
    cellClassName: 'field-style',
    headerClassName: 'MuiDataGrid-columnHeaders',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.phone === '' ? '-' : `${params.row.phone}`}`,
  },
  {
    field: 'amountDue',
    headerName: 'Amount Due',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 1,
    cellClassName: 'field-style',
    headerClassName: 'MuiDataGrid-columnHeaders',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.amountDue === '' ? '-' : `${params.row.amountDue}.-`}`,
  },
  {
    field: 'createdOn',
    headerName: 'Created On',
    flex: 1,
    disableColumnMenu: true,
    headerAlign: 'left',
    cellClassName: 'field-style',
    headerClassName: 'MuiDataGrid-columnHeaders',
  },
  {
    field: 'actionButton',
    headerName: '',
    disableColumnMenu: true,
    sortable: false,
    editable: false,
    flex: 0.2,
    cellClassName: 'MuiDataGrid-cell',
    renderCell: (params: GridRenderCellParams) => (
      <IconButton>
        <MoreHorizIcon />
      </IconButton>
    ),
  },
];

const ErrorData = () => (
  <div className='h-full w-full flex flex-col items-center  '>
    <img className='w-1/5 mt-20 mb-10' src='/Something.svg' />
    <h4 className='text-3xl mb-2'>Oopsy, Something went wrong...</h4>
    <p className='text-skin-gray'>Try to reload the page to fix the issue</p>
  </div>
);

const NoDatas = () => (
  <div className='h-full w-full flex flex-col items-center  '>
    <img className='w-1/4 mt-10 mb-10' src='/Nothing.svg' />
    <h4 className='text-3xl mb-2'>No customer found</h4>
    <p className='text-skin-gray'>
      Click on <strong>"New Customer"</strong> to create your first customer
    </p>
  </div>
);

const LoadingOverlay = () => (
  <div
    style={{ marginTop: '-36px' }}
    className='h-full w-full flex flex-col items-center z-10 absolute bg-white'>
    <div className='h-14 bg-white w-full flex items-center px-6'>
      <Skeleton sx={{ width: '100%' }}></Skeleton>
    </div>

    <div className='h-14 bg-slate-100 w-full flex items-center px-6'>
      <Skeleton sx={{ width: '100%' }}></Skeleton>
    </div>

    <div className='h-14 bg-white w-full flex items-center px-6'>
      <Skeleton sx={{ width: '100%' }}></Skeleton>
    </div>
  </div>
);

const GET_CLIENTS = gql`
  query Customers {
    customers {
      id
      firstName
      lastName
      phone
      createdAt
    }
  }
`;

const CustomerList = (props: Props) => {
  const [filterQuery, setFilterQuery] = useCustomerFilter();
  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);
  const [loadStatus, setLoadStatus] = useState(true);
  const [row, setRow] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  /**
   * Search algorithm
   *
   * @param data
   * @returns
   */
  const searchCustomer = (data: $TSFixIt) => {
    const keys = ['firstName', 'lastName', 'phone'];
    return data.filter((item: any) =>
      keys.some((key) =>
        item[key].toLowerCase().includes(filterQuery.displayName.toLowerCase())
      )
    );
  };

  /**
   * Checks if the filter is active
   */
  useEffect(() => {
    if (!props.isActive) {
      setRow(customerData);
    }
  }, [props.isActive]);

  /**
   * Checks the user input to start researching
   */
  useEffect(() => {
    if (filterQuery.displayName === '') return setRow(customerData);

    setLoadStatus(true);
    const res = searchCustomer(row);

    loadAfterInput();

    setRow(res);
  }, [filterQuery.displayName]);

  const loadAfterInput = useCallback(
    debounce(() => {
      setLoadStatus(false);
    }, 500),
    []
  );

  /**
   * Format the datas to display them on the grid
   */

  useEffect(() => {
    if (!data) return;
    else {
      setLoadStatus(false);
      const formattedRows = data.customers.map((customer: $TSFixIt) => {
        return {
          id: customer.id,
          lastName: customer.lastName,
          firstName: customer.firstName,
          phone: customer.phone,
          createdOn: format(parseISO(customer.createdAt), 'yyyy-MM-dd'),
          amountDue: '',
        };
      });
      // * Set the default data formatted from the DB
      setCustomerData(formattedRows);

      // * Displays the customers
      setRow(formattedRows);
    }
  }, [loading]);
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={row}
          loading={loadStatus}
          error={error}
          columns={columns}
          density='comfortable'
          pageSize={5}
          rowsPerPageOptions={[10]}
          components={{
            NoRowsOverlay: NoDatas,
            ErrorOverlay: ErrorData,
            LoadingOverlay: LoadingOverlay,
          }}
          disableSelectionOnClick
          sx={{
            backgroundColor: 'white',
            fontFamily: 'unset',
            border: 'none',
            minHeight: '650px',
            filter:
              'drop-shadow(0 2px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F5F6FA',
              color: '#64748b',
              minHeight: '3em !important',
              maxHeight: '3em !important',
              textTransform: 'uppercase',
              fontSize: '.75rem',
              letterSpacing: '1px',
            },
            '& .MuiDataGrid-columnHeaders:focus': {
              outline: 0,
            },

            '& .MuiDataGrid-virtualScroller': {
              marginTop: '35px !important',
            },
            '& .name-style': {
              fontWeight: '500',
              fontSize: '0.95rem',
              cursor: 'pointer',
            },
            '& .field-style': {
              color: '#58667a',
            },
            '& .MuiDataGrid-row': {
              zIndex: 1,
            },

            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f8fafc',
            },
            '& .MuiDataGrid-cell': {
              border: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 0,
            },
          }}
        />
      </div>
    </>
  );
};

export default CustomerList;
