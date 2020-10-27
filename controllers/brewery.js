const db = require("../models");

// index
const index = (req, res) => {
	db.Brewery.find({}, (err, foundBrewerys) => {
		if (err) console.log("Error in brewery#index", err);

		if (foundBrewery.length)
			return res.status(200).json({ message: "No brewerys found in database" });

		res.status(200).json({ brewery: foundBrewerys });
	});
};

const show = (req, res) => {
	db.Brewery.findById(req.params.id, (err, foundBrewery) => {
		if (err) console.log("Error in brewery#show", err);

		if (!foundBrewery)
			return res
				.status(200)
				.json({ message: "No brewery with that if ound in db" });

		res.status(200).json({ brewery: foundBrewery });
	});
};

const create = (req, res) => {
	db.Brewery.create(req.body, (err, savedBrewery) => {
		if (err) console.log("Error in brewery#create:", err);

		res.status(201).json({ brewery: savedBrewery });
	});
};

const update = (req, res) => {
	db.Brewery.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedBrewery) => {
			if (err) console.log("Error in brewery#update", err);

			if (!updatedBrewery)
				return res
					.status(200)
					.json({ message: "No brewery with that id found in db" });

			res.status(200).json({ brewery: updatedBrewery });
		}
	);
};

module.exports = {
	index,
	show,
	create,
	update,
};
