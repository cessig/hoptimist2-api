const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../models");
const jwt = require("jsonwebtoken");

// base path /

// POST register Route
const register = async (req, res) => {
	try {
		const foundUser = await db.User.findOne({ email: req.body.email });

		if (foundUser) {
			return res.send({ message: "Account is already registered" });
		}

		const salt = await bcrypt.genSalt(10);
		// takes each character and turns it into multiple random characters
		const hash = await bcrypt.hash(req.body.password, salt);
		req.body.password = hash;
		// create user with req.body and hashed password
		const createdUser = await db.User.create({
			email: req.body.email,
			username: req.body.username,
			password: hash,
		});
		const createdProfile = await db.Profile.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			user: createdUser._id,
		});

		return res
			.status(201)
			.json({ status: 201, message: "success", createdUser, createdProfile });
	} catch (err) {
		return res.status(500).json({
			status: 500,
			error: err,
			message: "Something went wrong. Please try again",
		});
	}
};

// login post and authentication
const login = async (req, res) => {
	try {
		const foundUser = await await db.User.findOne({ email: req.body.email });

		console.log(foundUser);

		if (!foundUser) {
			return res.send({ message: "Email or Password incorrect" });
		}

		const match = await bcrypt.compare(req.body.password, foundUser.password);

		if (!match) {
			return res.send({ message: "Email or Password incorrect" });
		}

		const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

		if (isMatch) {
			const signedJwt = await jwt.sign(
				{
					_id: foundUser._id,
				},
				"super_secret_key",
				{
					expiresIn: "1h",
				}
			);

			return res.status(200).json({
				status: 200,
				message: "Success",
				id: foundUser._id,
				signedJwt,
			});
			// the password provided does not match the password on file.
		} else {
			return res.status(400).json({
				status: 400,
				message: "Username or password is incorrect",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			message: "Something went wrong. Please try again",
		});
	}
};

module.exports = {
	register,
	login,
};
