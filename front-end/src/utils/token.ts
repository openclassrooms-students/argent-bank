export const setToken = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getToken = (name: string) => {
  return localStorage.getItem(name);
};

export const removeToken = (name: string) => {
  localStorage.removeItem(name);
};
