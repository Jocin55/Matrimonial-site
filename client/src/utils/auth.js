import jwtDecode from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

export function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

export function isAuthenticated() {
  return !!getToken() && !!getUser();
}
