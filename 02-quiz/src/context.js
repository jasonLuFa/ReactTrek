import { useState, useContext, useEffect, createContext } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    difficulty: 'easy',
  });
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        setIsWaiting,
        questions,
        setQuestions,
        correctCount,
        isOpenWarningModal,
        setIsOpenWarningModal,
        isShowAnswer,
        setIsShowAnswer,
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
