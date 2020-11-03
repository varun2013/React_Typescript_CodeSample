export function getToken() {
  const token = localStorage.getItem('ACCESS_TOKEN');
  return token;
}

export function setToken(token: string) {
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.setItem('ACCESS_TOKEN', token);
  return token;
}

export function removeLocalData() {
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('typeData');
  return true;
}

export function getVerifyToken() {
  const token = localStorage.getItem('VERIFY_TOKEN');
  return token;
}

export function setVerifyToken(token: string) {
  localStorage.removeItem('VERIFY_TOKEN');
  localStorage.setItem('VERIFY_TOKEN', token);
  return token;
}