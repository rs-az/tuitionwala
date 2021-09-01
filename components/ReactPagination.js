import { useEffect, useLayoutEffect, useState } from 'react';
import Pager from './Pager';
const ReactPagination = () => {
  let totalPages = 20;
  let page = 2;
  const [isClicked, setIsClicked] = useState(null);
  let pages = [];

  function createPagination(numberOfPages, page) {
    console.log('createPagination called');
    pages = [];
    let isActive;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
      pages.push(
        <Pager
          key='prev'
          innerClass='btn prev'
          // onClick={() => createPagination(numberOfPages, page - 1)}
          handleClick={handleClick}
          currentPage={page - 1}
          icon='left'
          text='Prev'
        />
      );
    }

    if (page > 2) {
      pages.push(
        <Pager
          key='1'
          innerClass='first numb'
          // onClick={() => createPagination(numberOfPages, 1)}
          handleClick={handleClick}
          currentPage={1}
          text='1'
        />
      );
      if (page > 3) {
        pages.push(
          <Pager
            key='1beforedot'
            handleClick={dotClick}
            currentPage={page}
            innerClass='dots'
            text='...'
          />
        );
      }
    }

    if (page == numberOfPages) {
      beforePage = beforePage - 2;
    } else if (page == numberOfPages - 1) {
      beforePage = beforePage - 1;
    }
    if (page == 1) {
      afterPage = afterPage + 2;
    } else if (page == 2) {
      afterPage = afterPage + 1;
    }

    for (let plength = beforePage; plength <= afterPage; plength++) {
      if (plength > numberOfPages) {
        continue;
      }
      if (plength == 0) {
        plength = plength + 1;
      }
      if (page == plength) {
        isActive = 'isactive';
      } else {
        isActive = '';
      }

      pages.push(
        <Pager
          key={`numb${plength}`}
          innerClass={`numb ${isActive}`}
          // onClick={() => createPagination(numberOfPages, plength)}
          handleClick={dotClick}
          currentPage={plength}
          text={plength}
        />
      );
    }

    if (page < numberOfPages - 1) {
      if (page < numberOfPages - 2) {
        pages.push(
          <Pager
            key='dot'
            innerClass='dots'
            handleClick={dotClick}
            currentPage={page}
            text='...'
          />
        );
      }

      pages.push(
        <Pager
          key='last'
          innerClass='numb last'
          // onClick={() => createPagination(numberOfPages, numberOfPages)}
          handleClick={handleClick}
          currentPage={numberOfPages}
          text={numberOfPages}
        />
      );
    }

    if (page < numberOfPages) {
      pages.push(
        <Pager
          key='next'
          innerClass='btn next'
          // onClick={() => createPagination(numberOfPages, page + 1)}
          handleClick={handleClick}
          currentPage={page + 1}
          icon='right'
          text='Next'
        />
      );
    }
  }

  const handleClick = (current) => {
    createPagination(totalPages, current);
  };
  const dotClick = (current) => {
    console.log(current);
  };
  return (
    <div className='pagination flex justify-center items-center m-auto'>
      {createPagination(totalPages, page)}
      <ul>
        {console.log(pages)}
        {pages.map((e, i) => (
          <>{e}</>
        ))}
      </ul>
    </div>
  );
};

export default ReactPagination;
