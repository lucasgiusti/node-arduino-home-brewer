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
    brewingRoute = require("./routes/Brassagem");

// Config
        app.set('port', process.env.PORT || 3000);
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(session({ secret: 'nodeclinicakey', resave: true, saveUninitialized: true }));
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
        app.get('/account/:username', auth, accountRoute.findByUserName);
        app.put('/account/:id', auth, accountRoute.putAccount);
        app.get('/loggedtest', accountRoute.loggedtest);
        app.post('/login', accountRoute.login);
        app.get('/logout', accountRoute.logout);




        app.get('/', function (req, res) {
            res.sendfile('index.html');
        });

        io.on('connection', function (socket) {
            brewingRoute.updateBrewing(socket);
        });

        app.post('/new-brewing', function (req, res) { brewingRoute.newBrewing(req, res, io); });
        app.post('/finish-brewing', function (req, res) { brewingRoute.finishBrewing(req, res, io); });

        app.post('/fillhlt', function (req, res) { brewingRoute.fillHLT(req, res, io); });
        app.post('/stopfillhlt', function (req, res) { brewingRoute.stopFillHLT(req, res, io); });
        app.post('/hltfull', function (req, res) { brewingRoute.HLTFull(req, res, io); });
        app.post('/heathlt/:temperature', function (req, res) { brewingRoute.heatHLT(req, res, io); });
        app.post('/stopheathlt', function (req, res) { brewingRoute.stopHeatHLT(req, res, io); });

        app.post('/fillherms', function (req, res) { brewingRoute.fillHerms(req, res, io); });
        app.post('/stopfillherms', function (req, res) { brewingRoute.stopFillHerms(req, res, io); });
        app.post('/hermsfull', function (req, res) { brewingRoute.HermsFull(req, res, io); });
        app.post('/heatherms/:temperature', function (req, res) { brewingRoute.heatHerms(req, res, io); });
        app.post('/stopheatherms', function (req, res) { brewingRoute.stopHeatHerms(req, res, io); });

        app.post('/fillmlt', function (req, res) { brewingRoute.fillMLT(req, res, io); });
        app.post('/stopfillmlt', function (req, res) { brewingRoute.stopFillMLT(req, res, io); });
        app.post('/mltfull', function (req, res) { brewingRoute.MLTFull(req, res, io); });

        app.post('/fillfermenter', function (req, res) { brewingRoute.fillFermenter(req, res, io); });
        app.post('/stopfillfermenter', function (req, res) { brewingRoute.stopFillFermenter(req, res, io); });
        app.post('/fermenterfull', function (req, res) { brewingRoute.FermenterFull(req, res, io); });

        app.post('/fillsparge', function (req, res) { brewingRoute.fillSparge(req, res, io); });
        app.post('/stopfillsparge', function (req, res) { brewingRoute.stopFillSparge(req, res, io); });
        app.post('/spargefull', function (req, res) { brewingRoute.SpargeFull(req, res, io); });

        app.post('/fillbol', function (req, res) { brewingRoute.fillBOL(req, res, io); });
        app.post('/stopfillbol', function (req, res) { brewingRoute.stopFillBOL(req, res, io); });
        app.post('/bolfull', function (req, res) { brewingRoute.BOLFull(req, res, io); });
        app.post('/heatbol/:temperature/:time', function (req, res) { brewingRoute.startBOL(req, res, io); });
        app.post('/stopheatbol', function (req, res) { brewingRoute.stopBOL(req, res, io); });

        app.post('/heatwhirlpool/:time', function (req, res) { brewingRoute.startWhirlpool(req, res, io); });
        app.post('/stopheatwhirlpool', function (req, res) { brewingRoute.stopWhirlpool(req, res, io); });

        app.post('/heatcooling/:temperature', function (req, res) { brewingRoute.startCooling(req, res, io); });
        app.post('/stopheatcooling', function (req, res) { brewingRoute.stopCooling(req, res, io); });

        app.post('/heatstep/:temperature/:time', function (req, res) { brewingRoute.startStep(req, res, io); });
        app.post('/stopheatstep', function (req, res) { brewingRoute.finishStep(req, res, io); });


// Launch server
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });