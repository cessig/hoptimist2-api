// imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.brewery.index);
router.get("/:id", ctrl.brewery.show);
router.post("/", ctrl.brewery.create);
router.put("/:id", ctrl.brewery.update);
router.delete("/:id", ctrl.brewery.destroy);

// exports
module.exports = router;
