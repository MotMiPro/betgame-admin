import Cookies from "js-cookie";
import { cookieN } from "./configs";

export const setCookie = (key, value, expireDay = 7) => {
  Cookies.set(key, JSON.stringify(value), {
    expires: expireDay,
    path: "/",
  });
};

export const removeCookie = (key) => {
  Cookies.remove(key, {
    expires: 1,
  });
};

export const getCookie = (key) => {
  const getData = Cookies.get(key);
  if (getData) {
    return JSON.parse(getData);
  }
  return null;
};

export const authHeader = (isSocket = false) => {
  let token = getCookie(cookieN);
  // const [token, setToken] = useState(null);
  // useEffect(() => {
  //   let getToken = getCookie(cookieN);
  //   if (getToken) {
  //     setToken(getToken);
  //   }
  // }, []);

  if (token) {
    return isSocket
      ? {
          query: {
            accessToken: `Bearer ${token?._token}`,
          },
        }
      : { Authorization: "Bearer " + token?._token };
  } else {
    return {};
  }
};
