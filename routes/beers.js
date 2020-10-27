const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.beers.index);
router.get("/:id", ctrl.beers.show);
router.post("/", ctrl.beers.create);
router.put("/:id", ctrl.beers.update);

module.exports = router;
