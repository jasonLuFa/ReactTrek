import './css/App.css';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import QuestionPage from './QuestionPage';
import AnswerPage from './AnswerPage';
import ReviewsPage from './ReviewsPage';

function App() {
  const {
    isWaiting,
    isLoading,
    isOpenWarningModal,
    isShowAnswer,
    isOpenReviews,
  } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }
  if (isOpenReviews) {
    return <ReviewsPage />;
  }

  if (!isOpenWarningModal && isShowAnswer) {
    return <AnswerPage />;
  }

  return <QuestionPage />;
}

export default App;
