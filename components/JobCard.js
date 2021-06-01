import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const JobCard = ({ jobid, area, parent, tuition, gender, requirement }) => {
  return (
    <div className='w-full mt-2 px-2 rounded-sm border-2 text-gray-400 border-gray-100 bg-white flex-col justify-between items-end shadow-sm'>
      <div>
        <p className='md:text-md '>
          <strong>JobId: </strong>
          {jobid}
        </p>
        <p className='md:text-md '>
          <strong>Area: </strong>
          {area}
        </p>
        <p className='md:text-md '>
          <strong>Parent: </strong>
          {parent}
        </p>
        <p className='md:text-md '>
          <strong>Tuition For: </strong>
          {tuition}
        </p>
        <p className='md:text-md '>
          <strong>Teacher's Preferred Gender: </strong>
          {gender}
        </p>
        <p className='md:text-md  truncate '>
          <strong>Job Description: </strong>
          {requirement}
        </p>
      </div>
      <ul className='flex space-x-2 m-2'>
        <li>
          <Link href='#'>
            <a className='bg-gray-500 text-white p-2'>Apply Now</a>
          </Link>
        </li>
        <li>
          <a className='px-2 py-2'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </li>
        <li>
          <a className='px-2 py-2'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a className='px-2 py-2'>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </li>
        <li>
          <a className='px-2 py-2'>
            <FontAwesomeIcon icon={faMobile} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default JobCard;
