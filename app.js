var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    seedDB = require('./seeds.js'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds');
    methodOverride = require('method-override'),
    flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
// seedDB();
//passport configuration
app.use(flash());
app.use(require('express-session')({
    secret: "SecretSaltString",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds',campgroundRoutes);

var connectionString = 'mongodb://yelpcamp:249596380@ds155509.mlab.com:55509/yelpcamp';
var options = {
    server: {socketOptions: {keepAlive: 1}}
};
mongoose.connect(connectionString, options);

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp server is running!")
});

