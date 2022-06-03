import React from 'react';
import Answer from './Answer';
import { useGlobalContext } from './context';
import './css/ReviewsPage.css';

const ReviewsPage = () => {
  const {
    setIsWaiting,
    setQuestionIndex,
    setQuestions,
    questions,
    setCorrectCount,
    setReviews,
    setIsOpenReviews,
    correctCount,
    questionIndex,
    quiz,
  } = useGlobalContext();

  const handleReplay = () => {
    setIsWaiting(true);
    setQuestionIndex(0);
    setQuestions([]);
    setCorrectCount(0);
    setReviews([]);
    setIsOpenReviews(false);
    localStorage.setItem('isShowWarningModal', true);
  };

  return (
    <section className='reviews-center'>
      <div className='title'>
        <h1>Review</h1>
        <div className='underline'></div>
      </div>
      <div className='review-outline'>
        <p className='quiz-category'>{`quiz category: ${quiz.category}`}</p>
        <p className='quiz-difficulty'>{`quiz difficulty: ${quiz.difficulty}`}</p>
        <p className='total-questions'>total questions: {quiz.amount}</p>
        <p className='correct-answers-number'>
          correct count: {correctCount}/{questionIndex}
        </p>
      </div>
      <div className='review-container'>
        {questions.map((quiz, index) => {
          return <Answer key={index} index={index} />;
        })}
      </div>
      <button className=' replay-btn' onClick={handleReplay}>
        replay
      </button>
    </section>
  );
};

export default ReviewsPage;
