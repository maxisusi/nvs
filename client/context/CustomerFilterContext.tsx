import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface CustomerFilterParams {
  displayName: string;
  contactName: string;
  phone: string;
}

const CFilterContext = createContext<
  | [
      CustomerFilterParams,
      React.Dispatch<React.SetStateAction<CustomerFilterParams>>
    ]
  | any
>([]);

export const useCustomerFilter = () => {
  return useContext(CFilterContext);
};

export const CustomerFilterProvider = (props: Props) => {
  const [filterQuery, setFilterQuery] = useState<CustomerFilterParams>({
    displayName: '',
    contactName: '',
    phone: '',
  });
  return (
    <CFilterContext.Provider value={[filterQuery, setFilterQuery]}>
      {props.children}
    </CFilterContext.Provider>
  );
};

export default CustomerFilterProvider;
