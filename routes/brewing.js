
//************************************************************
var
    path = require("path"),
    mime = require('mime'),
    http = require('http'),
    express = require("express"),
    fs = require('fs'),
    mongoose = require('mongoose'),
    iz = require('iz'),
    ObjectID = require('mongodb').ObjectID,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose');
    utilRoute = require("./util");
//************************************************************


//************************************************************
var Schema = mongoose.Schema;

// Brewing Model
var Brewing = new Schema({
    BrewingCreated: { type: Boolean, required: true, Default: true },
    BrewingFinished: { type: Boolean, required: true, Default: false },

    HLTEmpty: { type: Boolean, required: true, Default: true },
    HLTFilling: { type: Boolean, required: true, Default: false },
    HLTFull: { type: Boolean, required: true, Default: false },
    HLTHeating: { type: Boolean, required: true, Default: false },
    HLTHeatingTemperature: { type: String, required: false, Default: '' },
    HLTTemperatureActual: { type: String, required: false, Default: '' },
    HLTLog: { type: String, required: false, Default: '' },

    HermsEmpty: { type: Boolean, required: true, Default: true },
    HermsFilling: { type: Boolean, required: true, Default: false },
    HermsFull: { type: Boolean, required: true, Default: false },
    HermsHeating: { type: Boolean, required: true, Default: false },
    HermsHeatingTemperature: { type: String, required: false, Default: '' },
    HermsTemperatureActual: { type: String, required: false, Default: '' },
    HermsLog: { type: String, required: false, Default: '' },

    MLTEmpty: { type: Boolean, required: true, Default: true },
    MLTFilling: { type: Boolean, required: true, Default: false },
    MLTFull: { type: Boolean, required: true, Default: false },
    MLTLog: { type: String, required: false, Default: '' },

    BOLEmpty: { type: Boolean, required: true, Default: true },
    BOLFilling: { type: Boolean, required: true, Default: false },
    BOLFull: { type: Boolean, required: true, Default: false },
    BOLHeating: { type: Boolean, required: true, Default: false },
    BOLHeatingTemperature: { type: String, required: false, Default: '' },
    BOLHeatingTime: { type: String, required: false, Default: '' },
    BOLHeatingTimeEnd: { type: String, required: false, Default: '' },
    BOLHeatFinished: { type: Boolean, required: true, Default: false },
    BOLTemperatureActual: { type: String, required: false, Default: '' },
    BOLLog: { type: String, required: false, Default: '' },

    CoolingExecuting: { type: Boolean, required: true, Default: false },
    CoolingExecutingTemperature: { type: String, required: false, Default: '' },
    CoolingExecutingTemperatureFinished: { type: Boolean, required: true, Default: false },
    CoolingTemperatureActual: { type: String, required: false, Default: '' },
    CoolingLog: { type: String, required: false, Default: '' },

    WhirlpoolExecuting: { type: Boolean, required: true, Default: false },
    WhirlpoolExecutingTime: { type: String, required: false, Default: '' },
    WhirlpoolExecutingTimeEnd: { type: String, required: false, Default: '' },
    WhirlpoolExecutingTimeFinished: { type: String, required: false, Default: '' },
    WhirlpoolLog: { type: String, required: false, Default: '' },

    SpargeEmpty: { type: Boolean, required: true, Default: true },
    SpargeExecuting: { type: Boolean, required: true, Default: false },
    SpargeFinished: { type: Boolean, required: true, Default: false },
    SpargeLog: { type: String, required: false, Default: '' },

    StepExecuting: { type: Boolean, required: true, Default: false },
    StepExecutingNumber: { type: String, required: false, Default: '' },
    StepExecutingTemperature: { type: String, required: false, Default: '' },
    StepExecutingTime: { type: String, required: false, Default: '' },
    StepExecutingTimeFinished: { type: Boolean, required: true, Default: false },
    StepExecutingTimeEnd: { type: String, required: false, Default: '' },
    StepTemperatureActual: { type: String, required: false, Default: '' },
    StepFinished: { type: Boolean, required: true, Default: false },
    StepLog: { type: String, required: false, Default: '' },

    FermenterEmpty: { type: Boolean, required: true, Default: true },
    FermenterFilling: { type: Boolean, required: true, Default: false },
    FermenterFull: { type: Boolean, required: true, Default: false },
    FermenterLog: { type: String, required: false, Default: '' },

    ArduinoComunicationOk: { type: Boolean, required: true, befault: true },
    ArduinoComunicationErrorMessage: { type: String, required: false, Default: '' },

    DateCreated: { type: Date, required: true },
    DateFinished: { type: Date, required: false }
});

