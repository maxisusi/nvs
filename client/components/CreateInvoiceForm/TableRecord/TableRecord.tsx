import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';

type Props = {};

const initialState = {
  id: 0,
  item: '',
  quantity: 0,
  price: 0,
  amount: 0,
};
const TableRecord = (props: Props) => {
  const [record, setRecord] = useState(initialState);
  return (
    <div className='pt-5 pb-8 grid grid-cols-8 gap-x-6 gap-y-2 col-span-full border border-r-0 border-l-0 border-t-0 '>
      <div className='col-span-4 pl-12'>
        <input
          type='text'
          className='w-full  border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className='col-start-5'>
        <input
          type='number'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' col-start-6 '>
        <input
          type='text'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' pr-12 col-start-7 col-span-full self-center flex items-center justify-end'>
        <p className='text-bold'>
          <span className='font-bold'>CHF</span>0.00
        </p>
        <DeleteOutlineOutlinedIcon className='absolute right-3 text-skin-gray cursor-pointer hover:text-red-500' />
      </div>
    </div>
  );
};

export default TableRecord;
