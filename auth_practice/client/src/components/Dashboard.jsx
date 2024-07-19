import jwtMemory from "../services/jwtMemory";
import { useAuth } from "../context/auth";
import {Link} from "react-router-dom";
function Dashboard() {
  const {isLoggedIn,setAuth} = useAuth();

  const logoutHandler = (e) => {
    jwtMemory.deleteToken();
    setAuth(false);
  };
  console.log(isLoggedIn);
  return (
    <div>
      <button onClick={() => logoutHandler()}>Log Out</button>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default Dashboard;