var BrewingModel = mongoose.model('brewing', Brewing);


var updateBrewing = function (socket) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
                socket.emit('updateBrewing', brewing);
        }
        else {
            console.log(err);
        }
    });
};

var newBrewing = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    BrewingModel = new BrewingModel(
        {
            BrewingCreated: true,
            BrewingFinished: false,
            HLTEmpty: true,
            HLTFilling: false,
            HLTFull: false,
            HLTHeating: false,
            HLTHeatingTemperature: null,
            HLTTemperatureActual: null,
            HLTLog: '',
            HermsEmpty: true,
            HermsFilling: false,
            HermsFull: false,
            HermsHeating: false,
            HermsHeatingTemperature: null,
            HermsTemperatureActual: null,
            HermsLog: '',
            MLTEmpty: true,
            MLTFilling: false,
            MLTFull: false,
            MLTLog: '',
            BOLEmpty: true,
            BOLFilling: false,
            BOLFull: false,
            BOLHeating: false,
            BOLHeatingTemperature: null,
            BOLHeatingTime: null,
            BOLHeatingTimeEnd: null,
            BOLHeatFinished: false,
            BOLTemperatureActual: null,
            BOLLog: '',
            CoolingExecuting: false,
            CoolingExecutingTemperature: null,
            CoolingExecutingTemperatureFinished: false,
            CoolingTemperatureActual: null,
            CoolingLog: '',
            WhirlpoolExecuting: false,
            WhirlpoolExecutingTime: null,
            WhirlpoolExecutingTimeEnd: null,
            WhirlpoolExecutingTimeFinished: null,
            WhirlpoolLog: '',
            SpargeEmpty: true,
            SpargeExecuting: false,
            SpargeFinished: false,
            SpargeLog: '',
            StepExecuting: false,
            StepExecutingNumber: null,
            StepExecutingTemperature: null,
            StepExecutingTime: null,
            StepExecutingTimeFinished: false,
            StepExecutingTimeEnd: null,
            StepTemperatureActual: null,
            StepFinished: false,
            StepLog: '',
            FermenterEmpty: true,
            FermenterFilling: false,
            FermenterFull: false,
            FermenterLog: '',
            ArduinoComunicationOk: true,
            ArduinoComunicationErrorMessage: null,
            DateCreated: new Date()
        }


        );
    BrewingModel.save(function (err, brewing, result) {
        if (!err) {
            updateBrewing(io); 
            res.send();
        } else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var finishBrewing = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);

    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                    brewing.BrewingFinished = true;
                    brewing.DateFinished = new Date();
                    brewing.save(function (err) {
                        if (!err) {
                            updateBrewing(io);
                            res.send();
                        }
                        else {
                            res.status('500').send({ status: 500, error: err.message });
                        }
                    });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillHLT = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);

    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HLTEmpty = false;
                brewing.HLTFilling = true;
                brewing.HLTLog += '\n' + utilRoute.getTime() + ' - start fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillHLT = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HLTFilling = false;
                brewing.HLTFull = true;
                brewing.HLTLog += '\n' + utilRoute.getTime() + ' - stop fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var HLTFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HLTEmpty = false;
                brewing.HLTFilling = false;
                brewing.HLTFull = true;
                brewing.HLTLog += '\n' + utilRoute.getTime() + ' - finished fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var startHLT = function (req, res, io) {
    var temperature = req.params.temperature;
    if (!temperature && temperature == '') {
        temperature = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.HLTEmpty) {
                    res.status('500').send({ status: 500, error: 'HLT is empty' });
                }
                else if (brewing.HLTFilling) {
                    res.status('500').send({ status: 500, error: 'HLT is filling' });
                }
                else {
                    brewing.HLTHeating = true;
                    brewing.HLTHeatingTemperature = temperature;
                    brewing.HLTLog += '\n' +    utilRoute.getTime() + ' - start heat ' + temperature + 'ºC';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopHLT = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HLTHeating = false;
                brewing.HLTLog += '\n' + utilRoute.getTime() + ' - stop heat';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillHerms = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HermsEmpty = false;
                brewing.HermsFilling = true;
                brewing.HermsLog += '\n' + utilRoute.getTime() + ' - start fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillHerms = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HermsFilling = false;
                brewing.HermsFull = true;
                brewing.HermsLog += '\n' + utilRoute.getTime() + ' - stop fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var HermsFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HermsEmpty = false;
                brewing.HermsFilling = false;
                brewing.HermsFull = true;
                brewing.HermsLog += '\n' + utilRoute.getTime() + ' - finished fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var startHerms = function (req, res, io) {
    var temperature = req.params.temperature;
    if (!temperature && temperature == '') {
        temperature = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.HermsEmpty) {
                    res.status('500').send({ status: 500, error: 'Herms is empty' });
                }
                else if (brewing.HermsFilling) {
                    res.status('500').send({ status: 500, error: 'Herms is filling' });
                }
                else {
                    brewing.HermsHeating = true;
                    brewing.HermsHeatingTemperature = temperature;
                    brewing.HermsLog += '\n' + utilRoute.getTime() + ' - start heat ' + temperature + 'ºC';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopHerms = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.HermsHeating = false;
                brewing.HermsLog += '\n' + utilRoute.getTime() + ' - stop heat';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillMLT = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.HLTEmpty) {
                    res.status('500').send({ status: 500, error: 'HLT is empty' });
                }
                else if (brewing.HLTFilling) {
                    res.status('500').send({ status: 500, error: 'HLT is filling' });
                }
                else {
                    brewing.MLTEmpty = false;
                    brewing.MLTFilling = true;
                    brewing.MLTLog += '\n' + utilRoute.getTime() + ' - start fill';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillMLT = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.MLTFilling = false;
                brewing.MLTFull = true;
                brewing.MLTLog += '\n' + utilRoute.getTime() + ' - stop fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var MLTFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.MLTEmpty = false;
                brewing.MLTFilling = false;
                brewing.MLTFull = true;
                brewing.MLTLog += '\n' + utilRoute.getTime() + ' - finished fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillFermenter = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.BOLEmpty) {
                    res.status('500').send({ status: 500, error: 'BOL is empty' });
                }
                else if (brewing.BOLFilling) {
                    res.status('500').send({ status: 500, error: 'BOL is filling' });
                }
                else if (brewing.BOLHeating) {
                    res.status('500').send({ status: 500, error: 'BOL is heating' });
                }
                else if (brewing.WhirlpoolExecuting) {
                    res.status('500').send({ status: 500, error: 'Whirlpool is executing' });
                }
                else if (brewing.CoolingExecuting) {
                    res.status('500').send({ status: 500, error: 'Cooling is executing' });
                }
                else {
                    brewing.FermenterEmpty = false;
                    brewing.FermenterFilling = true;
                    brewing.FermenterLog += '\n' + utilRoute.getTime() + ' - start fill';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillFermenter = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.FermenterFilling = false;
                brewing.FermenterFull = true;
                brewing.FermenterLog += '\n' + utilRoute.getTime() + ' - stop fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var FermenterFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.FermenterEmpty = false;
                brewing.FermenterFilling = false;
                brewing.FermenterFull = true;
                brewing.FermenterLog += '\n' + utilRoute.getTime() + ' - finished fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillSparge = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.HLTEmpty) {
                    res.status('500').send({ status: 500, error: 'HLT is empty' });
                }
                else if (brewing.HLTFilling) {
                    res.status('500').send({ status: 500, error: 'HLT is filling' });
                }
                else if (brewing.StepExecuting) {
                    res.status('500').send({ status: 500, error: 'Step is executing' });
                }
                else {
                    brewing.SpargeEmpty = false;
                    brewing.SpargeExecuting = true;
                    brewing.SpargeLog += '\n' + utilRoute.getTime() + ' - start sparge';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillSparge = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.SpargeExecuting = false;
                brewing.SpargeFinished = true;
                brewing.SpargeLog += '\n' + utilRoute.getTime() + ' - finished sparge';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var SpargeFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.SpargeEmpty = false;
                brewing.SpargeExecuting = false;
                brewing.SpargeFinished = true;
                brewing.SpargeLog += '\n' + utilRoute.getTime() + ' - finished sparge';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var fillBOL = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.MLTEmpty) {
                    res.status('500').send({ status: 500, error: 'MLT is empty' });
                }
                else if (brewing.MLTFilling) {
                    res.status('500').send({ status: 500, error: 'MLT is filling' });
                }
                else if (brewing.StepExecuting) {
                    res.status('500').send({ status: 500, error: 'Step is executing' });
                }
                else {
                    brewing.BOLEmpty = false;
                    brewing.BOLFilling = true;
                    brewing.BOLLog += '\n' + utilRoute.getTime() + ' - start fill';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopFillBOL = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.BOLFilling = false;
                brewing.BOLFull = true;
                brewing.BOLLog += '\n' + utilRoute.getTime() + ' - stop fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var BOLFull = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.BOLEmpty = false;
                brewing.BOLFilling = false;
                brewing.BOLFull = true;
                brewing.BOLLog += '\n' + utilRoute.getTime() + ' - finished fill';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var timerTimeBOL = null;

var updateTimeBOL = function(io){
 BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if(brewing.BOLHeating == false){
                    clearInterval(timerTimeBOL);
                }
                if (brewing.BOLHeatingTimeEnd == "1") {
                    brewing.BOLHeating = false;
                    brewing.BOLHeatingTimeEnd = "0";
                    brewing.BOLHeatingTimeFinished = false;
                    brewing.BOLLog += '\n' + utilRoute.getTime() + ' - stop heat';
                    clearInterval(timerTimeBOL);
                }
                else{
                    brewing.BOLHeatingTimeEnd = parseInt(brewing.BOLHeatingTimeEnd)-1;
                }

                    brewing.save(function () {
                        updateBrewing(io);
                    });
            }
            else {
                clearInterval(timerTimeBOL);
            }
        }
        else {
            clearInterval(timerTimeBOL);
        }
    });
}

