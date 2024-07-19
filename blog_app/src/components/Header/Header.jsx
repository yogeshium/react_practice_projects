import "../App.css";
import { useSelector } from "react-redux";
import Button from "../Button";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status;
  });
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Sign In",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Sign Out",
      slug: "/logout",
      active: authStatus,
    },
  ];
  return (
    <div className="navbar">
      <h1>{/* <Link to="/">Blog App</Link> */}</h1>
      <ul>
        {navItems.map((item) => {
          if (item.active)
            return (
              <li key={item.name}>
                <Button children={item.name} slug={item.slug} />
              </li>
            );
          else return null;
        })}
      </ul>
    </div>
  );
}

export default Header;
