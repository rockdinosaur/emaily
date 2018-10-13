const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

require('./models/User');
require('./services/passport'); // just need to run passport.js

mongoose.connect(
	keys.mongoURL,
	{ useNewUrlParser: true }
);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // cookie to last 1 month
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log('mern-app running on port', PORT);
app.listen(PORT);
