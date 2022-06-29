import {
  GET_CUSTOMER_TO_EDIT,
  GET_CUSTOMER_TO_VIEW,
} from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';
import { NextPage } from 'next';
import client from 'pages/client.graphql';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { format, parseISO } from 'date-fns';

const customerViewPage = (props: Customer) => {
  console.log(props);
  const { createdAt, updatedAt, firstName, lastName } = props;
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>
            {firstName} {lastName}
          </h1>
          <p className='text-skin-gray text-sm'>
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
      <div className='grid grid-cols-12 gap-x-6 h-full'>
        <div className='bg-white drop-shadow rounded col-span-8 p-6'>test</div>
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
