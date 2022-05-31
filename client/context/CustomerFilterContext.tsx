import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const CFilterContext = createContext({});

export const useCustomerFilter = () => {
  return useContext(CFilterContext);
};

export const CustomerFilterProvider = (props: Props) => {
  const [filterQuery, setFilterQuery] = useState({
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
