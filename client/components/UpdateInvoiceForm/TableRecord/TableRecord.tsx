import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';
import { EntryAction, InvoiceEntryActionKind } from '../UpdateInvoiceForm';

type Props = {
  dispatch: (arg: EntryAction) => void;
  id: string;
  isRemovable: boolean;
  data: any;
};

const TableRecord = (props: Props) => {
  const { id, dispatch, isRemovable, data } = props;

  const [record, setRecord] = useState(data);

  // * Updates the current state of all entries
  useEffect(() => {
    dispatch({ type: InvoiceEntryActionKind.UPDATE, payload: record });
  }, [record]);

  // * Calculates the total when quantity and rate changes
  useEffect(() => {
    const total = record.quantity * record.rate;
    setRecord((prev) => {
      return {
        ...prev,
        total,
      };
    });
  }, [record.quantity, record.rate]);

  return (
    <div className='pt-5 pb-8 grid grid-cols-8 gap-x-6 gap-y-2 col-span-full border border-r-0 border-l-0 border-t-0 '>
      <div className='col-span-4 pl-12'>
        <input
          value={data.description}
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                description: event.target.value,
              };
            })
          }
          type='text'
          className='w-full  border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className='col-start-5'>
        <input
          value={data?.quantity}
          min={0}
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                quantity: parseFloat(event.target.value),
              };
            })
          }
          type='number'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' col-start-6 '>
        <input
          value={data?.rate}
          min={0}
          onChange={(event) =>
            setRecord((prev) => {
              return {
                ...prev,
                rate: parseFloat(event.target.value),
              };
            })
          }
          type='number'
          className='w-full border-gray-300 focus:border-skin-fill rounded drop-shadow-sm'
        />
      </div>

      <div className=' pr-12 col-start-7 col-span-full self-center flex items-center justify-end'>
        <p className='text-bold'>
          <span className='font-bold'>CHF</span>
          {record.total.toFixed(2)}
        </p>
        {isRemovable && (
          <div
            className='absolute right-3 text-skin-gray cursor-pointer hover:text-red-500'
            onClick={() =>
              dispatch({ type: InvoiceEntryActionKind.REMOVE, payload: id })
            }>
            <DeleteOutlineOutlinedIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableRecord;
