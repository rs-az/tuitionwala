import { useState } from 'react';
import Pagination from 'react-js-pagination';
import ReactPagination from '../components/ReactPagination';
import SearchTutors from '../components/SearchTutors';
import ReactPaginate from 'react-paginate';

const Instructors = () => {
  const [activePage, setActivePage] = useState(0);
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const handlePageClick = () => console.log('hi');
  return (
    <div>
      <SearchTutors />
      {/* <ReactPagination /> */}
      <div id='react-paginate'>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={20}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      {/* <div className='flex'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};

export default Instructors;
