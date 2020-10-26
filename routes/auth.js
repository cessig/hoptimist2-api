const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const routes = require(".");
const { Router } = require("express");

router.post("/register", ctrl.auth.register);
router.post("/login", ctrl.auth.login);

module.exports = router;
