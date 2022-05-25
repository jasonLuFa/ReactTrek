import axios from 'axios';
import { useState, useContext, useEffect, createContext } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    difficulty: 'easy',
  });
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

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
      setIsError(true);
      return;
    }
    setQuestions(data);
    setIsWaiting(false);
    setIsLoading(false);
    setIsError(false);
  };

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  return (
    <AppContext.Provider value={{ isWaiting, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
