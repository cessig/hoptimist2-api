const db = require("../models");

const index = (req, res) => {
	db.Profile({}, (err, foundProfiles) => {
		if (err) console.log("Erros in profile#index");

		if (!foundProfiles.length)
			return res.status(200).json({ message: "No profiles found in db" });
		res.status(200).json({ profile: foundProfiles });
	});
};

const show = (req, res) => {
	db.Profile.findById(req.params.id, (err, foundProfile) => {
		if (err) console.log("Error in profile#show:", err);

		if (!foundProfile)
			return res
				.status(200)
				.json({ message: "No profile with that id found in db" });

		res.status(200).json({ profile: foundProfile });
	});
};

const create = (req, res) => {
	db.Profile.create(req.body, (err, savedProfile) => {
		if (err) console.log("Error in profile#create:", err);

		res.status(201).json({ profile: savedProfile });
	});
};

const update = (req, res) => {
	db.Profile.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedProfile) => {
			if (err) console.log("Error in profile#update:", err);

			if (!updatedProfile)
				return res
					.status(200)
					.json({ message: "No profile with that id found in db" });

			res.status(200).json({ game: updatedProfile });
		}
	);
};

module.exports = {
	index,
	show,
	create,
	update,
};
