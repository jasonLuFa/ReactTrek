import React from 'react';
import Answer from './Answer';
import { useGlobalContext } from './context';
import './css/ReviewsPage.css';

const ReviewsPage = () => {
  const { questions } = useGlobalContext();

  return (
    <section className='reviewsPage'>
      <div className='title'>
        <h1>Review</h1>
        <div className='underline'></div>
      </div>
      <div className='reviews-center'>
        {questions.map((quiz, index) => {
          return <Answer key={index} index={index} />;
        })}
      </div>
    </section>
  );
};

export default ReviewsPage;
