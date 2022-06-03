import React from 'react';
import { useGlobalContext } from './context';
import Answer from './Answer';

const AnswerPage = () => {
  const {
    quiz,
    questionIndex,
    questions,
    setSelectedAnswer,
    setIsOpenWarningModal,
    setIsShowAnswer,
    setQuestionIndex,
    correctCount,
    setIsOpenReviews,
  } = useGlobalContext();

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsOpenWarningModal(false);
    setIsShowAnswer(false);
    setQuestionIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        setIsOpenReviews(true);
      }
      return index;
    });
  };
  return (
    <main>
      <section className='quiz'>
        <p className='total-questions'>total questions : {quiz.amount}</p>
        <p className='correct-answers-number'>
          correct count : {correctCount}/{questionIndex + 1}
        </p>
        <Answer index={questionIndex} />
        <button className='next-btn' onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
};

export default AnswerPage;
