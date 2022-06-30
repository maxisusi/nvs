import AddIcon from '@mui/icons-material/Add';
import { GET_CUSTOMER_TO_VIEW } from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';
import { format, parseISO } from 'date-fns';
import client from 'pages/client.graphql';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const customerViewPage = (props: Customer) => {
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
    phone,
  } = props;
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
      <div className='grid grid-cols-12 gap-x-6 '>
        <div className='bg-white drop-shadow rounded col-span-8 p-6'>
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
            <div className='flex justify-between items-center gap-7 h-72'>
              <div className='w-full h-full'>
                <Line
                  options={{ maintainAspectRatio: false }}
                  data={{
                    labels: ['Jun', 'Jul', 'Aug'],
                    datasets: [
                      {
                        label: '',
                        data: [5, 6, 7],
                      },
                      {
                        label: '',
                        data: [3, 2, 1],
                      },
                    ],
                  }}
                />
              </div>
              <div className='flex flex-col gap-5'>
                <div className='text-right'>
                  <h4 className='text-sm'>Pending</h4>
                  <h2 className='text-lg font-bold text-black'>225CHF</h2>
                </div>
                <div className='text-right'>
                  <h4 className='text-sm'>Sales</h4>
                  <h2 className='text-lg font-bold text-green-600'>225CHF</h2>
                </div>
              </div>
            </div>
            <hr className='mt-10 mb-10' />
            {/* Personnal informations */}

            <div>
              <div className='flex items-center gap-2 mb-8'>
                <AccountCircleIcon className='text-skin-fill' />
                <p className='text-lg '>Personnal Info</p>
              </div>

              <div className='grid grid-cols-6 gap-y-5 gap-x-5 text-sm'>
                <div className='col-span-2'>
                  <p className='text-skin-gray'>Display Name</p>
                  <p className='font-semibold break-words'>
                    {firstName} {lastName}
                  </p>
                </div>

                <div className='col-span-2 '>
                  <p className='text-skin-gray'>Email</p>
                  <p className='font-semibold break-words'>{email}</p>
                </div>

                <div className='col-span-2'>
                  <p className='text-skin-gray'>Phone</p>
                  <p className='font-semibold break-words'>{phone}</p>
                </div>

                <div className='col-span-2'>
                  <p className='text-skin-gray'>Mobile</p>
                  <p className='font-semibold break-words'>{mobile}</p>
                </div>

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
        {/* invoice Data */}
        <div className='bg-white drop-shadow rounded col-span-4 p-6'>test</div>
      </div>
    </>
  );
};

export default customerViewPage;

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
