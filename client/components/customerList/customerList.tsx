import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { format, parseISO } from 'date-fns';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { LastPageRounded } from '@mui/icons-material';

type Props = {};

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
      `${params.row.amountDue}.- `,
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
    <h4 className='text-3xl mb-2'>Oopsy, You don't have any customers!</h4>
    <p className='text-skin-gray'>
      Click on <strong>"New Customer"</strong> to create your first customer
    </p>
  </div>
);

const GET_CLIENTS = gql`
  query Customers($orderBy: OrderByParams) {
    customers(orderBy: $orderBy) {
      id
      firstName
      lastName
      phone
      createdAt
    }
  }
`;

const CustomerList = (props: Props) => {
  const { loading, error, data } = useQuery(GET_CLIENTS, {
    variables: {
      orderBy: {
        input: '',
      },
    },
  });

  const [row, setRow] = useState([]);
  console.log(data);

  useEffect(() => {
    if (!data) return;
    else {
      const formattedRows = data.customers.map((customer: any) => {
        return {
          id: customer.id,
          lastName: customer.lastName,
          firstName: customer.firstName,
          phone: customer.phone,
          createdOn: format(parseISO(customer.createdAt), 'yyyy-MM-dd'),
          amountDue: '',
        };
      });
      setRow(formattedRows);
    }
  }, [loading]);
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={row}
          loading={loading}
          error={error}
          columns={columns}
          density='comfortable'
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            NoRowsOverlay: NoDatas,
            ErrorOverlay: ErrorData,
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
