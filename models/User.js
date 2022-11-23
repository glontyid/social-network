const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  city: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatar: { type: String, default: 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-a-cigarette_52683-34828.jpg?w=826&t=st=1661344566~exp=1661345166~hmac=c4359fe3bef692dc119d21413d4902d17b3502f4ee5b0a0c47c1187e7d912be3' },
  friends: { type: String, default: '' },
  friendsRequests: { type: String, default: '' },
  birthday: { type: String, default: null }
});

module.exports = model('ChatUser', userSchema);