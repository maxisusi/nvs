import { useMutation, useQuery } from '@apollo/client';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, IconButton, Modal } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  DataGrid,
  GridCellParams,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCustomerFilter } from '@nvs-context/CustomerFilterContext';
import {
  DEL_CUSTOMER,
  GET_CUSTOMERS_FOR_GRID,
} from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';
import GridDisplayOverlays from './utils/GridDisplayOverlays';
import { useRouter } from 'next/router';
import {
  DEL_INVOICE,
  GET_INVOICES_FOR_GRID,
} from '@nvs-shared/graphql/invoice';
import { Invoice } from '@nvs-shared/types/invoice';
import { $TSFixIt } from '@nvs-shared/types/general';

type Props = {
  isActive: boolean;
};

interface InvoiceRow {
  id: string;
  lastName: string;
  firstName: string;
  date: string;
  invoiceNumber: string;
  status: string;
  total: number;
}

const InvoiceGrid = (props: Props) => {
  const { loading, error, data } = useQuery(GET_INVOICES_FOR_GRID);
  const [removeInvoice] = useMutation(DEL_INVOICE);
  // const [{ displayName }] = useCustomerFilter();

  const [loadingOverlay, setLoadingOverlay] = useState(true);
  const [row, setRow] = useState<InvoiceRow[] | []>([]);

  const [cellId, setCellId] = useState<string>();

  // * Modal State manager
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // * Menu State manager
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const handleOpenDeleteInvoiceModal = () => {
    handleCloseMenu();
    handleOpenModal();
  };

  const handleOpenViewInvoice = (invoiceId: string) => {
    router.push(`invoice/view/${invoiceId}`);
  };

  const handleEditInvoice = (customerId: string) => {
    router.push(`invoice/edit/${customerId}`);
  };

  /**
   * Delete invoice in DB and updates the UI
   * @param cellId
   */

  const handleDeleteInvoice = async (cellId: string) => {
    try {
      await removeInvoice({
        variables: { removeInvoiceId: cellId },
        update: (store) => {
          const previousData: any = store.readQuery({
            query: GET_INVOICES_FOR_GRID,
          });

          store.writeQuery({
            query: GET_INVOICES_FOR_GRID,
            data: {
              invoices: previousData.invoices.filter(
                (invoice: Invoice) => invoice.id !== cellId
              ),
            },
            overwrite: true,
          });
        },
      }).then(() => handleCloseModal());
    } catch (e) {
      alert('There was an error, please check the console for further details');
      console.error(e);

      handleCloseModal();
    }
  };

  /**
   * Display the filtered results of customers
   * based on the search query
   */

  // TODO: Make a query search for the invoices
  // useEffect(() => {
  //   if (!displayName || !props.isActive)
  //     return setRow(defaultCustomerRowValues);

  //   setLoadingOverlay(true);
  //   const searchResult = filterCustomers(row, displayName);
  //   debounceSearchResult();

  //   setRow(searchResult);
  // }, [displayName, props.isActive]);

  const debounceSearchResult = useCallback(
    debounce(() => {
      setLoadingOverlay(false);
    }, 500),
    []
  );

  /**
   * Format the data after fetching and
   * displays to the customer grid component
   */

  useEffect(() => {
    if (!data) return;
    else {
      setLoadingOverlay(false);
      setRow(defaultCustomerRowValues);
    }
  }, [loading, data]);

  const defaultCustomerRowValues = useMemo(() => {
    if (!data) return row;

    return data.invoices.map((invoice: Invoice) => {
      return {
        id: invoice.id,
        lastName: invoice.customer.lastName,
        firstName: invoice.customer.firstName,
        createdAt: format(parseISO(invoice.date), 'yyyy-MM-dd'),
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        total: invoice.total,
      };
    });
  }, [data]);

  const columns: $TSFixIt = [
    {
      field: 'createdAt',
      headerName: 'Date',
      cellClassName: 'field-style',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'left',
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: 'invoiceNumber',
      headerName: 'Number',
      flex: 0.5,
      disableColumnMenu: true,
      cellClassName: 'name-style',
      headerAlign: 'left',
      headerClassName: 'MuiDataGrid-columnHeaders',
      renderCell: (params: GridValueGetterParams) => {
        const fullID = params.row.invoiceNumber;
        const id = fullID.split('-')[0];
        return (
          <h1
            className='hover:text-skin-fill'
            onClick={() => handleOpenViewInvoice(params.row.id)}>{`#${id}`}</h1>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Customer',
      cellClassName: 'field-style',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'left',
      headerClassName: 'MuiDataGrid-columnHeaders',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'left',
      headerClassName: 'MuiDataGrid-columnHeaders',
      renderCell: (params: GridRenderCellParams) =>
        displayInvoiceStatus(params.row.status),
    },

    {
      field: 'total',
      headerName: 'Total',
      cellClassName: 'field-style',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'left',
      headerClassName: 'MuiDataGrid-columnHeaders',
      valueGetter: (params: GridValueGetterParams) => `${params.row.total}.-`,
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
          <IconButton onClick={handleOpenMenu}>
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
          loading={loadingOverlay}
          error={error}
          columns={columns}
          onCellClick={(params: GridCellParams) => {
            setCellId(params.id as string);
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
          sx={gridStyle}
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
          onClose={handleCloseMenu}
          sx={menuStyle}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={() => handleEditInvoice(cellId as string)}>
            <ListItemIcon>
              <EditOutlinedIcon className='text-skin-gray' fontSize='small' />
            </ListItemIcon>
            <ListItemText className='text-skin-base'>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleOpenViewInvoice(cellId as string)}>
            <ListItemIcon>
              <VisibilityOutlinedIcon
                className='text-skin-gray'
                fontSize='small'
              />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenDeleteInvoiceModal}>
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
        <Box sx={modalStyle}>
          <div className='flex justify-center '>
            <div className='bg-red-100 p-3 rounded-full'>
              <WarningAmberOutlinedIcon className='text-red-500  text-3xl' />
            </div>
          </div>
          <div className='flex justify-center mt-6 flex-col text-center gap-2'>
            <h3 className='text-xl text-skin-base'>Are you sure?</h3>
            <p className='text-skin-gray text-sm'>
              You will not be able to recover this invoice.
            </p>
            <div className='flex gap-3 mt-5'>
              <button
                onClick={() => handleDeleteInvoice(cellId as string)}
                className='bg-red-500 hover:bg-red-600 text-skin-white w-full rounded py-2'>
                Ok
              </button>
              <button
                onClick={handleCloseModal}
                className='border hover:bg-slate-100 text-skin-base w-full rounded py-2'>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default InvoiceGrid;

const displayInvoiceStatus = (status: string) => {
  const statusStyles: any = {
    draft: {
      bg: 'bg-slate-300',
      text: 'text-slate-900',
    },
    paid: {
      bg: 'bg-emerald-300',
      text: 'text-emerald-900',
    },
    pending: {
      bg: 'bg-amber-300',
      text: 'text-amber-900',
    },
  };

  return (
    <div
      className={`${statusStyles[status]?.bg} ${statusStyles[status]?.text} p-0.5 px-2 rounded text-xs uppercase`}>
      {status}
    </div>
  );
};

const filterCustomers = (row: InvoiceRow[], query: string): InvoiceRow[] => {
  const querySearch = query.toLocaleLowerCase();
  const keys = ['firstName', 'lastName', 'phone'];
  return row.filter((item: any) =>
    keys.some((key) => item[key].toLowerCase().includes(querySearch))
  );
};

const handleRowEmptyValue = (field: string) => {
  return `${field === '' ? '-' : `${field}`}`;
};

const { ErrorData, LoadingOverlay, NoDatas } = GridDisplayOverlays();

const columnParams: any = (field?: string) => {
  const params = {
    flex: 1,
    disableColumnMenu: true,
    headerAlign: 'left',
    headerClassName: 'MuiDataGrid-columnHeaders',
  };

  if (!field) {
    return params;
  } else {
    return Object.assign(params, {
      valueGetter: (params: GridValueGetterParams) =>
        handleRowEmptyValue(params.row[field]),
    });
  }
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  borderRadius: '0.5rem',
  bgcolor: 'background.paper',
  filter:
    'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
  p: 4,
};

const gridStyle = {
  backgroundColor: 'white',
  fontFamily: 'unset',
  border: 'none',
  minHeight: '500px',
  filter:
    'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
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
};

const menuStyle = {
  '& .MuiPaper-root': {
    boxShadow: 'none',
    filter:
      'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));',
    width: '150px',
  },
};
