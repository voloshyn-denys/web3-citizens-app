import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ limit, totalPosts }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>

        {pageNumbers.map(pageNumber => (
            <Link
              key={pageNumber} 
              to={`?page=${pageNumber}`}
              className='page-link'>
              { pageNumber } {' '}
            </Link>
        ))}

    </nav>
  );
};

export default Pagination;