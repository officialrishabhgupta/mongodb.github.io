const express = require("express");
const router = new express.Router();
const usercontroller = require("../controllers/usercontroller")

router.route("/users")
.get(usercontroller.getUsers);

router.route("/user")
.post(usercontroller.postUser);

router.route("/user/:id")
.get(usercontroller.getUser)

router.route("/user/:id")
.patch(usercontroller.patchUser)

router.route("/user/:id")
.delete(usercontroller.deleteUser)


module.exports = router;