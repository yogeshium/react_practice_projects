import { jwtAccessTokenVerify } from "../utils/jwt.js";

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const jwtAccessToken = bearerHeader.split(" ")[1];
      const payload = jwtAccessTokenVerify(jwtAccessToken);
      if(payload)
        req.user = payload;
    }
  } catch (err) {
    
  } finally {
    next();
  }
};

export default verifyToken;
