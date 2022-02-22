const express = require("express");
const router = new express.Router();
const ordercontroller = require("../controllers/ordercontroller")

router.route("/orders")
.get(ordercontroller.getOrders);

router.route("/order")
.post(ordercontroller.postOrder);

router.route("/order/:id")
.get(ordercontroller.getOrder)

router.route("/order/:id")
.patch(ordercontroller.patchOrder)

router.route("/order/:id")
.delete(ordercontroller.deleteOrder)


module.exports = router;