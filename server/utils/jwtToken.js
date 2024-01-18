// creating jwt token
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
