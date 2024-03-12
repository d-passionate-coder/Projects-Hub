const logOut = (req, res) => {
  req.logout(() => {
    return res.status(201).send("done");
  });
};

export default logOut;
