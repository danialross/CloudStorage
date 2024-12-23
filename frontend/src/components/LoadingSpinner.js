import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function LoadingSpinner() {
  return (
    <div className={'h-full w-full flex justify-center items-center'}>
      <AiOutlineLoading3Quarters
        className={'animate-spin text-tertiary'}
        size={200}
      />
    </div>
  );
}
