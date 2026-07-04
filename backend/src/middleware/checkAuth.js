const checkAuth = (res, req, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({message: 'Please log in first!'});
  }

};

module.exports = checkAuth;