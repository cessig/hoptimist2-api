const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.profile.index);
router.get("/:id", ctrl.profile.show);
router.post("/", ctrl.profile.create);
router.put("/:id", ctrl.profile.update);
router.delete("/:id", ctrl.profile.destroy);

// exports
module.exports = router;
