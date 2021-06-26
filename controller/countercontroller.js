var Counter = require("../models/counter");

/**
 * This api will be called to get number of time create/update api is called
 * @param {Request} req
 * @param {Response} res
 */
exports.getAPICount = function (req, res) {
  Counter.findOne({}, {}, { sort: { _id: -1 } }, function (err, counter) {
    var createUserCount = 0;
    var updateUserCount = 0;
    if (counter != null) {
      createUserCount =
        counter.createUserCount != null ? counter.createUserCount : 0;
      updateUserCount =
        counter.updateUserCount != null ? counter.updateUserCount : 0;
    }
    res.send({
      statusCode: 200,
      statusMessage: "Counters fetched successfully",
      data: {
        createUserCount: createUserCount,
        updateUserCount: updateUserCount,
      },
    });
  });
};
