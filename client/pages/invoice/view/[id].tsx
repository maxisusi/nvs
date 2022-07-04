import { GET_INVOICE_VIEW } from '@nvs-shared/graphql/invoice';
import { $TSFixIt } from '@nvs-shared/types/general';
import { format, parseISO } from 'date-fns';
import client from 'pages/client.graphql';
import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const invoiceViewPage = (props: $TSFixIt) => {
  const {
    createdAt,
    dueDate,
    invoiceNumber,
    customer,
    company,
    date,
    total,
    entry,
  } = props;
  console.log(props);
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
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <PictureAsPdfIcon />
            Download
          </button>
        </div>
      </div>

      {/* Invoice View */}

      <div className='bg-white drop-shadow-sm w-full p-6 rounded'>
        {/* header */}
        <div className='w-full grid grid-cols-2 gap-y-3 content-between'>
          {/* Logo */}

          <div className='col-span-1 '>
            <img src='https://loremflickr.com/100/100/business' />
          </div>

          <div className='col-span-1 justify-self-end'>
            <h2 className='uppercase text-4xl'>invoice</h2>
            <p className='text-sm text-skin-gray'>
              #{invoiceNumber.split('-')[0]}
            </p>
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
          <div className='col-span-1'>
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
            <div className='grid grid-cols-2 gap-x-10 bg-slate-100 rounded p-3 border'>
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
          <thead className='text-left bg-slate-100 rounded-md p-5 font-normal uppercase text-sm '>
            <tr>
              <th className='font-semibold'>Description</th>
              <th className='font-semibold'>Quantity</th>
              <th className='font-semibold'>Rate</th>
              <th className='font-semibold'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {entry.map((entry: any) => (
              <tr key={entry.id} className='mb-5'>
                <td>{entry.description}</td>
                <td>{entry.quantity}</td>
                <td>CHF {entry.rate}</td>
                <td className='text-right font-semibold'>
                  CHF {entry.total.toFixed(2)}
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr> */}
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
