var express       = require('express');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var cookieParser  = require('cookie-parser');
var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('./models/User');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var app           = express();

require('./models/Ingredient');

/*bootstraps*/
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
var dburl = require('./config/db.js').db;
mongoose.connect(dburl);
require('./config/passport')(passport, LocalStrategy);
require('./config/init')(app, morgan, bodyParser, session, cookieParser, passport, mongoose, MongoStore);


require('./routes/index')(app, passport);
require('./routes/auth')(app, passport);
require('./routes/square')(app);
//require('./routes/admin')(app);
/*end bootstraps*/

app.listen(3000);
console.log('app listening on port 3000');



