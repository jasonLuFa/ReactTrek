import Alert from "./components/Alert";
import "./App.css";
import List from "./components/List";
import { useGlobalContext } from "./context";
import TodoInput from "./components/TodoInput";
import ClearButton from "./components/ClearButton";
import Timer from "./components/Timer";
import WarningModal from "./components/WarningModal";
import SettingButton from "./components/SettingButton";
import PomodoroSetting from "./components/PomodoroSetting";
import { POMODORO_ACTIONS } from "./pomodoroReducer";
import { ACTIONS } from "./todoReducer";

function App() {
  const {
    todos: { alert },
    isOpenWarningModal,
    setIsOpenWarningModal,
    pomodoro,
    pomodoroDispatch,
    dispatch,
    pomodoroCycle,
    setPomodoroCycle,
  } = useGlobalContext();

  const closePomodoro = () => {
    pomodoroDispatch({ type: POMODORO_ACTIONS.CLOSE_POMODORO });
    setIsOpenWarningModal(false);
    dispatch({
      type: ACTIONS.CHANGE_POMODORO_AMOUNT_OF_ITEM,
      payload: { pomodoroCycle },
    });
  };

  if (pomodoro.isOpenPomodoro) {
    return (
      <main>
        {isOpenWarningModal && (
          <WarningModal
            message={"Are you sure to stop this cycle ?"}
            handleSure={closePomodoro}
            handleCancel={() => setIsOpenWarningModal(false)}
          />
        )}
        <Timer />
      </main>
    );
  }

  if (pomodoro.isShowPomodoroSettings) {
    return <PomodoroSetting />;
  }

  const openPomodoro = () => {
    pomodoroDispatch({ type: POMODORO_ACTIONS.OPEN_POMODORO });
    setPomodoroCycle({ isFinished: false, itemId: pomodoro.targetItemId });
    setIsOpenWarningModal(false);
  };

  return (
    <section>
      {isOpenWarningModal && (
        <WarningModal
          message={"Are you sure to start a pomodoro cycle ?"}
          handleSure={openPomodoro}
          handleCancel={() => {
            setIsOpenWarningModal(false);
            pomodoroDispatch({ type: POMODORO_ACTIONS.REMOVE_ITEM_ID });
          }}
        />
      )}
      {/*
      // Slider scrolling not work correctly if render PomodoroSetting here.Beause .section-center bellow will alse render.
      {isShowPomodoroSettings && <PomodoroSetting />} 
      */}
      <div className="section-center">
        {alert.isShow && <Alert />}
        <TodoInput />
        <List />
        <ClearButton />
      </div>
      <SettingButton />
    </section>
  );
}

export default App;
