import Alert from "./components/Alert";
import "./App.css";
import List from "./components/List";
import { useGlobalContext } from "./context";
import TodoInput from "./components/TodoInput";
import ClearButton from "./components/ClearButton";

function App() {
  const { todos } = useGlobalContext();
  const { alert } = todos;

  return (
    <section>
      <div className='section-center'>
        {alert.isShow && <Alert />}
        <TodoInput />
        <List />
        <ClearButton />
      </div>
    </section>
  );
}

export default App;
