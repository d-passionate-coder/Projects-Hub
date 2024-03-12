function checkUser(req, res, next) {
  if (req.body.isStudent) req.url += "student";
  else req.url += "faculty";
  next();
}

export default checkUser;
