﻿//************************************************************

var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    http = require('http'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    iz = require('iz'),
    ObjectID = require('mongodb').ObjectID,
    passportLocalMongoose = require('passport-local-mongoose'),
    accountRoute = require("./routes/account");


// Config
    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
        app.use(express.bodyParser());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.cookieParser('your secret here'));
        app.use(express.session());
        app.use(function (req, res, next) {
            if (req.method == 'POST' && req.url == '/login') {

                if (req.body.rememberme) {
                    var hour = 3600000;
                    req.session.cookie.maxAge = 7 * 24 * hour; //1 week
                } else {
                    req.session.cookie.expires = false;
                }
            }
            next();
        });
        app.use(passport.initialize());
        app.use(passport.session());
    });
//************************************************************



var AccountModel = accountRoute.AccountModel;




//************************************************************
var connectionString = require('./models/conn');
mongoose.connect(connectionString);

accountRoute.CreateAdmUser();




//************************************************************
// ACCOUNT
app.get('/loggedtest', accountRoute.loggedtest);
app.post('/login', accountRoute.login);
app.get('/logout', accountRoute.logout);



// Launch server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Node Application server listening on port " + app.get('port'));
});