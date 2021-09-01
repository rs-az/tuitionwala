import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ message, color }) => {
  return (
    <div
      className={`alert text-white px-6 py-4 border-0 rounded relative mb-4 bg-${color}-500 top-0 left-0 z-10 -mb-10`}
    >
      <span className='text-xl inline-block mr-5 align-middle'>
        <FontAwesomeIcon icon={faBell} />
      </span>
      <span className='inline-block align-middle mr-8'>{message}</span>
      <button
        className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
        onClick={hideAlert}
      >
        <span>×</span>
      </button>
    </div>
  );
};

const hideAlert = () => {
  const alert = document.querySelector('.alert');
  alert.classList.add('hidden');
};

export const showAlert = () => {
  const alert = document.querySelector('.alert');
  alert.classList.remove('hidden');
};

export default Alert;
