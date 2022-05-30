import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

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
];

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    amountDue: '254',
    phone: '079227817',
    createdOn: '01/05/1999',
  },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    phone: '079227817',
    amountDue: '3823782',
    createdOn: '01/05/1999',
  },
  {
    id: 3,
    lastName: 'Edward',
    firstName: 'London',
    amountDue: '27381',
    phone: '089382782',
    createdOn: '01/05/1999',
  },
  {
    id: 4,
    lastName: 'Edward',
    firstName: 'London',
    amountDue: '27381',
    phone: '089382782',
    createdOn: '01/05/1999',
  },
  {
    id: 5,
    lastName: 'Snow',
    firstName: 'Jon',
    amountDue: '254',
    phone: '079227817',
    createdOn: '01/05/1999',
  },
  {
    id: 6,
    lastName: 'Lannister',
    firstName: 'Cersei',
    phone: '079227817',
    amountDue: '3823782',
    createdOn: '01/05/1999',
  },
  {
    id: 7,
    lastName: 'Edward',
    firstName: 'London',
    amountDue: '27381',
    phone: '089382782',
    createdOn: '01/05/1999',
  },
  {
    id: 8,
    lastName: 'Edward',
    firstName: 'London',
    amountDue: '27381',
    phone: '089382782',
    createdOn: '01/05/1999',
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

const CustomerList = (props: Props) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density='comfortable'
          // error={ErrorData}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
            '& .MuiDataGrid-cell:focus': {
              outline: 0,
            },
          }}
        />
      </div>
    </>
  );
};

export default CustomerList;
