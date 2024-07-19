import { useState } from "react";
import jwtMemory from "../services/jwtMemory.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const {isLoggedIn,setAuth}= useAuth();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.success) {
        jwtMemory.setToken(parseRes.accessToken, parseRes.expireTime);
        setAuth(true);
        navigate("/");
      } else {
        setErrorMsg(parseRes.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  console.log(isLoggedIn);

  return (
    <div className="Login">
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={email}
            type="email"
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Sign Up</Link>
      {errorMsg ? <div>{errorMsg}</div> : null}
    </div>
  );
}

export default Login;
