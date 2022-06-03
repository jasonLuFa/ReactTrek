import axios from 'axios';
import { useState, useContext, useEffect, createContext } from 'react';

const table = {
  sport: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    difficulty: 'easy',
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isOpenReviews, setIsOpenReviews] = useState(false);

  const handledData = (data) => {
    return data.map((item, index) => {
      const {
        question,
        incorrect_answers: incorrectAnswer,
        correct_answer: correctAnswer,
      } = item;
      const answers = [...incorrectAnswer];
      const getRandomIndex = Math.floor(Math.random() * 4);
      answers.splice(getRandomIndex, 0, correctAnswer);
      return { question, correctAnswer, answers };
    });
  };

  const fetchQuestions = async (url) => {
    setIsWaiting(false);
    setIsLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    if (!response) {
      setIsWaiting(true);
      return;
    }
    const data = response.data.results;
    if (data.length <= 0) {
      setIsWaiting(true);
      setIsLoading(false);
      setIsError(true);
      return;
    }
    setQuestions(handledData(data));
    setIsWaiting(false);
    setIsLoading(false);
    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  const getQuestion = (questions, questionsIndex) => {
    const { question, correctAnswer, answers } = questions[questionsIndex];
    return { question, correctAnswer, answers };
  };

  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        isError,
        isWaiting,
        setIsWaiting,
        isLoading,
        handleSubmit,
        questions,
        questionIndex,
        setQuestionIndex,
        getQuestion,
        setQuestions,
        quiz,
        setQuiz,
        isOpenWarningModal,
        setIsOpenWarningModal,
        selectedAnswer,
        setSelectedAnswer,
        isShowAnswer,
        setIsShowAnswer,
        correctCount,
        setCorrectCount,
        reviews,
        setReviews,
        isOpenReviews,
        setIsOpenReviews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
