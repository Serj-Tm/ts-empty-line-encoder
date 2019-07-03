
const authName = "gridpier.auth";

function getCookies() {
  let cookies:any = {};
  document.cookie.split(';').forEach(function (el) {
    let [k, v] = el.split('=');
    cookies[k.trim()] = v;
  })
  return cookies;
}

export function getAuth(): Auth | null {
  //сброс авторизации при отсутствии авторизации в asp.net core
  if (getCookies()['.AspNetCore.Cookies'] == null)
    clearAuth();


  let storage = sessionStorage;
  if (localStorage != null && localStorage[authName] != null)
    storage = localStorage;

  const auth = storage[authName];
  if (auth == null)
    return null;

  return JSON.parse(auth);
}

export function setAuth(authData: Auth | null, isRemember?: boolean) {
  clearAuth();

  if (authData == null)
    return;

  const storage = isRemember == true ? localStorage : sessionStorage;

  if (storage == null)
    return;

  storage[authName] = JSON.stringify(authData);

}

export function clearAuth() {
  if (sessionStorage != null) {
    sessionStorage.removeItem(authName);
  }
  if (localStorage != null) {
    localStorage.removeItem(authName);
  }
}

export interface Auth {
  id: string;
  login: string;
  name: string;
}