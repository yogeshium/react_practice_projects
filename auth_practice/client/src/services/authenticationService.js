
const fetchRefresh = async () => {
  try {
    const res = await fetch("http://localhost:8000/refresh", {
      method: "POST",
      credentials: "include",
    });
    const parseRes = await res.json();
    return parseRes;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
export { fetchRefresh };
