const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  text: String,
  createdBy: String,
  createdAt: String,
  createdFor: String,
});

module.exports = model('ChatMessage', messageSchema);