import React from 'react';

import MaterialPagination from '@mui/material/Pagination';

import './Component.scss';

const Pagination = ({ limit, total, handleChange }: any) => {
  if (!total) return null;

  return (
    <div className='paginationContainer'>
      <MaterialPagination count={Math.ceil(total / limit)} onChange={handleChange} />
    </div>
  );
};

export default Pagination;