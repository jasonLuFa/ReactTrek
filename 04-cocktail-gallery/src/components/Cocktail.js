import React from 'react';
import { Link } from 'react-router-dom';
import './css/cocktail.css';

const Cocktail = ({ id, name, image, info, glass }) => {
  return (
    <article className='cocktail'>
      <div className='image-container'>
        <img src={image} alt={image} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <button className='btn btn-primary btn-details'>
          <Link to={`/cocktail/${id}`}>details</Link>
        </button>
      </div>
    </article>
  );
};

export default Cocktail;
