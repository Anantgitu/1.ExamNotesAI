import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {

    const token = req.cookies.token;

    // console.log(token)
    if (!token) {
      return res.status(400).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;