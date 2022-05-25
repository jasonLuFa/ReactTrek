import './App.css';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';

import Loading from './Loading';

function App() {
  const { isWaiting, isLoading } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div className='App'></div>;
}

export default App;
