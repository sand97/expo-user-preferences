export default {
  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
  getValue(key: string): string | null {
    return localStorage.getItem(key);
  },
};
