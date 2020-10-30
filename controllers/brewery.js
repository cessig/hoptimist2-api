const db = require("../models");

// index
const index = async (req, res) => {
	try {
		const foundBrewerys = await db.Brewery.find({});

		if (!foundBrewerys.length) return res.status(200).json({ brewerys: [] });

		const breweryWithBeers = [];
		for (let index = 0; index < foundBrewerys.length; index++) {
			const brewery = foundBrewerys[index].toObject();
			console.log("index", index);
			const beersArray = brewery.beers;
			for (
				let beersArrayIndex = 0;
				beersArrayIndex < beersArray.length;
				beersArrayIndex++
			) {
				console.log("beersArrayIndex", beersArrayIndex);
				const beerId = beersArray[beersArrayIndex];
				const foundBeer = await db.Beer.findById(beerId);
				if (foundBeer) {
					console.log(foundBeer.name);

					beersArray[beersArrayIndex] = foundBeer;
				}
			}

			breweryWithBeers.push(brewery);
		}
		res.status(200).json({ brewery: breweryWithBeers });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: 500,
			message: "Something went wrong. Please try again",
		});
	}
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

const destroy = (req, res) => {
	console.log("We made it");
	db.Brewery.findByIdAndDelete(req.params.id, function (err, deletedBrewery) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		console.log(deletedBrewery._id);
		db.Beer.deleteMany({ brewery: deletedBrewery._id }, function (
			err,
			removedBeers
		) {
			if (err) {
				console.log(err);
				return res.send(err);
			}
			res.status(200).json({ message: "you deleted this brewery" });
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
