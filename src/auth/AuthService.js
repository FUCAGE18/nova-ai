export const AUTH_STORAGE_KEY = 'novaui_auth_user';

export function saveUserSession(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getUserSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUserSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function fakeDelay(ms = 600) {
  await new Promise((res) => setTimeout(res, ms));
}

export async function loginWithEmail(email, password) {
  await fakeDelay();
  // Basic demo validation
  if (!email || !password) throw new Error('Lütfen email ve şifre girin');
  const user = { id: 'u_' + Date.now(), email, name: email.split('@')[0] };
  saveUserSession(user);
  return user;
}

export async function registerWithEmail(name, email, password) {
  await fakeDelay();
  if (!name || !email || !password) throw new Error('Lütfen tüm alanları doldurun');
  const user = { id: 'u_' + Date.now(), email, name };
  saveUserSession(user);
  return user;
}

export async function requestPasswordReset(email) {
  await fakeDelay();
  if (!email) throw new Error('Lütfen email girin');
  return true;
}
