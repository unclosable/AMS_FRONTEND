export const getCookie = (key) => {
  let arr,
    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) 
    return unescape(arr[2]);
  else 
    return null;
  }

export const setCookie = (key, value) => {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
  console.log(document.cookie);
}
