import './css/App.css';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import WarningModal from './WarningModal';
import { BiCheckCircle } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { useEffect } from 'react';

function App() {
  const {
    isWaiting,
    isLoading,
    questions,
    questionIndex,
    getQuestion,
    setQuestionIndex,
    quiz,
    correctNumber,
    isOpenWarningModal,
    setIsOpenWarningModal,
    isShowAnswer,
    setIsShowAnswer,
    selectedAnswer,
    setSelectedAnswer,
    reviewQuizzes,
    setReviewQuizzes,
  } = useGlobalContext();

  const isOpenWarningModalFromStorage = () => {
    const isOpenWarningModalFromStorage =
      localStorage.getItem('isShowWarningModal');
    console.log(isOpenWarningModalFromStorage);
    if (isOpenWarningModalFromStorage == null) {
      localStorage.setItem('isShowWarningModal', true);
      return true;
    }
    return JSON.parse(isOpenWarningModalFromStorage);
  };

  const handleCheckAnswer = () => {
    setIsOpenWarningModal(isOpenWarningModalFromStorage());
    setIsShowAnswer(!isOpenWarningModalFromStorage());
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsOpenWarningModal(false);
    setIsShowAnswer(false);
    setQuestionIndex((index) => index + 1);
  };

  const isWrongAnswer = (answer) => {
    return answer === selectedAnswer && answer !== correctAnswer;
  };

  const isCorrectAnswer = (answer) => {
    return answer === correctAnswer;
  };

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { question, correctAnswer, answers } = getQuestion(questions);

  if (!isOpenWarningModal && isShowAnswer) {
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
}

export default App;
