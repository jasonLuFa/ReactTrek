import React from 'react';
import { Link } from 'react-router-dom';
import './css/error.css';

const Error = () => {
  return (
    <section className='error-page section'>
      <div className='error-container'>
        <h1>oops! wrong path</h1>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
      </div>
    </section>
  );
};

export default Error;
