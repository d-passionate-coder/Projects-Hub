const checkLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  }
  return res.status(401).send("AuthFailure");
};

export default checkLogin;
