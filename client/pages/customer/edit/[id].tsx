import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import {
  GET_CUSTOMERS_FOR_GRID,
  GET_CUSTOMER_TO_EDIT,
  UPDATE_CUSTOMER,
} from '@nvs-shared/graphql/customers';
import { Customer } from '@nvs-shared/types/customer';
import { useRouter } from 'next/router';
import client from 'pages/client.graphql';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import countries from '../../../utils/countries.json';

const EditCustomerForm = (props: Customer) => {
  // * Form Params
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(props as CustomerFormInputs),
    },
  });
  const router = useRouter();

  // * Create a new customer mutation
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const formSubmit = async (data: any) => {
    delete data['__typename'];
    try {
      await updateCustomer({
        variables: { updateCustomerInput: { ...data } },

        refetchQueries: () => [
          {
            query: GET_CUSTOMERS_FOR_GRID,
          },
        ],
      }).then(() => {
        router.push('/customer');
      });
    } catch (e) {
      // alert('There was an error, please check the console for further details');
      console.error(e);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h1 className='text-3xl mb-3 font-bold'>Edit Customer </h1>
          <p className='text-skin-gray'>
            Please fill-up the mandatory fields to edit the customer
          </p>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={handleSubmit(formSubmit)}
            className='bg-skin-fill font-semibold text-skin-white px-3 py-2 rounded text-sm hover:bg-skin-btnHover drop-shadow-md flex gap-2 items-center'>
            <SaveAltOutlinedIcon />
            Save Customer
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className='bg-white h-fit p-8 rounded drop-shadow grid grid-cols-8 gap-3 gap-y-6'>
        <div className='  h-14 col-span-2 row-span-3'>
          <h4 className='text-xl font-bold'>Basic Info</h4>
          <button hidden type='submit'></button>
        </div>

        <TextInput
          formHandler={register('firstName')}
          onError={errors.firstName}
          label='First Name'
          required
        />
        <TextInput
          formHandler={register('lastName')}
          onError={errors.lastName}
          label='Last Name'
          required
        />
        <TextInput
          formHandler={register('email')}
          onError={errors.email}
          label='Email'
        />
        <TextInput
          formHandler={register('phone')}
          onError={errors.phone}
          label='Phone'
        />
        <TextInput
          formHandler={register('mobile')}
          onError={errors.mobile}
          label='Mobile'
        />

        <hr className='col-span-full my-2' />

        <div className='  h-14 col-span-2 row-span-3'>
          <h4 className='text-xl font-bold'>Billing Address</h4>
        </div>

        <SelectInput
          formHandler={register('countryName')}
          onError={errors.countryName}
          label='Country'
          values={countries}
          required
        />
        <TextInput
          formHandler={register('city')}
          onError={errors.city}
          label='City'
          required
        />
        <TextInput
          formHandler={register('region')}
          onError={errors.region}
          label='Region'
          required
        />
        <TextInput
          formHandler={register('postalCode')}
          onError={errors.postalCode}
          label='Zip Code'
          required
        />
        <TextInput
          formHandler={register('address')}
          onError={errors.address}
          label='Address'
          required
        />
      </form>
    </div>
  );
};

export default EditCustomerForm;

export async function getServerSideProps({ params }: any) {
  const customerId = params.id;

  const { data, error } = await client.query({
    query: GET_CUSTOMER_TO_EDIT,
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

interface CustomerFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  postalCode: string;
  countryName: string;
  city: string;
  region: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('The Email must be valid'),
    phone: yup.string(),
    mobile: yup.string(),
    address: yup.string().required('Address is required'),
    postalCode: yup.string().required('Zip Code is required'),
    countryName: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
  })
  .required();

type InputProps = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  formHandler: any;
  onError: any;
};

const TextInput = (props: InputProps) => {
  const { required, size, label, formHandler, onError } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-3'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          {...formHandler}
          type='text'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}
        />
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};

type SelectInput = {
  label: string;
  required?: boolean;
  size?: 'standard' | 'full';
  formHandler: any;
  onError: any;
  values: any;
};

type Country = {
  name: string;
  code: string;
};

const SelectInput = (props: SelectInput) => {
  const { required, size, label, formHandler, onError, values } = props;

  return (
    <div className={`h-50 ${size === 'full' ? 'col-span-6' : 'col-span-3'}`}>
      <div className='flex flex-col gap-1 w-full'>
        <label className='text-sm font-medium capitalize'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>

        <select
          {...formHandler}
          type='select'
          className={`rounded p-1.5 drop-shadow-sm border-gray-300 focus:border-skin-fill ${
            onError &&
            'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-none'
          }`}>
          <option hidden value={''}>
            Select a country
          </option>
          {values.map((country: Country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <p className='text-sm text-red-500 mt-1'>{onError?.message}</p>
    </div>
  );
};
