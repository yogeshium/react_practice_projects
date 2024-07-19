import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Root from "./components/Root";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/auth";
import { Navigate } from "react-router-dom";
import jwtMemory from "./services/jwtMemory";
import {fetchRefresh} from "./services/authenticationService.js";
function App() {
  const { isLoggedIn, setAuth} = useAuth();
  
  // useEffect(() => {
  //   const res = fetchRefresh();
  //   if(res.success) {
  //     jwtMemory.setToken(res.accessToken, res.expireTime);
  //     setAuth(true);
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="signup"
            element={isLoggedIn ? <Navigate replace to="/" /> : <Signup />}
          />
          <Route
            path="login"
            element={isLoggedIn ? <Navigate replace to="/" /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
