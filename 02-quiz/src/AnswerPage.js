import React from 'react';
import { useGlobalContext } from './context';
import { BiCheckCircle } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';

const AnswerPage = () => {
  const {
    quiz,
    questionIndex,
    getQuestion,
    questions,
    selectedAnswer,
    setSelectedAnswer,
    setIsOpenWarningModal,
    setIsShowAnswer,
    setQuestionIndex,
    correctCount,
    setIsOpenReviews,
  } = useGlobalContext();

  const { question, correctAnswer, answers } = getQuestion(questions);

  const isWrongAnswer = (answer) => {
    return answer === selectedAnswer && answer !== correctAnswer;
  };

  const isCorrectAnswer = (answer) => {
    return answer === correctAnswer;
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsOpenWarningModal(false);
    setIsShowAnswer(false);
    setQuestionIndex((oldIndex) => {
      console.log(oldIndex);
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        setIsOpenReviews(true);
        console.log('hello world');
        return 0;
      }
      return index;
    });
  };
  return (
    <main>
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
                  {isCorrectAnswer(answer) && (
                    <BiCheckCircle className='check-icon' />
                  )}
                  {isWrongAnswer(answer) && (
                    <ImCancelCircle className='cancel-icon' />
                  )}

                  <button
                    dangerouslySetInnerHTML={{
                      __html: answer,
                    }}
                    className={`answer-btn disabled-cursor ${
                      isWrongAnswer(answer)
                        ? 'wrong-btn '
                        : isCorrectAnswer(answer)
                        ? 'correct-btn'
                        : ''
                    }
                    `}
                  ></button>
                </div>
              );
            })}
          </div>
        </article>
        <button className='next-btn' onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
};

export default AnswerPage;
