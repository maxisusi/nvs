import Skeleton from '@mui/material/Skeleton';

const GridDisplayOverlays = () => {
  const ErrorData = () => (
    <div
      style={{
        marginTop: '-20px',
      }}
      className='h-full w-full flex flex-col items-center '>
      <img className='w-48 mt-20 mb-10' src='/Something.svg' />
      <h4 className='text-3xl mb-2'>Oopsy, Something went wrong...</h4>
      <p className='text-skin-gray'>Try to reload the page to fix the issue</p>
    </div>
  );

  const NoDatas = () => (
    <div
      style={{
        marginTop: '-20px',
      }}
      className='h-full w-full flex flex-col items-center '>
      <img className='w-48 mt-10 mb-10' src='/Nothing.svg' />
      <h4 className='text-3xl mb-2'>No customer found</h4>
      <p className='text-skin-gray'>
        Click on <strong>"New Customer"</strong> to create your first customer
      </p>
    </div>
  );

  const LoadingOverlay = () => (
    <div
      style={{
        marginTop: '-35px',
      }}
      className='h-full w-full flex flex-col items-center z-10 absolute bg-white'>
      <div className='h-16 bg-white w-full flex items-center px-6'>
        <Skeleton
          sx={{
            width: '100%',
          }}></Skeleton>
      </div>

      <div className='h-16 bg-slate-100 w-full flex items-center px-6'>
        <Skeleton
          sx={{
            width: '100%',
          }}></Skeleton>
      </div>

      <div className='h-16 bg-white w-full flex items-center px-6'>
        <Skeleton
          sx={{
            width: '100%',
          }}></Skeleton>
      </div>
    </div>
  );

  return {
    LoadingOverlay,
    ErrorData,
    NoDatas,
  };
};

export default GridDisplayOverlays;
