import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const CustomerList = (props: Props) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          autoHeight
          columns={columns}
          density='comfortable'
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            backgroundColor: 'white',
            fontFamily: 'unset',

            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F5F6FA',
              color: '#64748b',
              minHeight: '3em !important',
              maxHeight: '3em !important',
              textTransform: 'uppercase',
              fontSize: '.75rem',
              letterSpacing: '1px',
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
              fontWeight: 'light',
            },

            '& .MuiDataGrid-row:nth-child(even)': {
              backgroundColor: '#f8fafc',
            },
            '& .MuiDataGrid-cell': {
              border: 'none',
            },
          }}
        />
      </div>
    </>
  );
};

export default CustomerList;
