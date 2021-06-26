var express = require("express");
var router = express.Router();
var userController = require("../controller/usercontroller");

/* 
This API will be used to create user
*/
router.post("/v1/create", userController.createUser);
/* 
This API will be used to update user with given user id
*/
router.put("/v1/update/:id", userController.updateUser);

module.exports = router;
