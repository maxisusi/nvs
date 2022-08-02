import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
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
import Months from '../utils/months.json';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_STATS } from '@nvs-shared/graphql/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getMonthsAbbreviation = () => {
  const res = Months.map((month) => {
    return month.abbreviation;
  });
  return res;
};

const Dashboard: NextPage = () => {
  const { data, loading, error } = useQuery(GET_DASHBOARD_STATS, {
    fetchPolicy: 'cache-and-network',
  });
  const [headerData, setHeaderData] = useState({
    sumInvoices: 0,
    customerCount: 0,
    invoiceCount: 0,
  });

  useEffect(() => {
    if (!loading) {
      setHeaderData({
        sumInvoices: data.sumAllInvoices,
        customerCount: data.customerCount,
        invoiceCount: data.invoiceCount,
      });
    }
  }, [loading]);

  return (
    <div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='bg-white drop-shadow-sm col-span-4 p-3 rounded'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>
                CHF {headerData.sumInvoices}
              </h3>
              <h5 className='text-skin-gray text-xl'>Amount due</h5>
            </div>

            <div className='p-3 rounded-full bg-green-200 '>
              <AttachMoneyOutlinedIcon className='text-2xl text-green-500' />
            </div>
          </div>
        </div>
        <div className='bg-white drop-shadow-sm col-span-4 p-3'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>
                {headerData.customerCount}
              </h3>
              <h5 className='text-skin-gray text-xl'>Customers</h5>
            </div>

            <div className='  p-3 rounded-full bg-skin-hover '>
              <PersonOutlinedIcon className='text-2xl text-skin-fill' />
            </div>
          </div>
        </div>

        <div className='bg-white drop-shadow-sm col-span-4 p-3'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-3xl mb-2'>
                {headerData.invoiceCount}
              </h3>
              <h5 className='text-skin-gray text-xl'>Invoices</h5>
            </div>

            <div className='  p-3 rounded-full bg-skin-hover '>
              <DescriptionOutlinedIcon className='text-2xl text-skin-fill' />
            </div>
          </div>
        </div>

        <div className='bg-white drop-shadow-sm col-span-full p-6 h-96 max-h-full'>
          <div className='flex items-center gap-2'>
            <SignalCellularAltIcon className='text-skin-fill' />
            <p className='text-lg'>Total Sales</p>
          </div>
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
                      data: [],
                      borderColor: 'black',
                    },
                    {
                      label: 'Net Revenue',
                      data: [],
                      borderColor: 'green',
                    },
                  ],
                }}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='text-right'>
                <h4 className='text-xs'>Pending/Draft</h4>
                <h2 className='text-2xl font-bold text-black'>50CHF</h2>
              </div>
              <div className='text-right'>
                <h4 className='text-xs'>Net Revenue</h4>
                <h2 className='text-2xl font-bold text-green-600'>50CHF</h2>
              </div>
              <div className='text-right'>
                <h4 className='text-xs'>Total Invoices</h4>
                <h2 className='text-2xl font-bold text-skin-fill'>50 CHF</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
