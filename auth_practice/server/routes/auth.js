import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
  jwtRefreshTokenVerify,
} from "../utils/jwt.js";
import validateInfo from "../middlewares/validateInfo.js";
const router = express.Router();

//Signup
router.post("/signup", validateInfo, async (req, res) => {
  try {
    //1.destructure req.body - (name, email, password)
    const { name, email, password } = req.body;

    //2. check if user exist , if yes - throw error
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length !== 0)
      return res
        .status(401)
        .status(401)
        .json({ success: false, message: "User Already Exists" });

    //3. Bcrypt the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //4. Enter the new user inside the database
    const newUser = await pool.query(
      "INSERT INTO users VALUES($1,$2,$3) RETURNING *;",
      [name, email, hashedPassword]
    );

    //5. genarating the jwt access token and refresh token
    const {accessToken,expireTime} = jwtAccessTokenGenerate({
      name: newUser.rows[0].name,
      email: newUser.rows[0].email,
    });
    const {refreshToken} = jwtRefreshTokenGenerate({
      email: newUser.rows[0].email,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, accessToken,expireTime });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//Login
router.post("/login", validateInfo, async (req, res) => {
  try {
    //1. destructure req.body - {email, password}
    const { email, password } = req.body;
    // console.log(email,password);
    //2. Check if user doesn't exist - send error
    const result = await pool.query("SELECT * FROM users WHERE email=$1;", [
      email,
    ]);
    if (result.rows.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "Email doesn't exists" });

    //3. check password from database password
    const isValidPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (!isValidPassword)
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });

    //4. give them jwt token
    const {accessToken,expireTime} = jwtAccessTokenGenerate({
      name: result.rows[0].name,
      email: result.rows[0].email,
    });
    const {refreshToken} = jwtRefreshTokenGenerate({
      email: result.rows[0].email,
    });
    res.cookie("jwt", refreshToken, {
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, accessToken, expireTime});
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}); 


//Jwt Refresh
router.post("/refresh", async (req, res) => {
  
  if (req.cookies?.jwt) {
    console.log("Refresh - cookie");
    const refreshToken = req.cookies.jwt;
    const decode = jwtRefreshTokenVerify(refreshToken);
    if (!decode) {
      return res.status(406).json({ success: false });
    } else {
      try {
        const result = await pool.query(
          "SELECT name,email FROM users WHERE email=$1;",
          [decode.email]
        );
        
        const {accessToken,expireTime} = jwtAccessTokenGenerate({
          name: result.rows[0].name,
          email: result.rows[0].email,
        });
        return res.status(200).json({success: true, accessToken,expireTime})
      } catch (err) {
        return res.status(500).json({success:false,error:"Internal Server Error"});
      }
    }
  }
});

export default router;
