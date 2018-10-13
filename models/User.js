const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema);

// collection gets pluralized to "blahs"
// mongoose.model('blah', userSchema);
