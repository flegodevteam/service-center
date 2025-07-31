exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user.role backend-ல் set பண்ணியிருக்க வேண்டும் (JWT verify பண்ணும் பிறகு)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};