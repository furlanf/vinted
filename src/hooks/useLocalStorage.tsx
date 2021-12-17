import { useState } from "react";

type UseLocalStorageType<T> = {
  storedValue: T;
  setValue: (value: T) => void;
  removeValue: () => void;
};

const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): UseLocalStorageType<T> => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
  };

  return { storedValue, setValue, removeValue };
};

export default useLocalStorage;
