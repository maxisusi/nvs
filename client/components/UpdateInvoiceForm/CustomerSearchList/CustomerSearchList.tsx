import { Customer } from '@nvs-shared/types/customer';

type Props = {
  selectedCustomer: any;
};

const CustomerSearchList = ({ selectedCustomer }: Props) => {
  return (
    <div className='relative  bg-white rounded border h-44 col-span-5 hover:bg-slate-100 cursor-pointer'>
      <SelectedCustomerInfoMenu customer={selectedCustomer as Customer} />
    </div>
  );
};

export default CustomerSearchList;

// * Displays when the customer has been selected
type SelectedCustomer = {
  customer: Customer;
};

const SelectedCustomerInfoMenu = (props: SelectedCustomer) => {
  const { address, firstName, lastName, postalCode, city } = props.customer;

  return (
    <div className='absolute cursor-default p-6 flex flex-col justify-between min-h-full bg-white drop-shadow w-full z-30 top-0 rounded'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>
          {firstName} {lastName}
        </h3>
      </div>
      <div>
        <h3 className='uppercase text-skin-gray space-x-2'>Bill to</h3>
        <p className='truncate'>
          {postalCode} - {city}{' '}
        </p>
        <p>{address}</p>
      </div>
    </div>
  );
};
