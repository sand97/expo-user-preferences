import { useEffect, useState } from "react";

import UserPreferences from "./UserPreferences";

/**
 * Return current state of user's preference with function to set value
 * @param userPreferences instance
 * @param key key of object preference
 * @param initialValue initial value if key is not found in storage this value override initialData
 */
export default function usePreference<T, K extends keyof T>(
  userPreferences: UserPreferences<T>,
  key: K,
  initialValue?: T[K] | null,
): [T[K], (value: T[K]) => void] {
  const [value, setValue] = useState<T[K]>(
    userPreferences.getValue(key, initialValue),
  );
  useEffect(() => {
    const index = userPreferences.addListener(key, setValue);
    return () => {
      userPreferences.removeListener(key, index);
    };
  }, []);

  return [value, (value: T[K]) => userPreferences.setValue(key, value)];
}
