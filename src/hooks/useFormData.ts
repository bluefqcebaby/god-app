import {useState} from 'react';

export function useFormData<
  T extends Record<string, string | number>,
  S extends keyof T,
>(values: T): [T, (key: S, value: T[S]) => void] {
  const [formData, setFormData] = useState(values);
  const handleChange = (key: S, value: T[S]) => {
    setFormData(prevState => ({...prevState, [key]: value}));
  };
  return [formData, handleChange];
}
