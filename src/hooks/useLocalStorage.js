export const useLocalStorage = (cart) => {
  const getLocalStorage = () => {
    const local = localStorage.getItem(cart);
    if (local != null && local != undefined) {
      return JSON.parse(local);
    }
    return null;
  };
  const setLocalStorage = (items) => {
    localStorage.setItem(cart, JSON.stringify(items));
  };
  const removeLocalStorage = () => {
    return localStorage.removeItem(cart);
  };
  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};
