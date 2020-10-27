const db = require("../models");

// b

// index
const index = (req, res) => {
	db.Beer.find({}, (err, foundBeers) => {
		if (err) console.log("Error in beers#index:", err);

		if (!foundBeers.length)
			return res.status(200).json({ message: "No beers foundin db" });

		res.status(200).json({ beers, foundBeers });
	});
};

// new
const show = (req, res) => {
	db.Beer.findById(req.params.id, (err, foundBeer) => {
		if (err) console.log("Error in beers#show", err);

		if (!foundBeer)
			return res
				.status(200)
				.json({ message: "No beer with that id found in db" });

		res.status(200).json({ beer: foundBeer });
	});
};

// create
const create = (req, res) => {
	db.Beer.create(req.body, (err, savedBeer) => {
		if (err) console.log("Error in beers#create", err);

		res.status(201).json({ beer: savedBeer });
	});
};

const update = (req, res) => {
	db.Beer.findByIdAndRemove(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedBeer) => {
			if (err) console.log("Error in beer#update:", err);

			if (!updatedBeer)
				return res
					.status(200)
					.json({ message: "No beer with that id found in db" });

			res.status(200).json({ beer: updatedBeer });
		}
	);
};

module.exports = {
	index,
	show,
	create,
	update,
};
