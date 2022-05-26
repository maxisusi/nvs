import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

type Props = {};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
  },
  {
    field: 'amountDue',
    headerName: 'Amount Due',
    type: 'number',
    flex: 1,
  },
  {
    field: 'createdOn',
    headerName: 'Created On',
    flex: 1,
  },
];

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    amountDue: 254,
    phone: '079227817',
    createdOn: '01/05/1999',
  },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    phone: '079227817',
    amountDue: 3823782,
    createdOn: '01/05/1999',
  },
  {
    id: 3,
    lastName: 'Edward',
    firstName: 'London',
    amountDue: 27381,
    phone: '089382782',
    createdOn: '01/05/1999',
  },
];

const CustomerList = (props: Props) => {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default CustomerList;
