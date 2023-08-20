function checkAuthorization(req, res, next) {
    const { userId } = req.body;
  
    // Assuming req.user.id contains the authenticated user's ID
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  
    // If authorized, proceed to the next middleware or route handler
    next();
  }
  
  export default checkAuthorization