import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobCard from '../components/JobCard';
import Paginator from '../components/Paginator';

const Jobs = () => {
  const job = {
    jobid: '1',
    area: 'Lucknow',
    parent: 'Rohit Singh',
    tuition: '1st - PG ',
    gender: 'Female',
    requirement: 'want a female teacher who is good at maths',
  };

  const filter = () => {
    const search = document.querySelector('.search');
    search.classList.toggle('hidden');
  };

  return (
    <div className='bg-blue-300 py-8 flex flex-col items-center'>
      <div className='flex bg-white flex-col w-3/4 mx-auto space-y-2 my-3 items-center'>
        <div className='flex justify-center p-3'>
          <h1 className='text-lg font-semibold'>
            Showing Jobs in Delhi & Lucknow
          </h1>
          <button
            className='focus:outline-none px-3 cursor-pointer'
            onClick={filter}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        <div className='relative  bg-white search'>
          <input
            type='text'
            placeholder='Your City'
            className='w-full  rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out'
          />
          <button className='absolute top-1.5 right-1 rounded-full text-white inline bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
            Search
          </button>
        </div>
        {Array.apply(null, { length: 14 }).map((e, i) => (
          <JobCard
            key={i}
            jobid={job.jobid}
            area={job.area}
            parent={job.parent}
            tuition={job.tuition}
            gender={job.gender}
            requirement={job.requirement}
          />
        ))}
      </div>
      <Paginator />
    </div>
  );
};

export default Jobs;
