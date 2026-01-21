export const saveToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const clearToken = () => {
  return localStorage.removeItem('jwt');
};

export const getToken = () => {
  return localStorage.getItem('jwt');
};