var startBOL = function (req, res, io) {
    if(timerTimeBOL){
        clearInterval(timerTimeBOL);
    }

    var temperature = req.params.temperature;
    if (!temperature && temperature == '') {
        temperature = "0";
    }
    var time = req.params.time;
    if (!time && time == '') {
        time = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.BOLEmpty) {
                    res.status('500').send({ status: 500, error: 'BOL is empty' });
                }
                else if (brewing.BOLFilling) {
                    res.status('500').send({ status: 500, error: 'BOL is filling' });
                }
                else {
                    brewing.BOLHeating = true;
                    brewing.BOLHeatingTemperature = temperature;
                    brewing.BOLHeatingTime = time;
                    brewing.BOLHeatingTimeEnd = time;
                    brewing.BOLLog += '\n' + utilRoute.getTime() + ' - start heat ' + temperature + 'ºC ' + time + 'M';
                    brewing.save(function () {
                        updateBrewing(io);
                        timerTimeBOL = setInterval(function(){updateTimeBOL(io);},60*1000);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopBOL = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.BOLHeating = false;
                brewing.BOLLog += '\n' + utilRoute.getTime() + ' - stop heat';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var timerTimeStep = null;

var updateTimeStep = function(io){
 BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if(brewing.StepExecuting == false){
                    clearInterval(timerTimeStep);
                }
                if (brewing.StepExecutingTimeEnd == "1") {
                    brewing.StepExecuting = false;
                    brewing.StepExecutingTimeEnd = "0";
                    brewing.StepFinished
                    brewing.StepLog += '\n' + utilRoute.getTime() + ' - step ' + brewing.StepExecutingNumber + ' finished';
                    clearInterval(timerTimeStep);
                }
                else{
                   brewing.StepExecutingTimeEnd = parseInt(brewing.StepExecutingTimeEnd)-1;
                }

                    brewing.save(function () {
                        updateBrewing(io);
                    });
            }
            else {
                clearInterval(timerTimeStep);
            }
        }
        else {
            clearInterval(timerTimeStep);
        }
    });
}

