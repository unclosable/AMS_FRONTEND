import {hex_md5} from './md5.js'

function setCookie(name, value) {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=" + baseHost;
}

let cookie = void 0;
let baseHost = void 0;
(function() {
  baseHost = config.SERVER_HOST + ':' + config.SERVER_PORT
  fetch('//' + baseHost + '/c').then((re) => {
    re.text().then((t) => {
      cookie = t.replace(/-/g, '');
      setCookie('token', cookie);
    });
  });
})();
export const post = (url, data) => {
  const body = JSON.stringify(data);
  return fetch('//' + baseHost + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "token": cookie,
      "signature": hex_md5(cookie + body)
    },
    body: body
  });
}
