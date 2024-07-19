import { Outlet } from "react-router-dom";
import NavBar from "./NabBar";

const SharedLayout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
  };
  
  
  export default SharedLayout;