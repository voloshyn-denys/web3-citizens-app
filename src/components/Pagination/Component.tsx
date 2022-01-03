import React from 'react';

import MaterialPagination from '@mui/material/Pagination';

import './Component.scss';

type PaginationProps = {
  limit: number, 
  total: number, 
  handleChange: (event: React.ChangeEvent<unknown>, page: number) => void,
}

const Pagination = ({ limit, total, handleChange }: PaginationProps) => {
  if (!total) return null;

  const count = Math.ceil(total / limit);

  return (
    <div className='paginationContainer'>
      <MaterialPagination onChange={handleChange} count={count} />
    </div>
  );
};

export default Pagination;