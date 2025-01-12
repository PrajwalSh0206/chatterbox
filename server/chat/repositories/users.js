const { Users } = require("../models/index");

async function createUser(data) {
  return Users.create(data);
}

async function findUser(attributes, condition) {
  return Users.findOne({
    attributes,
    where: condition,
  });
}

module.exports = { findUser, createUser };
