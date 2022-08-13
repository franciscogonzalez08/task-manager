const User = require("../models/User");

async function authUser(req, res, next) {
  const userID = req.headers.uid;
  // Check for null value
  if (!userID) {
    return res.status(400).json({
      msg: "The request has no user ID header, please provide a value for the 'uid' header.",
    });
  }

  // Find user in MongoDB
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(401).json({
        msg: `No user with ID ${userID} was found. You cannot interact with the tasks API.`,
      });
    }
    // User exists
    next();
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}

module.exports = authUser;
