﻿    //************************************************************

var application_root = __dirname,
    express = require("express"),
    session = require("express-session"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require("path"),
    fs = require('fs'),
    mongoose = require('mongoose'),
    app = express(),
    http = require('http').Server(app),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    iz = require('iz'),
    ObjectID = require('mongodb').ObjectID,
    passportLocalMongoose = require('passport-local-mongoose'),

    accountRoute = require("./routes/account");
// Config
        app.set('port', process.env.PORT || 3000);
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(session({ secret: 'nodehomebrewerkey', resave: true, saveUninitialized: true }));
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(cookieParser());
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
//************************************************************


        var AccountModel = accountRoute.AccountModel;
        var auth = accountRoute.auth;
        var isAuthorized = accountRoute.isAuthorized;


        //************************************************************
        var connectionString = require('./models/conn');
        mongoose.connect(connectionString);

        accountRoute.CreateAdmUser();




        //************************************************************
        // ACCOUNT
        app.get('/loggedtest', accountRoute.loggedtest);


// Launch server
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });