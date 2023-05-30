module.exports = function (req, res, next) {
  // Check if the user is authenticated using the isAuthenticated() method of the req object
  if (req.isAuthenticated()) {
    // If the user is authenticated, execute the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, redirect them to the "/auth/google" route
  res.redirect("/auth/google");
}
