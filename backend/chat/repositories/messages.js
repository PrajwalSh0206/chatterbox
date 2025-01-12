const { Chats } = require("../models/index");
const { Messages } = require("../models/Messages");

async function createMessages(data) {
  return Messages.create(data);
}

async function findMessages(attributes, condition, limit, order) {
  return Messages.findAll({
    attributes,
    where: condition,
    limit,
    order: [order],
  });
}

module.exports = { findMessages, createMessages };
