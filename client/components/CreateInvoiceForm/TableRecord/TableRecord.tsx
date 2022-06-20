import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { $TSFixIt } from '@nvs-shared/types/general';
import { useEffect, useState } from 'react';

type Props = {
  dispatch: $TSFixIt;
  id: string;
  isRemovable: boolean;
};

const TableRecord = (props: Props) => {
  const initialState = {
    id: props.id,
    item: '',
    quantity: 0,
    price: 0,
    amount: 0.0,
  };

  const [record, setRecord] = useState(initialState);

  // * Updates the current state of all entries
  useEffect(() => {
    props.dispatch({ type: 'UPDATE_ENTRY', payload: record });
  }, [record]);

  // * Calculates the totla
  useEffect(() => {
    const total = record.quantity * record.price;
    setRecord((prev) => {
      return {
        ...prev,
        amount: total,
      };
    });
  }, [record.quantity, record.price]);

  return (
    <div className='pt-5 pb-8 grid grid-cols-8 gap-x-6 gap-y-2 col-span-full border border-r-0 border-l-0 border-t-0 '>
      <div className='col-span-4 pl-12'>
        <input
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                item: event.target.value,
              };
            })
          }
          type='text'
          className='w-full  border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className='col-start-5'>
        <input
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                quantity: event.target.value,
              };
            })
          }
          type='number'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' col-start-6 '>
        <input
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                price: event.target.value,
              };
            })
          }
          type='text'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' pr-12 col-start-7 col-span-full self-center flex items-center justify-end'>
        <p className='text-bold'>
          <span className='font-bold'>CHF</span>
          {record.amount.toFixed(2)}
        </p>
        {props.isRemovable && (
          <div
            className='absolute right-3 text-skin-gray cursor-pointer hover:text-red-500'
            onClick={() =>
              props.dispatch({ type: 'REMOVE_ENTRY', payload: props.id })
            }>
            <DeleteOutlineOutlinedIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableRecord;
