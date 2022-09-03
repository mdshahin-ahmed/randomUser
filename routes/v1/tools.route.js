const express = require("express");
const toolsControlars = require("../../controlars/tools.controlar");
const viewCount = require("../../middleWare/viewCount");

const router = express.Router();

router.route("/all").get(toolsControlars.getAllUsers);

router.route("/random").get(toolsControlars.randomUser);
router.route("/save").post(toolsControlars.addUser);
router.route("/delete/:id").delete(toolsControlars.deleteUser);

module.exports = router;
