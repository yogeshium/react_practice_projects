import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Button({ children, type = "button", slug, className = "", ...props }) {
  return (
    <button className={`btn + ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
