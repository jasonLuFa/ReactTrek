import React from 'react';
import './css/Photo.css';

const Photo = ({
  urls: { regular },
  alt_descirption: description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium: image },
  },
}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={description} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={image} alt={name} className='user-img' />
        </a>
      </div>
    </article>
  );
};

export default Photo;
