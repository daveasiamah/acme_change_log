import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized." });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token)
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      console.log(payload);
      next();
    } catch (error) {
      console.log(Object.values(error)[1]);
      res.status(401);
      res.json({ message: "Not a valid token." });
      return;
    }
};
