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
    brassagemRoute = require("./routes/Brassagem");

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
            brassagemRoute.atualizaBrassagem(socket);
        });

        app.post('/nova-brassagem', function (req, res) { brassagemRoute.novaBrassagem(req, res, io); });
        app.post('/finalizar-brassagem', function (req, res) { brassagemRoute.finalizaBrassagem(req, res, io); });


// Launch server
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });