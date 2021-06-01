const Paginator = ({ total, offset }) => {
  const pages = Math.ceil(total / offset);

  return (
    <ul className=' flex justify-between text-md w-96 bg-white shadow-sm rounded-full px-4 py-2'>
      <li className='py-2 px-4 hover:bg-blue-300 focus:bg-blue:300 cursor-pointer rounded-full'>
        prev
      </li>
      {Array.apply(null, { length: 6 }).map((e, i) => (
        <li
          key={i}
          className='py-2 px-4 hover:bg-blue-300 focus:bg-blue:300 cursor-pointer rounded-full'
        >
          {i + 1}
        </li>
      ))}
      <li className='py-2 px-4 hover:bg-blue-300 focus:bg-blue:300 cursor-pointer rounded-full'>
        next
      </li>
    </ul>
  );
};

export default Paginator;
