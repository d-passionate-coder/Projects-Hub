const forceSecureConnection = (req, res, next) => {
  // Override req.secure to true
  Object.defineProperty(req, "secure", {
    configurable: true,
    enumerable: true,
    value: true,
    writable: false,
  });
  // Proceed to the next middleware
  next();
};

export default forceSecureConnection;
