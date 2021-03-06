import {hex_md5} from './md5.js'
import queryString from 'query-string';
import {getCookie, setCookie, deleteCookie} from './cookie.js'
const cookieKey = 'UfWWs3XSY6WpU0kh';
let cookie = void 0;
let baseHost = void 0;
export const RFD = 'RFD';
export const HY = 'HY';
export const switchHost = (host) => {
  switch (host) {
    case RFD:
      baseHost = config.SERVER_HOST_RFD + ':' + config.SERVER_PORT_RFD
      break;
    case HY:
      baseHost = config.SERVER_HOST_HY + ':' + config.SERVER_PORT_HY
      break;
    default:
  }
}
switchHost(RFD);
export const loged = () => {
  let cookie = getCookie(cookieKey);
  if (!cookie) {
    return false;
  } else {
    return true;
  }
}
export const logCheck = () => {
  let cookie = getCookie(cookieKey);
  return get('/validate')
}
export const get = (uri, params) => {
  const access_token = getCookie(cookieKey);
  let theUrl = uri + (
    params
    ? '?'
    : '');
  return fetch('//' + baseHost + theUrl + queryString.stringify(params), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}
export const post = (uri, data) => {
  const access_token = getCookie(cookieKey);
  const body = JSON.stringify(data);
  return fetch('//' + baseHost + uri, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": 'application/json'
    },
    body: body
  });
}
export const put = (uri, data) => {
  const access_token = getCookie(cookieKey);
  const body = JSON.stringify(data);
  return fetch('//' + baseHost + uri, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": 'application/json'
    },
    body: body
  });
}
export const del = (uri, data) => {
  const access_token = getCookie(cookieKey);
  const body = JSON.stringify(data);
  return fetch('//' + baseHost + uri, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": 'application/json'
    },
    body: body
  });
}
const baseInfo = {
  grant_type: "password",
  client_id: "ams-frontend",
  client_secret: "ams,2018"
};
const serialize = (obj, prefix) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix
          ? prefix + "[" + p + "]"
          : p,
        v = obj[p];
      str.push(
        (v !== null && typeof v === "object")
        ? serialize(v, k)
        : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
export const login = (data) => {
  const postData = Object.assign({}, data, baseInfo);
  return fetch('//' + baseHost + '/oauth/token', {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: serialize(postData)
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((body) => {
        setCookie(cookieKey, body.access_token);
      })
    } else {
      throw "登陆失败";
    }
  });
}
export const logout = () => {
  deleteCookie(cookieKey);
}
