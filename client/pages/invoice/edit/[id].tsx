import UpdateInvoiceForm from '@nvs-components/UpdateInvoiceForm';
import { GET_INVOICE_VIEW } from '@nvs-shared/graphql/invoice';
import client from 'pages/client.graphql';
import React from 'react';

type Props = {};

const editInvoice = (props: Props) => {
  return <UpdateInvoiceForm invoice={props} />;
};

export default editInvoice;

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
