import React from 'react';
import { useGlobalContext } from './context';
import { BiCheckCircle } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';

const Answer = ({ questions, index }) => {
  const { getQuestion, selectedAnswer } = useGlobalContext();
  console.log(questions);
  console.log(index);
  const { question, correctAnswer, answers } = getQuestion(questions, index);

  const isWrongAnswer = (answer) => {
    return answer === selectedAnswer && answer !== correctAnswer;
  };

  const isCorrectAnswer = (answer) => {
    return answer === correctAnswer;
  };

  return (
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
  );
};

export default Answer;
