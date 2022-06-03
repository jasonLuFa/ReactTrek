import axios from 'axios';
import { useState, useContext, useEffect, createContext } from 'react';

const table = {
  sport: 21,
  history: 23,
  politics: 24,
};
const tempUrl =
  'https://opentdb.com/api.php?amount=2&category=21&difficulty=easy&type=multiple';
const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchQuestions = async (url) => {
    console.log(url);
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
      return;
    }
    console.log(data);
    setQuestions(data);
    setIsWaiting(false);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  const getQuestion = (questions, index) => {
    const {
      question,
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer,
    } = questions[index];
    const answers = [...incorrectAnswer, correctAnswer];
    return { question, correctAnswer, answers };
  };

  return (
    <AppContext.Provider
      value={{
        handleSubmit,
        isWaiting,
        setIsWaiting,
        isLoading,
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
