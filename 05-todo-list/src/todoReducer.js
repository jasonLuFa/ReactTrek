import { setLocalStorage } from "./utils";

const DEFAULT_TOMATO_AMOUNT = 3;
const MAX_TOMATO_AMOUNT = 5;
const MIN_TOMATO_AMOUNT = 1;

export const todoReducer = (state, action) => {
  const { type, payload } = action;
  const { items, buttonStatus, isEdited, editID } = state;

  const alertDanger = (message) => {
    return { isShow: true, message, type: "alert-danger" };
  };

  const alertSucccess = (message) => {
    return { isShow: true, message, type: "alert-success" };
  };

  const emptyInputAlert = () => {
    return {
      ...state,
      alert: alertDanger("please enter value"),
    };
  };

  const isNameDuplicate = (input) => {
    return items.filter((item) => item.name === input).length > 0;
  };

  const handleNameDuplicate = (input) => {
    return {
      ...state,
      alert: alertDanger("name duplicate"),
    };
  };

  const handleEdit = (input) => {
    const newItems = items.map((item) =>
      item.id === editID ? { ...item, name: input } : item
    );
    setLocalStorage("item", newItems);
    return {
      ...state,
      items: newItems,
      isEdited: false,
      buttonStatus: { isDisabledDelete: false, isDisabledClear: false },
      alert: alertSucccess("finished edite"),
    };
  };

  const handleAdd = (input) => {
    const newItems = [
      ...items,
      {
        id: new Date().getTime().toString(),
        name: input,
        pomodoros: {
          totalAmount: DEFAULT_TOMATO_AMOUNT,
          unfinishedAmount: DEFAULT_TOMATO_AMOUNT,
        },
      },
    ];
    setLocalStorage("item", newItems);
    return {
      ...state,
      items: newItems,
      buttonStatus: { ...buttonStatus, isDisabledClear: false },
      alert: alertSucccess("add item"),
    };
  };

  switch (type) {
    case ACTIONS.SUBMIT_ITEM:
      if (!payload.input) {
        return emptyInputAlert();
      }
      if (isNameDuplicate(payload.input)) {
        return handleNameDuplicate();
      }
      if (isEdited) {
        return handleEdit(payload.input);
      }
      return handleAdd(payload.input);

    case ACTIONS.EDIT_ITEM:
      return {
        ...state,
        editID: payload.targetID,
        buttonStatus: { isDisabledClear: true, isDisabledDelete: true },
        isEdited: true,
      };

    case ACTIONS.DELETE_ITEM:
      const newItems = items.filter((item) => item.id !== payload.targetID);
      setLocalStorage("item", newItems);
      return {
        ...state,
        items: newItems,
        buttonStatus: newItems.length === 0 && {
          ...buttonStatus,
          isDisabledClear: true,
        },
      };

    case ACTIONS.CANCEL_EDIT_ITEM:
      return (
        editID === payload.targetID && {
          ...state,
          buttonStatus: { isDisabledClear: false, isDisabledDelete: false },
          isEdited: false,
        }
      );

    case ACTIONS.CLEAR_ITEMS:
      setLocalStorage("item", []);
      return {
        ...state,
        items: [],
        buttonStatus: {
          ...buttonStatus,
          isDisabledClear: true,
        },
        alert: alertDanger("clear item"),
      };

    case ACTIONS.CLOSE_ALERT:
      return { ...state, alert: { ...alert, isShow: false } };

    case ACTIONS.INCREASE_POMODORO:
      const increasePomodoroItems = items.map((item) => {
        const pomodoroTotalAmount = item.pomodoros.totalAmount;
        const pomodoroUnfinishedAmount = item.pomodoros.unfinishedAmount;
        if (
          item.id === payload.targetID &&
          pomodoroTotalAmount < MAX_TOMATO_AMOUNT
        ) {
          return {
            ...item,
            pomodoros: {
              totalAmount: pomodoroTotalAmount + 1,
              unfinishedAmount: pomodoroUnfinishedAmount + 1,
            },
          };
        }
        return item;
      });
      setLocalStorage("item", increasePomodoroItems);
      return { ...state, items: increasePomodoroItems };

    case ACTIONS.DECREASE_POMODORO:
      const decreasePomodoroItems = items.map((item) => {
        const pomodoroTotalAmount = item.pomodoros.totalAmount;
        const pomodoroUnfinishedAmount = item.pomodoros.unfinishedAmount;
        if (
          item.id === payload.targetID &&
          pomodoroTotalAmount > MIN_TOMATO_AMOUNT
        ) {
          return {
            ...item,
            pomodoros: {
              totalAmount: pomodoroTotalAmount - 1,
              unfinishedAmount: pomodoroUnfinishedAmount - 1,
            },
          };
        }
        return item;
      });
      setLocalStorage("item", decreasePomodoroItems);
      return { ...state, items: decreasePomodoroItems };

    case ACTIONS.CHANGE_POMODORO_AMOUNT_OF_ITEM:
      console.log(items);
      const adjustPomodoroAmountOfItems = items.map((item) => {
        const { itemId: targetItemId, isFinished } = payload.pomodoroCycle;
        console.log("item.id", item.id);
        console.log("targetItemId", targetItemId);
        console.log("isFinished", isFinished);
        console.log(
          "item.id === targetItemId && isFinished",
          item.id === targetItemId && isFinished
        );
        console.log(
          "item.pomodoros.unfinishedAmount",
          item.pomodoros.unfinishedAmount
        );
        console.log(
          "item.pomodoros.unfinishedAmount--",
          item.pomodoros.unfinishedAmount--
        );
        if (item.id === targetItemId && isFinished) {
          return {
            ...item,
            pomodoros: {
              ...item.pomodoros,
              unfinishedAmount: item.pomodoros.unfinishedAmount--,
            },
          };
        }
        return item;
      });
      console.log("adjustPomodoroAmountOfItems", adjustPomodoroAmountOfItems);
      setLocalStorage("item", adjustPomodoroAmountOfItems);
      return { ...state, items: adjustPomodoroAmountOfItems };

    default:
      throw new Error("There is no find matched action");
  }
};

export const ACTIONS = {
  SUBMIT_ITEM: "submit_item",
  CLEAR_ITEMS: "clear_items",
  EDIT_ITEM: "edit_item",
  DELETE_ITEM: "delete_item",
  CANCEL_EDIT_ITEM: "cancel_edit_item",
  CLOSE_ALERT: "close_alert",
  INCREASE_POMODORO: "increase_pomodoro",
  DECREASE_POMODORO: "decrease_pomodoro",
  CHANGE_POMODORO_AMOUNT_OF_ITEM: "change_pmodoro_amount_of_item",
};
