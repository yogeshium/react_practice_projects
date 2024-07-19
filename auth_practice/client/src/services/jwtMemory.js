

const jwtManager = () => {
  let jwtMemory = null;
  let refreshTimeoutId;

  const refreshToken = (expireTime) => {
    const delay = new Date(expireTime).getTime() - new Date().getTime();
    const timeoutTrigger = delay - 5000;

    refreshTimeoutId = window.setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:8000/refresh", {
          method: "POST",
          credentials: "include",
        });
        const parseRes = await res.json();
        setToken(parseRes.accessToken, parseRes.expireTime);
      } catch (err) {
        console.log(err);
      }
    }, timeoutTrigger);
  };
  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      window.clearTimeout(refreshTimeoutId);
    }
  };

  const getToken = () => jwtMemory;

  const setToken = (token, expireTime) => {
    jwtMemory = token;
    refreshToken(expireTime);
    return true;
  };
  const deleteToken = () => {
    jwtMemory = null;
    abortRefreshToken();
    return true;
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default jwtManager();
