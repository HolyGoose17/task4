export const auth = {
  isAuthenticated: () => {
    return Boolean(localStorage.getItem('jwt'));
  },
};
