import { useEffect, useState } from "react";
import { localStorageUtil } from "../utils/localStorageUtil";

type TCallbackArgs<T> = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setValue: React.Dispatch<React.SetStateAction<T | null>>;
  key: string;
};

const processRemoveStoredValue = <T>({
  setValue,
  setLoading,
  setError,
  key,
}: TCallbackArgs<T>) => {
  return async () => {
    try {
      setError(null);
      setLoading(true);
      await localStorageUtil.removeItemAsync(key);
      setValue(null);
    } catch (err) {
      setError(`Error removing item ${key} from localStorage`);
    } finally {
      setLoading(false);
    }
  };
};

const processSetStoredValue = <T>({
  setValue,
  setLoading,
  setError,
  key,
}: TCallbackArgs<T>) => {
  return async (newValue: T) => {
    try {
      setError(null);
      setLoading(true);
      await localStorageUtil.setItemAsync(key, newValue);
      setValue(newValue);
    } catch (err) {
      setError(`Error setting item ${key} in localStorage`);
    } finally {
      setLoading(false);
    }
  };
};

const fetchData = <T>({
  key,
  setError,
  setLoading,
  setValue,
  initialValue,
}: TCallbackArgs<T> & { initialValue: T }) => {
  return async () => {
    try {
      setError(null);
      setLoading(true);
      const storedValue = await localStorageUtil.getItemAsync<T>(key);
      setValue(storedValue?.data !== null ? storedValue?.data : initialValue);
    } catch (err) {
      setError(`Error getting item ${key} from localStorage`);
    } finally {
      setLoading(false);
    }
  };
};

type UseLocalStorageReturn<T> = {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  loading: boolean;
  error: string | null;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData({ initialValue, key, setError, setLoading, setValue })();
  }, [key, initialValue]);

  return {
    value,
    setValue: processSetStoredValue({
      key,
      setError,
      setLoading,
      setValue,
    }),
    removeValue: processRemoveStoredValue({
      key,
      setError,
      setLoading,
      setValue,
    }),
    loading,
    error,
  };
};
