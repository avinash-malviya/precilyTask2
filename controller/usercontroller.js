var User = require("../models/user");
var Counter = require("../models/counter");

/**
 * This api creates with given parameters.
 * @param {Request} req - request object with user details.
 * @param {Response} res - response object sent to the caller of the API.
 */
exports.createUser = function (req, res) {
  //update the create counter
  updateAPICounter("CREATE_USER");
  // validate the request parameters
  validatParams(req, res);
  // create user object based on model definition
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    contact: req.body.contact,
    dateOfBirth: req.body.dateOfBirth,
  });
  // save the user in database
  user.save(function (err) {
    if (err) {
      console.log(err);
      res.json({
        statusCode: 500,
        statusMessage: "User was not created due to some error.",
      });
    } else {
      console.log("success");
      res.json({
        statusCode: 200,
        statusMessage: "User was created successfully.",
      });
    }
  });
};

function validatParams(req, res) {
  var validationString = isValidUserParam(req.body);
  if (validationString != "VALID") {
    res.json({
      statusCode: 400,
      statusMessage: validationString,
    });
  }
}

function updateAPICounter(apiOperation) {
  console.log("updating counter for " + apiOperation);
  Counter.findOne({}, {}, { sort: { _id: -1 } }, function (err, counter) {
    if (counter == null) {
      //create a new entry

      counter = new Counter({
        createUserCount: apiOperation == "CREATE_USER" ? 1 : 0,
        updateUserCount: apiOperation == "UPDATE_USER" ? 1 : 0,
      });
      counter.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      //update the counter
      var currCreateUserCount = counter.createUserCount;
      var currUpdateUserCount = counter.updateUserCount;
      if (apiOperation === "CREATE_USER") {
        //update the create user counter only
        currCreateUserCount = currCreateUserCount + 1;
      } else {
        //update the update user counter only
        currUpdateUserCount = currUpdateUserCount + 1;
      }

      Counter.findByIdAndUpdate(
        counter.id,
        {
          createUserCount: currCreateUserCount,
          updateUserCount: currUpdateUserCount,
        },
        { new: true }
      )
        .then((counterInDB) => {
          if (!counterInDB) {
            console.log("no counter in db with given id =" + counter.id);
          }
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            console.log("User not found with id " + counter.id);
          }
          console.log(err);
        });
    }
  });
}

function isValidUserParam(user) {
  if (!user) {
    return "User details passed are invalid";
  }
  if (user.firstName == "") {
    return "firstName is empty";
  }
  if (user.lastName == "") {
    return "lastName is empty";
  }
  if (user.address == "") {
    return "address is empty";
  }
  if (user.dateOfBirth == "") {
    return "dateOfBirth is empty";
  }
  if (user.contact == null || user.contact == NaN) {
    return "dateOfBirth is empty or not a number";
  }
  return "VALID";
}

exports.updateUser = (req, res) => {
  //update the update user counter
  updateAPICounter("UPDATE_USER");

  // validate the request parameters
  var validationString = isValidUserParam(req.body);
  if (validationString != "VALID") {
    res.json({
      statusCode: 400,
      statusMessage: validationString,
    });
  }
  // find the user from database by given Id and update
  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      contact: req.body.contact,
      dateOfBirth: req.body.dateOfBirth,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id,
      });
    });
};
