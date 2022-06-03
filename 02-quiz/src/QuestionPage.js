import React, { useEffect } from 'react';
import { useGlobalContext } from './context';
import WarningModal from './WarningModal';

const QuestionPage = () => {
  const {
    questionIndex,
    quiz,
    isOpenWarningModal,
    selectedAnswer,
    setSelectedAnswer,
    getQuestion,
    questions,
    setIsOpenWarningModal,
    setIsShowAnswer,
    correctCount,
    setCorrectCount,
    reviews,
    setReviews,
  } = useGlobalContext();

  const isOpenWarningModalFromStorage = () => {
    const isOpenWarningModalFromStorage =
      localStorage.getItem('isShowWarningModal');
    if (isOpenWarningModalFromStorage == null) {
      localStorage.setItem('isShowWarningModal', true);
      return true;
    }
    return JSON.parse(isOpenWarningModalFromStorage);
  };

  const { question, correctAnswer, answers } = getQuestion(
    questions,
    questionIndex
  );

  const handleCheckAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      setCorrectCount((count) => count + 1);
    }
    setIsOpenWarningModal(isOpenWarningModalFromStorage());
    setIsShowAnswer(!isOpenWarningModalFromStorage());
    setReviews([
      ...reviews,
      { question, answers, correctAnswer, selectedAnswer },
    ]);
  };

  return (
    <main>
      {isOpenWarningModal && <WarningModal />}
      <section className='quiz'>
        <p className='total-questions'>total questions : {quiz.amount}</p>
        <p className='correct-answers-number'>
          correct number : {correctCount}/{questionIndex}
        </p>
        <article className='quiz-container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className='answers-container'>
            {answers.map((answer, index) => {
              return (
                <div key={index} className='anwser-container'>
                  <button
                    className={
                      answer === selectedAnswer
                        ? `answer-btn selected-answer-btn`
                        : `answer-btn`
                    }
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={(e) => setSelectedAnswer(e.target.textContent)}
                  ></button>
                </div>
              );
            })}
          </div>
        </article>
        <button
          disabled={selectedAnswer.length === 0 && true}
          className={`next-btn ${
            selectedAnswer.length === 0 ? 'disabled-cursor' : ''
          }`}
          onClick={handleCheckAnswer}
        >
          check answer
        </button>
      </section>
    </main>
  );
};

export default QuestionPage;
