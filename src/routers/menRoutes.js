const express = require("express");
const router = new express.Router();
const mencontroller = require("../controllers/mencontroller")

router.route("/men")
.get(mencontroller.getMen);

router.route("/men")
.post(mencontroller.postMan);

router.route("/men/:id")
.get(mencontroller.getMan)

router.route("/men/:id")
.patch(mencontroller.patchMan)

router.route("/man/:id")
.delete(mencontroller.deleteMan)


module.exports = router;

