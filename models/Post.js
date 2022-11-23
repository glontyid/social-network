const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  userId: String,
  content: String,
  author: String,
  createdTo: String,
  createdAt: String,
  createdBy: String,
});

module.exports = model('ChatPost', PostSchema);