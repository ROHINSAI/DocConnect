import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({
        success: false,
        message: "not authorized please login again",
      });
    }
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode_token.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { authUser };
