import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import firebaseClient from '../firebase/firebaseClient';
import { useState } from 'react';
import firebase from 'firebase/app';
import Alert from '../components/Alert';
import { useRouter } from 'next/router';
const Login = () => {
  firebaseClient();
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function submit() {
    // store();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credentials = result.credential;
        console.log(credentials);
        router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credentials = result.credential;
        console.log(credentials);
        router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {/* <Alert message='There is an error' color='green' /> */}
      <div className='bg-gradient-to-b from-blue-300 to-pink-200 flex flex-col w-full mx-auto md:flex-row justify-around items-center py-12'>
        <img src='./images/login.png' alt='' />

        <div className=' bg-white rounded shadow-sm px-4 overflow-hidden w-full md:w-auto flex flex-col items-center'>
          <h1 className='text-center text-xl font-semibold mt-4'>
            Tuition Teacher's Login
          </h1>

          <form className='flex flex-col justify-center items-center w-full px-4 mt-4 space-y-4'>
            <input
              type='text'
              className='w-full '
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='w-full'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              className='bg-green-500 px-8 py-2 focus:outline-none text-white rounded hover:bg-green-600'
              onClick={submit}
            >
              Login
            </button>
          </form>
          <span className='block text-sm font-semibold text-center mt-4'>
            OR
          </span>
          <div className='flex  space-x-4 justify-around items-center my-4'>
            <a
              className='px-3 py-2 rounded-lg bg-blue-500 text-center cursor-pointer text-white hover:bg-blue-600'
              onClick={loginWithFacebook}
            >
              Login With
              <FontAwesomeIcon icon={faFacebookF} className='text-white mx-2' />
            </a>
            <a
              className='px-3 py-2 rounded-lg bg-red-500 text-center cursor-pointer text-white hover:bg-red-600'
              onClick={loginWithGoogle}
            >
              Login With
              <FontAwesomeIcon icon={faGoogle} className='text-white mx-2' />
            </a>
          </div>
          <div className='w-full flex justify-between '>
            <Link href='#'>
              <a className='hover:underline text-sm px-3 py-2'>
                Forgot Password?
              </a>
            </Link>
            <Link href='#'>
              <a className='hover:underline text-sm px-3 py-2'>Register Here</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
