import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

function jwtRefreshTokenGenerate(user) {
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1hr",
  });
  const expireTime = new Date();
  expireTime.setHours(expireTime.getHours()+1);
  return {refreshToken,expireTime};
}
function jwtAccessTokenGenerate(user) {
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });
  const expireTime = new Date();
  expireTime.setMinutes(expireTime.getMinutes()+10);
  return {accessToken,expireTime};
}
function jwtRefreshTokenVerify(token) {
  try {
    const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decode;
  } catch (err) {
    return null;
  }
}
function jwtAccessTokenVerify(token) {
  try {
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decode;
  } catch (err) {
    return null;
  }
}
export { jwtAccessTokenGenerate,jwtRefreshTokenGenerate,jwtAccessTokenVerify,jwtRefreshTokenVerify};
