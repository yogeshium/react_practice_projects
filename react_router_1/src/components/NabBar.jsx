import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return { color: isActive ? "red" : "green" };
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => {
          return { color: isActive ? "red" : "green" };
        }}
      >
        About
      </NavLink>
    </nav>
  );
};

export default NavBar;
