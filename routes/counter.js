var express = require("express");
var router = express.Router();
var counterController = require("../controller/countercontroller");

/* 
This API will be used to count number of times create/update user has been called.
*/
router.get("/v1", counterController.getAPICount);

module.exports = router;