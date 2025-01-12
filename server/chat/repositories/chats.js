const { Chats } = require("../models/index");

async function createChatId(data) {
  return Chats.create(data);
}

async function findChatId(attributes, condition) {
  return Chats.findOne({
    attributes,
    where: condition,
  });
}

module.exports = { findChatId, createChatId };
