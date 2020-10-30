const db = require("../models");

// b

// index
const index = async (req, res) => {
	try {
		const foundBeers = await db.Beer.find({});

		if (!foundBeers.length) return res.status(200).json({ beers: [] });

		const beersWithBrewery = [];
		for (let index = 0; index < foundBeers.length; index++) {
			// In order to modify the MonboDB collection item,
			// we need to call 'toObject' or else we cannot modify it
			// Very frustrating!!!
			const beer = foundBeers[index].toObject();

			const breweryId = beer.brewery;
			const foundBrewery = await db.Brewery.findById(breweryId);
			if (foundBrewery) {
				console.log(foundBrewery.name);
				beer.breweryName = foundBrewery.name;
			}
			console.log(beer);
			beersWithBrewery.push(beer);
		}

		res.status(200).json({ beers: beersWithBrewery });
	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: "Something went wrong. Please try again",
		});
	}
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
	console.log(req.body);
	db.Beer.create(req.body, (err, savedBeer) => {
		if (err) {
			console.log("Error in beers#create", err);
			return res.send(err);
		}

		db.Brewery.findById(req.body.brewery, function (err, foundBrewery) {
			if (err) {
				console.log(err);
				return res.send(err);
			}
			console.log(foundBrewery);
			foundBrewery.beers.push(savedBeer);
			foundBrewery.save();

			res.status(201).json({ beer: savedBeer });
		});
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

const destroy = (req, res) => {
	db.Beer.findByIdAndDelete(req.params.id, (err, deletedBeer) => {
		if (err) console.log("Error in beers#destroy", err);

		if (!deletedBeer)
			return res
				.status(200)
				.json({ message: "No beer with that id found in db" });

		db.Brewery.findById(deletedBeer.brewery, function (err, foundBrewery) {
			if (err) {
				console.logt(err);
				return res.send(err);
			}
			foundBrewery.beers.remove(deletedBeer);
			foundBrewery.save();

			res.status(200).json({ message: "you deleted this beer" });
		});
	});
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy,
};
