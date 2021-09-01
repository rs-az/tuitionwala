import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { showAlert } from '../components/Alert';
const Signup = () => {
  return (
    <div className='bg-gradient-to-b from-blue-300 to-pink-200 flex flex-col md:flex-row justify-around items-center py-12'>
      <img src='./images/login.png' alt='' className='' />

      <div className=' bg-white rounded shadow-sm px-4 overflow-hidden flex flex-col items-center'>
        <h1 className='text-center text-xl font-semibold mt-4'>
          Tuition Teacher's Register
        </h1>

        <form className='flex flex-col justify-center items-center w-full px-4 mt-4 space-y-4'>
          <input type='text' className='w-full ' placeholder='Name' />
          <input type='text' className='w-full ' placeholder='Email' />
          <input type='number' className='w-full ' placeholder='Mobile' />
          <input type='password' className='w-full' placeholder='password' />
          <button
            type='button'
            className='bg-green-500 px-8 py-2 focus:outline-none text-white rounded hover:bg-green-600'
          >
            Signup
          </button>
        </form>
        <span className='block text-sm font-semibold text-center mt-4'>OR</span>
        <div className='flex  space-x-4 justify-around items-center my-4'>
          <a
            onClick={showAlert}
            className='px-3 py-2 rounded-lg bg-blue-500 text-center cursor-pointer text-white'
          >
            Register With
            <FontAwesomeIcon icon={faFacebookF} className='text-white mx-2' />
          </a>
          <a className='px-3 py-2 rounded-lg bg-red-500 text-center cursor-pointer text-white'>
            Register With
            <FontAwesomeIcon icon={faGoogle} className='text-white mx-2' />
          </a>
        </div>
        <Link href='#'>
          <a className='hover:underline text-sm px-3 py-2 '>
            Already a member? Login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
