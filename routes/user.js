const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");
const routes = require(".");

router.get("/", authRequired, ctrl.user.show);

module.exports = router;
