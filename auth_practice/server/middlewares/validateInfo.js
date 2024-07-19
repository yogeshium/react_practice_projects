const validateEmail = (email) => {
    const regExp=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return regExp.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
    password
  );
};
const validateInfo = (req, res, next) => {
  if (req.path === "/signup") {
    const { name, email, password } = req.body;
    if (![name, email, password].every(Boolean))
      return res.status(401).json({ success: false, message: "Missing Credentials" });
    else if (!validateEmail(email))
      return res.status(401).json({ success: false, message: "Invalid Email" });
  } 
  else if (req.path === "/login") {
    const { email, password } = req.body;
    // console.log(email,password);
    if (![email, password].every(Boolean))
        return res.status(401).json({ success: false, message: "Missing Credentials" });
    else if(!validateEmail(email))
        return res.status(401).json({ success: false, message: "Invalid Email" });
  }

  next();
};

export default validateInfo;