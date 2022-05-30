import './css/App.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import WarningModal from './WarningModal';

const isWarningModalCheck = () => {
  const isWarningModalCheck = localStorage.getItem('isWarningModalCheck');
  if (isWarningModalCheck) {
    localStorage.setItem('isWarningModalCheck', true);
    return true;
  }
  return JSON.parse(isWarningModalCheck);
};

function App() {
  const {
    isWaiting,
    isLoading,
    questionIndex,
    quiz,
    correctNumber,
    isOpenWarningModal,
    setIsOpenWarningModal,
    isShowAnswer,
    selectedAnswer,
    setSelectedAnswer,
    reviewQuizzes,
  } = useGlobalContext();

  const handleSubmit = () => {
    setIsOpenWarningModal(isWarningModalCheck);
  };

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { correctAnswer, answers, question } = reviewQuizzes[questionIndex];

  if (isShowAnswer) {
    return (
      <main>
        <section className='quiz'>
          <p className='total-questions'>total questions : {quiz.amount}</p>
          <p className='correct-answers-number'>
            correct number : {correctNumber}/{questionIndex}
          </p>
          <article className='quiz-container'>
            <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
            <div className='answers-container'>
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    dangerouslySetInnerHTML={{ __html: answer }}
                    className='answer-btn disabled-cursour'
                  ></button>
                );
              })}
            </div>
          </article>
          <button className='next-btn'>next question</button>
        </section>
      </main>
    );
  }

  return (
    <main>
      {isOpenWarningModal && <WarningModal />}
      <section className='quiz'>
        <p className='total-questions'>total questions : {quiz.amount}</p>
        <p className='correct-answers-number'>
          correct number : {correctNumber}/{questionIndex}
        </p>
        <article className='quiz-container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className='answers-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className={
                    answer === selectedAnswer
                      ? `answer-btn selected-answer-btn`
                      : `answer-btn`
                  }
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={(e) => setSelectedAnswer(e.target.textContent)}
                ></button>
              );
            })}
          </div>
        </article>
        <button className='next-btn' onClick={handleSubmit}>
          submit
        </button>
      </section>
    </main>
  );
}

export default App;
