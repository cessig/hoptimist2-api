const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},

	{
		timestamps: true,
	}
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
