export const getCookie = (key) => {
  let arr,
    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) 
    return unescape(arr[2]);
  else 
    return null;
  }

export const setCookie = (cname, cvalue, exdays = 0.5) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";expires=" + expires;
}

export const deleteCookie = (key) => {
  setCookie(key, "", -1);
}
