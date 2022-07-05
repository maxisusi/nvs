import {
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

const invoiceViewPage = (props: $TSFixIt) => {
  const {
    createdAt,
    dueDate,
    invoiceNumber,
    customer,
    company,
    status,
    date,
    total,
    entry,
    id,
  } = props;

  const router = useRouter();
  console.log(props);

  const [invoiceStatus, setInvoiceStatus] = useState(status);
  const [updateInvoiceStatus] = useMutation(UPDATE_INVOICE_STATUS);

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
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
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
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <MoreHorizIcon />
          </button>
        </div>
      </div>

      {/* Invoice View */}

      <div className='bg-white drop-shadow-sm w-full p-6 rounded'>
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
          <div className='col-span-1 justify-self-end self-end text-right'>
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
      </div>
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
