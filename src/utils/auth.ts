export const saveUser = (user: { id: string; name: string } | undefined | null) => {
  if (!user) return;
  localStorage.setItem('auth-user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('auth-user');

  if (!user || user === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (e) {
    console.error('Error to parsing user', e);
    localStorage.removeItem('auth-user');
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem('auth-user');
};