var startStep = function (req, res, io) {
    if(timerTimeStep){
        clearInterval(timerTimeStep);
    }

    var temperature = req.params.temperature;
    if (!temperature && temperature == '') {
        temperature = "0";
    }
    var time = req.params.time;
    if (!time && time == '') {
        time = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.MLTEmpty) {
                    res.status('500').send({ status: 500, error: 'MLT is empty' });
                }
                else if (brewing.MLTFilling) {
                    res.status('500').send({ status: 500, error: 'MLT is filling' });
                }
                else if (brewing.HermsEmpty) {
                    res.status('500').send({ status: 500, error: 'Herms is empty' });
                }
                else if (brewing.HermsFilling) {
                    res.status('500').send({ status: 500, error: 'Herms is filling' });
                }
                else if (brewing.HermsHeating) {
                    res.status('500').send({ status: 500, error: 'Herms is heating' });
                }
                else {
                    brewing.StepExecuting = true;
                    brewing.StepExecutingTemperature = temperature;
                    brewing.StepExecutingTime = time;
                    brewing.StepExecutingTimeEnd = time;

                    if (!brewing.StepExecutingNumber) {
                        brewing.StepExecutingNumber = "1";
                    }
                    else {
                        brewing.StepExecutingNumber = parseInt(brewing.StepExecutingNumber) + 1;
                    }

                    brewing.StepLog += '\n' + utilRoute.getTime() + ' - step ' + brewing.StepExecutingNumber + " " + temperature + 'ºC ' + time + 'M';
                    brewing.save(function () {
                        updateBrewing(io);
                        timerTimeStep = setInterval(function(){updateTimeStep(io);},60*1000);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var finishStep = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.StepExecuting = false;
                brewing.StepFinished = true;
                brewing.StepLog += '\n' + utilRoute.getTime() + ' - step ' + brewing.StepExecutingNumber + ' finished';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var startCooling = function (req, res, io) {
    var temperature = req.params.temperature;
    if (!temperature && temperature == '') {
        temperature = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.BOLEmpty) {
                    res.status('500').send({ status: 500, error: 'BOL is empty' });
                }
                else if (brewing.BOLFilling) {
                    res.status('500').send({ status: 500, error: 'BOL is filling' });
                }
                else if (brewing.BOLHeating) {
                    res.status('500').send({ status: 500, error: 'BOL is heating' });
                }
                else {
                    brewing.CoolingExecuting = true;
                    brewing.CoolingExecutingTemperature = temperature;
                    brewing.CoolingLog += '\n' + utilRoute.getTime() + ' - start cooling ' + temperature + 'ºC';
                    brewing.save(function () {
                        updateBrewing(io);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopCooling = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.CoolingExecuting = false;
                brewing.CoolingLog += '\n' + utilRoute.getTime() + ' - stop cooling';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var timerTimeWhirlpool = null;

var updateTimeWhirlpool = function(io){
 BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if(brewing.WhirlpoolExecuting == false){
                    clearInterval(timerTimeWhirlpool);
                }
                if (brewing.WhirlpoolExecutingTimeEnd == "1") {
                    brewing.WhirlpoolExecuting = false;
                    brewing.WhirlpoolExecutingTimeEnd = "0";
                    brewing.WhirlpoolExecutingTimeFinished = false;
                    brewing.WhirlpoolLog += '\n' + utilRoute.getTime() + ' - stop whirlpool';
                    clearInterval(timerTimeWhirlpool);
                }
                else{
                    brewing.WhirlpoolExecutingTimeEnd = parseInt(brewing.WhirlpoolExecutingTimeEnd)-1;
                }

                    brewing.save(function () {
                        updateBrewing(io);
                    });
            }
            else {
                clearInterval(timerTimeWhirlpool);
            }
        }
        else {
            clearInterval(timerTimeWhirlpool);
        }
    });
}

var startWhirlpool = function (req, res, io) {
    if(timerTimeWhirlpool){
        clearInterval(timerTimeWhirlpool);
    }

    var time = req.params.time;
    if (!time && time == '') {
        time = "0";
    }
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                if (brewing.BOLEmpty) {
                    res.status('500').send({ status: 500, error: 'BOL is empty' });
                }
                else if (brewing.BOLFilling) {
                    res.status('500').send({ status: 500, error: 'BOL is filling' });
                }
                else {
                    brewing.WhirlpoolExecuting = true;
                    brewing.WhirlpoolExecutingTime = time;
                    brewing.WhirlpoolExecutingTimeEnd = time;
                    brewing.WhirlpoolLog += '\n' + utilRoute.getTime() + ' - start whirlpool ' + time + 'M';
                    brewing.save(function () {
                        updateBrewing(io);
                        timerTimeWhirlpool = setInterval(function(){updateTimeWhirlpool(io);},60*1000);
                        res.send();
                    });
                }
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var stopWhirlpool = function (req, res, io) {
    BrewingModel = mongoose.model('brewing', Brewing);
    return BrewingModel.findOne({ 'BrewingFinished': false }, function (err, brewing) {
        if (!err) {
            if (brewing) {
                brewing.WhirlpoolExecuting = false;
                brewing.WhirlpoolLog += '\n' + utilRoute.getTime() + ' - stop whirlpool';
                brewing.save(function (err) {
                    if (!err) {
                        updateBrewing(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                updateBrewing(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

module.exports.BrewingModel = BrewingModel;
module.exports.updateBrewing = updateBrewing;
module.exports.newBrewing = newBrewing;
module.exports.finishBrewing = finishBrewing;

module.exports.fillHLT = fillHLT;
module.exports.stopFillHLT = stopFillHLT;
module.exports.HLTFull = HLTFull;
module.exports.startHLT = startHLT;
module.exports.stopHLT = stopHLT;

module.exports.fillHerms = fillHerms;
module.exports.stopFillHerms = stopFillHerms;
module.exports.HermsFull = HermsFull;
module.exports.startHerms = startHerms;
module.exports.stopHerms = stopHerms;

module.exports.fillMLT = fillMLT;
module.exports.stopFillMLT = stopFillMLT;
module.exports.MLTFull = MLTFull;

module.exports.fillFermenter = fillFermenter;
module.exports.stopFillFermenter = stopFillFermenter;
module.exports.FermenterFull = FermenterFull;

module.exports.fillSparge = fillSparge;
module.exports.stopFillSparge = stopFillSparge;
module.exports.SpargeFull = SpargeFull;

module.exports.fillBOL = fillBOL;
module.exports.stopFillBOL = stopFillBOL;
module.exports.BOLFull = BOLFull;
module.exports.startBOL = startBOL;
module.exports.stopBOL = stopBOL;

module.exports.startStep = startStep;
module.exports.finishStep = finishStep;

module.exports.startCooling = startCooling;
module.exports.stopCooling = stopCooling;

module.exports.startWhirlpool = startWhirlpool;
module.exports.stopWhirlpool = stopWhirlpool;