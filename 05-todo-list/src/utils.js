export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('item'));
};

export const setLocalStorage = (items) => {
  localStorage.setItem('item', JSON.stringify(items));
};
