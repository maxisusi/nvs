import {
  DEL_INVOICE,
  GET_INVOICES_FOR_GRID,
  GET_INVOICE_VIEW,
  UPDATE_INVOICE_STATUS,
} from '@nvs-shared/graphql/invoice';
import { $TSFixIt } from '@nvs-shared/types/general';
import { format, parseISO } from 'date-fns';
import client from 'pages/client.graphql';
import React, { useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useRouter } from 'next/router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMutation } from '@apollo/client';
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Invoice } from '@nvs-shared/types/invoice';

const invoiceViewPage = (props: $TSFixIt) => {
  const {
    createdAt,
    updatedAt,
    dueDate,
    invoiceNumber,
    customer,
    company,
    status,
    date,
    total,
    entry,
    taxes,
    id,
    remarks,
  } = props;

  const router = useRouter();
  console.log(props);

  // * Menu State manager
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // * Modal State manager
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [invoiceStatus, setInvoiceStatus] = useState(status);
  const [updateInvoiceStatus] = useMutation(UPDATE_INVOICE_STATUS);
  const [removeInvoice] = useMutation(DEL_INVOICE);

  const handleOpenDeleteInvoiceModal = () => {
    handleCloseMenu();
    handleOpenModal();
  };

  const handleInvoiceStatus = async (status: string) => {
    setInvoiceStatus(status);

    try {
      await updateInvoiceStatus({
        variables: {
          updateInvoiceInput: {
            id,
            status,
          },
        },
      });
    } catch (e) {
      alert('There was an error, please check the console for further details');
      console.error(e);
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      await removeInvoice({
        variables: { removeInvoiceId: invoiceId },
        update: (store) => {
          const previousData: any = store.readQuery({
            query: GET_INVOICES_FOR_GRID,
          });

          store.writeQuery({
            query: GET_INVOICES_FOR_GRID,
            data: {
              invoices: previousData.invoices.filter(
                (invoice: Invoice) => invoice.id !== invoiceId
              ),
            },
            overwrite: true,
          });
        },
      }).then(() => {
        handleCloseModal();
        router.push(`/customer/view/${customer.id}`);
      });
    } catch (e) {
      alert('There was an error, please check the console for further details');
      console.error(e);
      handleCloseModal();
    }
  };
  return (
    <>
      <div className=' flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>
            {customer.firstName} {customer.lastName}'s Invoice
          </h1>
          <p className='text-skin-gray'>
            Created at: <span>{format(parseISO(createdAt), 'MM/dd/yyyy')}</span>
          </p>
        </div>
        <div className='flex gap-3'>
          <select
            onChange={(e) => handleInvoiceStatus(e.target.value)}
            value={invoiceStatus}
            className='border-skin-fill bg-transparent rounded'>
            <option value='draft'>Draft</option>
            <option value='pending'>Pending</option>
            <option value='paid'>Paid</option>
          </select>
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <PictureAsPdfIcon />
            Download
          </button>
          <button
            onClick={handleOpenMenu}
            className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <MoreHorizIcon />
          </button>
        </div>
      </div>

      {/* Invoice View */}

      <div className='relative bg-white drop-shadow-sm w-full p-6 rounded'>
        <div className='absolute text-sm -bottom-7 right-1 text-skin-gray'>
          Last update: {format(parseISO(updatedAt), 'MM/dd/yyyy')}
        </div>
        {/* header */}
        <div className='w-full grid grid-cols-2 gap-y-3 content-between'>
          {/* Logo */}

          <div className='col-span-1 '>
            <img src={company.image} className='h-28' />
          </div>

          <div className='col-span-1 justify-self-end'>
            <h2 className='uppercase text-4xl'>invoice</h2>
            <p className='text-sm text-skin-gray'>
              #{invoiceNumber.split('-')[0]}
            </p>
            {displayInvoiceStatus(invoiceStatus)}
          </div>

          {/* Company details */}
          <div className='col-span-2 mt-8'>
            <p className='font-semibold'>{company.name}</p>
            <p>{company.address}</p>
            <p>
              {company.postalCode} - {company.city}
            </p>
          </div>

          {/* Customer details */}
          <div
            onClick={() => router.push(`/customer/view/${customer.id}`)}
            className='col-span-1 cursor-pointer  hover:px-6 hover:bg-gradient-to-r  hover:from-slate-100 to-white'>
            <p className='text-skin-gray'>Bill to:</p>
            <p className='font-semibold'>
              {customer.firstName} {customer.lastName}
            </p>
            <p>{customer.address}</p>
            <p>
              {customer.postalCode} - {customer.city}
            </p>
          </div>
          <div className='relative col-span-1 justify-self-end self-end text-right'>
            <p className='absolute -bottom-6 right-3 text-sm text-skin-gray'>
              Tax rate: <span className='font-semibold'>+{taxes}%</span>
            </p>
            <div className='grid grid-cols-2 gap-x-10 bg-slate-50 rounded p-3 border'>
              <p className='text-skin-gray col-span-1'>Invoice date: </p>
              <p className='text-skin-gray font-semibold col-span-1 self-end'>
                {format(parseISO(date), 'MM.dd.yy')}
              </p>

              <p className='text-skin-gray col-span-1'>Due date: </p>
              <p className='text-skin-gray font-semibold col-span-1 self-end'>
                {format(parseISO(dueDate), 'MM.dd.yy')}
              </p>
              <p className='text-xl col-span-1 font-semibold'>Total: </p>
              <p className='text-xl font-semibold col-span-1 self-end '>
                CHF{total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <hr className='my-10' />
        {/* Table */}
        <table className='table-auto w-full '>
          <thead className='text-left bg-slate-50 border-b font-normal uppercase text-sm '>
            <tr>
              <th scope='col' className='font-semibold px-6 py-4 '>
                Description
              </th>
              <th scope='col' className='font-semibold px-6 py-4'>
                Quantity
              </th>
              <th scope='col' className='font-semibold px-6 py-4'>
                Rate
              </th>
              <th scope='col' className='font-semibold px-6 py-4'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {entry.map((entry: any) => (
              <tr key={entry.id} className='mb-5 border-b hover:bg-slate-100'>
                <td className='px-6 py-4'>{entry.description}</td>
                <td className='px-6 py-4'>{entry.quantity}</td>
                <td className='px-6 py-4'>CHF {entry.rate.toFixed(2)}</td>
                <td className=' font-semibold px-6 py-4'>
                  CHF {entry.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='mt-10'>
          <h4 className='font-semibold mb-2'>Remarks:</h4>
          <p className='text-sm italic'>"{remarks}"</p>
        </div>
      </div>

      <Menu
        id='invoice-menu'
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
        <MenuItem>
          <ListItemIcon>
            <EditOutlinedIcon className='text-skin-gray' fontSize='small' />
          </ListItemIcon>
          <ListItemText className='text-skin-base'>Edit</ListItemText>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <VisibilityOutlinedIcon
              className='text-skin-gray'
              fontSize='small'
            />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={() => handleOpenDeleteInvoiceModal()}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon
              className='text-skin-gray'
              fontSize='small'
            />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

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
                onClick={() => handleDeleteInvoice(id)}
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

export default invoiceViewPage;

export async function getServerSideProps({ params }: any) {
  const id = params.id;

  const { data, error } = await client.query({
    query: GET_INVOICE_VIEW,
    variables: { invoiceId: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: data.invoice,
  };
}

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
      className={`${statusStyles[status]?.bg} ${statusStyles[status]?.text} p-0.5 px-2 rounded text-xs uppercase w-fit mt-5`}>
      {status}
    </div>
  );
};

const menuStyle = {
  '& .MuiPaper-root': {
    marginTop: '10px',
    boxShadow: 'none',
    filter:
      'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));',
    width: '150px',
  },
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
