import { gql, useQuery } from '@apollo/client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Modal } from '@mui/material';
import debounce from 'lodash.debounce';
import Skeleton from '@mui/material/Skeleton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useCustomerFilter } from '../../context/CustomerFilterContext';
import { $TSFixIt } from '../../shared/types';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

type Props = {
  isActive: boolean;
};

const ErrorData = () => (
  <div
    style={{ marginTop: '-20px' }}
    className='h-full w-full flex flex-col items-center  '>
    <img className='w-48 mt-20 mb-10' src='/Something.svg' />
    <h4 className='text-3xl mb-2'>Oopsy, Something went wrong...</h4>
    <p className='text-skin-gray'>Try to reload the page to fix the issue</p>
  </div>
);

const NoDatas = () => (
  <div
    style={{ marginTop: '-20px' }}
    className='h-full w-full flex flex-col items-center  '>
    <img className='w-48 mt-10 mb-10' src='/Nothing.svg' />
    <h4 className='text-3xl mb-2'>No customer found</h4>
    <p className='text-skin-gray'>
      Click on <strong>"New Customer"</strong> to create your first customer
    </p>
  </div>
);

const LoadingOverlay = () => (
  <div
    style={{ marginTop: '-35px' }}
    className='h-full w-full flex flex-col items-center z-10 absolute bg-white'>
    <div className='h-16 bg-white w-full flex items-center px-6'>
      <Skeleton sx={{ width: '100%' }}></Skeleton>
    </div>

    <div className='h-16 bg-slate-100 w-full flex items-center px-6'>
      <Skeleton sx={{ width: '100%' }}></Skeleton>
    </div>

    <div className='h-16 bg-white w-full flex items-center px-6'>
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
  const [selectedCellId, setSelectedCellId] = useState<$TSFixIt>();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: '0.5rem',
    bgcolor: 'background.paper',
    filter:
      'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    p: 4,
  };

  const handleDeleteCustomer = () => {
    console.log(selectedCellId);

    handleClose();

    handleOpenModal();
  };

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
        <div>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={row}
          loading={loadStatus}
          error={error}
          columns={columns}
          onCellClick={(params: GridCellParams) => {
            setSelectedCellId(params.id);
          }}
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
            minHeight: '500px',
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

        <Menu
          id='customer-menu'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              boxShadow: 'none',
              filter:
                'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));',
              width: '150px',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditOutlinedIcon className='text-skin-gray' fontSize='small' />
            </ListItemIcon>
            <ListItemText className='text-skin-base'>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <VisibilityOutlinedIcon
                className='text-skin-gray'
                fontSize='small'
              />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteCustomer}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon
                className='text-skin-gray'
                fontSize='small'
              />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex justify-center '>
            <div className='bg-red-100 p-3 rounded-full'>
              <WarningAmberOutlinedIcon className='text-red-500  text-3xl' />
            </div>
          </div>
          <div className='flex justify-center mt-6 flex-col text-center gap-3'>
            <h3 className='text-xl text-skin-base'>Are you sure?</h3>
            <p className='text-skin-gray text-sm'>
              You will not be able to recover this customer and all the related
              Invoices, Estimates and Payments.
            </p>
            <div className='flex gap-3 mt-5'>
              <button className='bg-red-500 text-skin-white w-full rounded py-2'>
                Ok
              </button>
              <button
                onClick={handleCloseModal}
                className='border text-skin-base w-full rounded py-2'>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerList;
