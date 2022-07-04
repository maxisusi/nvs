import AddIcon from '@mui/icons-material/Add';
import { GET_CUSTOMER_TO_VIEW } from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';
import { format, formatISO, parseISO } from 'date-fns';
import client from 'pages/client.graphql';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Months from '../../../utils/months.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Avatar from '@mui/material/Avatar';
import { Invoice } from '@nvs-shared/types/invoice';
import { useEffect, useMemo, useState } from 'react';
import { $TSFixIt } from '@nvs-shared/types/general';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const customerViewPage = (props: $TSFixIt) => {
  console.log(props);
  const {
    createdAt,
    updatedAt,
    countryName,
    firstName,
    lastName,
    email,
    mobile,
    postalCode,
    city,
    region,
    address,
    invoice,
    contactPoint,
    phone,
    meta,
  } = props;

  const getMonthsAbbreviation = () => {
    const res = Months.map((month) => {
      return month.abbreviation;
    });
    return res;
  };

  const [draftAndPendingInvoiceTotal, setDraftAndPendingInvoiceTotal] =
    useState(0);

  const [netTotalInvoice, setNetTotalInvoice] = useState(0);

  useEffect(() => {
    const totalDraftAndPending = meta.invoiceTotal.reduce(
      (acc: number, value: number) => acc + value
    );

    const totalNetValue = meta.netProfit.reduce(
      (acc: number, value: number) => acc + value
    );

    setDraftAndPendingInvoiceTotal(totalDraftAndPending);
    setNetTotalInvoice(totalNetValue);
  }, [meta]);

  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>
            {firstName} {lastName}
          </h1>
          <p className='text-skin-gray'>
            Customer since:{' '}
            <span>{format(parseISO(createdAt), 'MM/dd/yyyy')}</span>
          </p>
        </div>
        <div className='flex gap-3'>
          <button className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <AddIcon />
            New Transaction
          </button>
        </div>
      </div>

      {/* GRID  */}
      <div className='grid grid-cols-12 gap-6 grid-rows-6 '>
        {/* Main Board */}
        <div className='bg-white drop-shadow rounded col-span-8 row-span-full p-6'>
          <div className='w-full'>
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <SignalCellularAltIcon className='text-skin-fill' />
                  <p className='text-lg '>Total Sales</p>
                </div>
              </div>

              <select className='rounded border-gray-300'>
                <option>This year</option>
                <option>Last year</option>
              </select>
            </div>
            {/* Graphic */}
            <div className='flex justify-between items-center gap-3 h-72'>
              <div className='w-3/4  h-full'>
                <Line
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={{
                    labels: getMonthsAbbreviation(),
                    datasets: [
                      {
                        label: 'Pending Invoices',
                        data: meta.invoiceTotal,
                        borderColor: 'black',
                      },
                      {
                        label: 'Net Revenue',
                        data: meta.netProfit,
                        borderColor: 'green',
                      },
                    ],
                  }}
                />
              </div>
              <div className='flex flex-col gap-5'>
                <div className='text-right'>
                  <h4 className='text-sm'>Pending</h4>
                  <h2 className='text-lg font-bold text-black'>
                    {draftAndPendingInvoiceTotal}CHF
                  </h2>
                </div>
                <div className='text-right'>
                  <h4 className='text-sm'>Sales</h4>
                  <h2 className='text-lg font-bold text-green-600'>
                    {netTotalInvoice}CHF
                  </h2>
                </div>
              </div>
            </div>
            <hr className='mt-10 mb-10' />
            {/* Personnal informations */}

            <div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-8'>
                  <AccountCircleIcon className='text-skin-fill' />
                  <p className='text-lg '>Personnal Info</p>
                </div>

                <div className='text-xs text-skin-gray'>
                  Last update:
                  <span className='italic font-semibold'>
                    {' '}
                    {format(parseISO(updatedAt), 'MM/dd/yyyy')}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-6 gap-y-5 gap-x-5 text-sm'>
                <div className='col-span-2'>
                  <p className='text-skin-gray'>Display Name</p>
                  <p className='font-semibold break-words'>
                    {firstName} {lastName}
                  </p>
                </div>

                {email && (
                  <div className='col-span-2 '>
                    <p className='text-skin-gray'>Email</p>
                    <p className='font-semibold break-words'>{email}</p>
                  </div>
                )}

                {phone && (
                  <div className='col-span-2'>
                    <p className='text-skin-gray'>Phone</p>
                    <p className='font-semibold break-words'>{phone}</p>
                  </div>
                )}

                {mobile && (
                  <div className='col-span-2'>
                    <p className='text-skin-gray'>Mobile</p>
                    <p className='font-semibold break-words'>{mobile}</p>
                  </div>
                )}

                <div className='col-span-2'>
                  <p className='text-skin-gray'>Country</p>
                  <p className='font-semibold break-words'>{countryName}</p>
                </div>

                <div className='col-span-2'>
                  <p className='text-skin-gray'>Address</p>
                  <p className='font-semibold break-words'>{city}</p>
                  <p className='font-semibold break-words'>{region}</p>
                  <p className='font-semibold break-words'>{postalCode}</p>
                  <p className='font-semibold break-words'>{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Invoice Data */}
        <div className='bg-white drop-shadow rounded col-span-4 row-span-3'>
          <div>
            <div className='flex items-center gap-2 p-6 border border-t-0 border-r-0 border-l-0'>
              <DescriptionIcon className='text-skin-fill' />
              <p className='text-lg'>Latest Invoices</p>
            </div>
          </div>
          {/* Latest invoice list */}
          <div className='h-72 overflow-hidden hover:overflow-y-auto'>
            {invoice!.map((invoice: any) => (
              <div
                key={invoice.invoiceNumber}
                className='flex group justify-between gap-2 text-sm p-3 border border-r-0 border-l-0 border-t-0  hover:bg-slate-100 cursor-pointer'>
                <div className='flex gap-5'>
                  <p className='italic text-skin-gray group-hover:hidden'>
                    {format(parseISO(invoice.date), 'yy.MM.dd')}
                  </p>
                  <p className='italic text-skin-gray hidden group-hover:block'>
                    {`#${invoice.invoiceNumber.split('-')[0]}`}
                  </p>
                  {displayInvoiceStatus(invoice.status)}
                </div>
                <p className='font-semibold'>{invoice.total.toFixed(2)}CHF</p>
              </div>
            ))}

            {invoice!.length === 0 && (
              <div className='flex w-full h-full bg-slate-100 justify-center pt-8 text-skin-gray gap-2'>
                <InfoOutlinedIcon />
                No invoices
              </div>
            )}
          </div>
        </div>

        {/* Contact Points */}
        <div className='bg-white drop-shadow rounded col-span-4  row-span-3 '>
          <div>
            <div className='flex items-center gap-2 p-6 border border-t-0 border-r-0 border-l-0'>
              <ContactPhoneIcon className='text-skin-fill' />
              <p className='text-lg'>Contact Points</p>
            </div>
          </div>
          {/* Contacts Point List */}
          <div className='h-72 overflow-hidden hover:overflow-auto'>
            {contactPoint!.map((contact: any) => (
              <div
                key={contact.name}
                className='flex group items-center gap-5 text-sm p-3 border border-r-0 border-l-0 border-t-0  hover:bg-slate-100 cursor-pointer'>
                <Avatar>{contact.name?.substring(0, 1)}</Avatar>
                <div className='flex flex-col'>
                  <p className='font-semibold text-lg'>{contact.name}</p>
                  {contact.email && (
                    <p className='text-skin-gray italic'>{contact.email}</p>
                  )}
                </div>
              </div>
            ))}
            {contactPoint!.length === 0 && (
              <div className='flex w-full h-full bg-slate-100 justify-center pt-8 text-skin-gray gap-2'>
                <InfoOutlinedIcon />
                No Contact Points
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default customerViewPage;

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

export async function getServerSideProps({ params }: any) {
  const customerId = params.id;

  const { data, error } = await client.query({
    query: GET_CUSTOMER_TO_VIEW,
    variables: { customerId: customerId },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: data.customer,
  };
}
