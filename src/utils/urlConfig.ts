let api = '';
if (
  window.location.hostname.includes('localhost') ||
  window.location.hostname.includes('127.0.0.1')
) {
  api = 'http://localhost:8000/api';
}

export const REGISTER = `${api}/register`;
export const LOGIN = `${api}/login`;

export const GET_HOSTING = `${api}/hosting`;
export const POST_HOSTING = `${api}/hosting/create`;

export const GET_ALL_USERS = `${api}/admin/users`;

export const GET_ALL_DOMAINS = `${api}/domains`;
export const POST_DOMAINS = `${api}/domains/create`;
