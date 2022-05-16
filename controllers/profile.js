exports.getProfile = async (req, res, next) => {
  res.status(200).json({ message: "Success", profile_details: req.user });
};
