import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Image,
  Font,
} from '@react-pdf/renderer';
import { $TSFixIt } from '@nvs-shared/types/general';
import { parseISO, format } from 'date-fns';

// Create styles
const parentStyles = StyleSheet.create({
  page: {
    backgroundColor: '#0000',
    color: 'black',
    fontFamily: 'Open Sans',
  },
  section: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },

  flexAlign: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textSm: {},

  grayText: {
    color: '#8a92a6',
  },
});

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf',
      fontWeight: 'bold',
    },
  ],
});

const InvoiceParentDoc = ({ invoiceDetails }: $TSFixIt) => {
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
  } = invoiceDetails;

  return (
    <Document title={'Invoice'}>
      {/*render a single page*/}
      <Page size='A4' style={parentStyles.page}>
        <View style={parentStyles.section}>
          <View style={{ position: 'relative', height: '100%' }}>
            <Header
              company={company}
              customer={customer}
              invoiceNumber={invoiceNumber}
              dueDate={dueDate}
              date={date}
              total={total}
            />
            {remarks && (
              <Text
                style={{
                  position: 'absolute',
                  bottom: '50',
                  fontSize: '10',
                }}>
                "{remarks}"
              </Text>
            )}

            <BodyTable entry={entry} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const headerStyle = StyleSheet.create({
  smallGray: {
    fontSize: '11',
    fontWeight: 'ultralight',
    color: '#8a92a6',
  },

  logoSize: {
    height: '100',
    width: '100',
  },
  invoiceTitle: {
    fontSize: '25',
    textTransform: 'uppercase',
  },

  invoiceDetailsParties: {
    fontSize: '12',
  },
  invoiceDetailsPartiesBold: {
    fontSize: '12',
    fontWeight: 'bold',
  },
});

const Header = ({ company, customer, invoiceNumber, dueDate, date, total }) => (
  <View style={{ marginBottom: '50' }}>
    <View style={{ marginBottom: '25' }}>
      <View style={parentStyles.flexAlign}>
        <View>
          <Image
            style={headerStyle.logoSize}
            source={{
              uri: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3eea2ea9-f0a1-4be8-bb83-77f96d71c04c_512x512.jpeg',
              method: 'GET',
              headers: '',
              body: '',
            }}
          />
        </View>

        <View>
          <Text style={headerStyle.invoiceTitle}>Invoice</Text>
          <Text style={headerStyle.smallGray}>
            # {invoiceNumber.split('-')[0]}
          </Text>
        </View>
      </View>
    </View>

    {/* Parties Infos */}
    <View>
      <View style={{ marginBottom: '25' }}>
        <Text style={headerStyle.invoiceDetailsPartiesBold}>
          {company.name}
        </Text>
        <Text style={headerStyle.invoiceDetailsParties}>{company.address}</Text>
        <Text style={headerStyle.invoiceDetailsParties}>
          {company.postalCode} - {company.city}
        </Text>
      </View>

      <View style={{ marginBottom: '5' }}>
        <View style={parentStyles.flexAlign}>
          <View>
            <Text style={headerStyle.smallGray}>Bill to:</Text>
            <Text style={headerStyle.invoiceDetailsPartiesBold}>
              {customer.firstName} {customer.lastName}
            </Text>
            <Text style={headerStyle.invoiceDetailsParties}>
              {customer.address}
            </Text>
            <Text style={headerStyle.invoiceDetailsParties}>
              {customer.postalCode} - {customer.city}
            </Text>
          </View>

          <View
            style={{
              padding: '10',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #ECEEF0',
              width: '180',
            }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ fontSize: '11', color: '#8C94A7', flexGrow: 1 }}>
                Invoice Date:
              </Text>
              <Text
                style={{
                  fontSize: '11',
                  color: '#8C94A7',
                  fontWeight: 'bold',
                }}>
                {format(parseISO(date), 'MM/dd/yyyy')}
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: '11',
                  color: '#8C94A7',
                  flexGrow: 1,
                  marginBottom: 5,
                }}>
                Due Date:
              </Text>
              <Text
                style={{
                  fontSize: '11',
                  color: '#8C94A7',
                  fontWeight: 'bold',
                }}>
                {format(parseISO(dueDate), 'MM/dd/yyyy')}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontWeight: 'bold',
              }}>
              <Text style={{ fontSize: '14', flexGrow: 1 }}>Total:</Text>
              <Text
                style={{
                  fontSize: '14',
                  fontWeight: 'bold',
                }}>
                {total}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>

    {/* Separation Line */}
  </View>
);

const BodyTable = ({ entry }) => (
  <View style={{ width: '100%', display: 'flex' }}>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
      }}>
      <Text
        style={{
          flex: '0.5',
          paddingRight: '15px',
          fontSize: '12',
          paddingBottom: '3px',
          borderBottom: '1px solid #E5E7EB ',
        }}>
        Description
      </Text>
      <TableHeader flex={'0.2'} text={'Quantity'} />
      <TableHeader flex={'0.2'} text={'Rate'} />
      <TableHeader flex={'0.1'} text={'Total'} />
    </View>

    {entry.map((entry) => (
      <View
        key={entry.id}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '12px',
          minHeight: '30px',
        }}>
        <View
          style={{
            flex: '0.5',
            marginRight: '15px',
          }}>
          <Text
            style={{
              fontSize: '10',
            }}>
            {entry.description}
          </Text>
        </View>
        <View
          style={{
            flex: '0.2',
          }}>
          <Text
            style={{
              fontSize: '10',
            }}>
            {entry.quantity}
          </Text>
        </View>

        <View
          style={{
            flex: '0.2',
          }}>
          <Text
            style={{
              fontSize: '10',
            }}>
            CHF{entry.rate}
          </Text>
        </View>
        <View
          style={{
            flex: '0.1',
          }}>
          <Text
            style={{
              fontSize: '10',
              fontWeight: 'bold',
            }}>
            CHF{entry.total}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

const TableHeader = ({ text, flex }: string) => (
  <Text
    style={{
      flex: flex,
      fontSize: '12',
      paddingBottom: '3px',
      borderBottom: '1px solid #E5E7EB',
    }}>
    {text}
  </Text>
);

type Props = {
  invoiceDetails: $TSFixIt;
};

const InvoicePDF = (props: Props) => {
  return (
    <PDFViewer style={parentStyles.viewer}>
      {/* Start of the document*/}
      <InvoiceParentDoc invoiceDetails={props.invoiceDetails} />
    </PDFViewer>
  );

  // * To download version
  // return (
  //   <PDFDownloadLink document={<InvoiceDoc />}>
  //     {/* Start of the document*/}
  //     <button>Click fils de pute</button>
  //   </PDFDownloadLink>
  // );
};

export default InvoicePDF;
