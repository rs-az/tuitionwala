import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='bg-gray-200 text-gray-700 font-semibold flex-col justify-center items-center py-4'>
      <div className=' flex flex-col lg:flex-row text-sm justify-center items-center '>
        <h4 className='px-2 lg:border-r-2 border-gray-500'>
          Copyright &copy; 2021
        </h4>
        <Link href='/aboutus'>
          <a className='px-2 lg:border-r-2 border-gray-500 mt-2 lg:mt-0'>
            About Us
          </a>
        </Link>
        <Link href='/contact'>
          <a className='px-2 lg:border-r-2 border-gray-500 mt-2 lg:mt-0'>
            Contact Us
          </a>
        </Link>
        <Link href='/privacy'>
          <a className='px-2 lg:border-r-2 border-gray-500 mt-2 lg:mt-0'>
            Privacy Policy
          </a>
        </Link>
        <Link href='/terms'>
          <a className='px-2 mt-2 lg:mt-0'>Terms & Conditions </a>
        </Link>
      </div>
      <ul className='flex justify-center items-center space-x-6 mt-4'>
        <li>
          <a href='https://facebook.com'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </li>
        <li>
          <a href='https://twitter.com'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a href='https://youtube.com'>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
