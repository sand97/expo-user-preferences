import ExpoUserPreferencesModule from "./ExpoUserPreferencesModule";

export default class UserPreferences<T> {
  /**
   * save object of initial user's preference like { theme: 'light', language: 'en' }
   * @private
   */
  private data: T;

  /**
   * save listeners for each key of object preference and return the index of the listener
   * @private
   */
  private listeners: Map<
    keyof T,
    { [key: number]: (value: T[keyof T]) => void }
  > = new Map();

  constructor(initialData: T) {
    this.data = initialData;
  }

  /**
   * set value of key in object preference, save it to storage and call listeners
   * @param key
   * @param value
   */
  setValue<K extends keyof T>(key: K, value: T[K]): void {
    this.data[key] = value;
    const jsonValue = JSON.stringify({
      key,
      value,
    });
    ExpoUserPreferencesModule.setValue(key, jsonValue);
    const listeners = this.listeners.get(key);
    if (listeners) {
      Object.values(listeners).forEach((listener) => listener(value));
    }
  }

  /**
   * get value corresponding to key from storage or return the initial value
   * @param key key of object preference
   * @param initialValue initial value if key is not found in storage
   */
  getValue<K extends keyof T>(key: K, initialValue?: T[K] | null): T[K] {
    const value = ExpoUserPreferencesModule.getValue(key);
    if (value) {
      const parsedValue = JSON.parse(value);
      return parsedValue.value;
    }
    return initialValue || this.data[key];
  }

  /**
   * add listener for key of object preference
   * @param key key of object preference
   * @param listener listener for key value change
   */
  addListener<K extends keyof T>(
    key: K,
    listener: (value: T[K]) => void,
  ): number {
    const listeners = this.listeners.get(key) || {};
    const index = Object.keys(listeners).length;
    listeners[index] = listener as (value: T[keyof T]) => void;
    this.listeners.set(key, listeners);
    return index;
  }

  /**
   * remove listener for key of object preference
   * @param key
   * @param index
   */
  removeListener<K extends keyof T>(key: K, index: number): void {
    const listeners = this.listeners.get(key);
    if (listeners) {
      delete listeners[index];
    }
  }
}
