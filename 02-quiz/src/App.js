import './css/App.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import axios from 'axios';
import WarningModal from './WarningModal';

const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const isWarningModalCheck = () => {
  const isWarningModalCheck = localStorage.getItem('isWarningModalCheck');
  if (isWarningModalCheck) {
    localStorage.setItem('isWarningModalCheck', true);
    return true;
  }
  return JSON.parse(isWarningModalCheck);
};

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const {
    isWaiting,
    setIsWaiting,
    questions,
    setQuestions,
    correctNumber,
    isOpenWarningModal,
    setIsOpenWarningModal,
    isShowAnswer,
  } = useGlobalContext();

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    if (!response) {
      setIsWaiting(true);
      return;
    }
    const data = response.data.results;
    if (data.length <= 0) {
      setIsWaiting(true);

      return;
    }
    // console.log(data);
    setQuestions(data);
    setIsWaiting(false);
    setIsLoading(false);
  };

  const handleSubmit = () => {
    setIsOpenWarningModal(isWarningModalCheck);
  };

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } =
    questions[questionIndex];
  const answers = [...incorrect_answers, correct_answer];

  if (isShowAnswer) {
    return (
      <main>
        <section className='quiz'>
          <p className='total-questions'>
            total questions : {questions.length}
          </p>
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
        <p className='total-questions'>total questions : {questions.length}</p>
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
