    //************************************************************

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
    io = require('socket.io')(http),
    rest = require('restler'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    iz = require('iz'),
    ObjectID = require('mongodb').ObjectID,
    passportLocalMongoose = require('passport-local-mongoose'),

    accountRoute = require("./routes/account"),
    userRoute = require("./routes/user"),
    utilRoute = require("./routes/util");
    brewingRoute = require("./routes/brewing");

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
        var UserModel = userRoute.UserModel;
        var auth = accountRoute.auth;
        var isAuthorized = accountRoute.isAuthorized;


        //************************************************************
        var connectionString = require('./models/conn');
        mongoose.connect(connectionString);

        accountRoute.CreateAdmUser();




        //************************************************************
        // ACCOUNT
        app.get('/loggedtest', accountRoute.loggedtest);
        app.post('/login', accountRoute.login);
        app.post('/logout', accountRoute.logout);



        io.on('connection', function (socket) {
            brewingRoute.updateBrewing(socket);
        });

        app.post('/new-brewing', auth, function (req, res) { brewingRoute.newBrewing(req, res, io); });
        app.post('/finish-brewing', auth, function (req, res) { brewingRoute.finishBrewing(req, res, io); });

        app.post('/fillhlt', auth, function (req, res) { brewingRoute.fillHLT(req, res, io); });
        app.post('/stopfillhlt', auth, function (req, res) { brewingRoute.stopFillHLT(req, res, io); });
        app.post('/hltfull', auth, function (req, res) { brewingRoute.HLTFull(req, res, io); });
        app.post('/starthlt/:temperature', auth, function (req, res) { brewingRoute.startHLT(req, res, io); });
        app.post('/stophlt', auth, function (req, res) { brewingRoute.stopHLT(req, res, io); });

        app.post('/fillherms', auth, function (req, res) { brewingRoute.fillHerms(req, res, io); });
        app.post('/stopfillherms', auth, function (req, res) { brewingRoute.stopFillHerms(req, res, io); });
        app.post('/hermsfull', auth, function (req, res) { brewingRoute.HermsFull(req, res, io); });
        app.post('/startherms/:temperature', auth, function (req, res) { brewingRoute.startHerms(req, res, io); });
        app.post('/stopherms', auth, function (req, res) { brewingRoute.stopHerms(req, res, io); });

        app.post('/fillmlt', auth, function (req, res) { brewingRoute.fillMLT(req, res, io); });
        app.post('/stopfillmlt', auth, function (req, res) { brewingRoute.stopFillMLT(req, res, io); });
        app.post('/mltfull', auth, function (req, res) { brewingRoute.MLTFull(req, res, io); });

        app.post('/fillfermenter', auth, function (req, res) { brewingRoute.fillFermenter(req, res, io); });
        app.post('/stopfillfermenter', auth, function (req, res) { brewingRoute.stopFillFermenter(req, res, io); });
        app.post('/fermenterfull', auth, function (req, res) { brewingRoute.FermenterFull(req, res, io); });

        app.post('/fillsparge', auth, function (req, res) { brewingRoute.fillSparge(req, res, io); });
        app.post('/stopfillsparge', auth, function (req, res) { brewingRoute.stopFillSparge(req, res, io); });
        app.post('/spargefull', auth, function (req, res) { brewingRoute.SpargeFull(req, res, io); });

        app.post('/fillbol', auth, function (req, res) { brewingRoute.fillBOL(req, res, io); });
        app.post('/stopfillbol', auth, function (req, res) { brewingRoute.stopFillBOL(req, res, io); });
        app.post('/bolfull', auth, function (req, res) { brewingRoute.BOLFull(req, res, io); });
        app.post('/startbol/:temperature/:time', auth, function (req, res) { brewingRoute.startBOL(req, res, io); });
        app.post('/stopbol', auth, function (req, res) { brewingRoute.stopBOL(req, res, io); });

        app.post('/startwhirlpool/:time', auth, function (req, res) { brewingRoute.startWhirlpool(req, res, io); });
        app.post('/stopwhirlpool', auth, function (req, res) { brewingRoute.stopWhirlpool(req, res, io); });

        app.post('/startcooling/:temperature', auth, function (req, res) { brewingRoute.startCooling(req, res, io); });
        app.post('/stopcooling', auth, function (req, res) { brewingRoute.stopCooling(req, res, io); });

        app.post('/startstep/:temperature/:time', auth, function (req, res) { brewingRoute.startStep(req, res, io); });
        app.post('/stopstep', auth, function (req, res) { brewingRoute.finishStep(req, res, io); });


// Launch server
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });