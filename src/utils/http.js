import {hex_md5} from './md5.js'
import {getCookie, setCookie} from './cookie.js'
const cookieKey = 'UfWWs3XSY6WpU0kh';
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
export const loged = () => {
  let cookie = getCookie(cookieKey);
  if (cookie == 'admin') {
    return true;
  } else {
    return false;
  }
}
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
