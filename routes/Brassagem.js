﻿
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
//************************************************************


//************************************************************
var Schema = mongoose.Schema;

// Brassagem Model
var Brassagem = new Schema({
    BrassagemCriada: { type: Boolean, required: true, Default: true },
    BrassagemFinalizada: { type: Boolean, required: true, Default: false },

    HLTVazio: { type: Boolean, required: true, Default: true },
    HLTEnchendo: { type: Boolean, required: true, Default: false },
    HLTCheio: { type: Boolean, required: true, Default: false },
    HLTAquecendo: { type: Boolean, required: true, Default: false },
    HLTAquecendoTemperatura: { type: String, required: false, Default: '' },
    HLTTemperaturaAtual: { type: String, required: false, Default: '' },

    HermsVazio: { type: Boolean, required: true, Default: true },
    HermsEnchendo: { type: Boolean, required: true, Default: false },
    HermsCheio: { type: Boolean, required: true, Default: false },
    HermsAquecendo: { type: Boolean, required: true, Default: false },
    HermsAquecendoTemperatura: { type: String, required: false, Default: '' },
    HermsTemperaturaAtual: { type: String, required: false, Default: '' },

    MashVazio: { type: Boolean, required: true, Default: true },
    MashEnchendo: { type: Boolean, required: true, Default: false },
    MashCheio: { type: Boolean, required: true, Default: false },

    BOLVazio: { type: Boolean, required: true, Default: true },
    BOLEnchendo: { type: Boolean, required: true, Default: false },
    BOLCheio: { type: Boolean, required: true, Default: false },
    BOLFervendo: { type: Boolean, required: true, Default: false },
    BOLFervendoTemperatura: { type: String, required: false, Default: '' },
    BOLFervendoMinuto: { type: String, required: false, Default: '' },
    BOLFervendoMinutoRestante: { type: String, required: false, Default: '' },
    BOLFervuraFinalizada: { type: Boolean, required: true, Default: false },
    BOLTemperaturaAtual: { type: String, required: false, Default: '' },

    ResfriarRodando: { type: Boolean, required: true, Default: false },
    ResfriarRodandoTemperatura: { type: String, required: false, Default: '' },
    ResfriarRodandoTemperaturaAtingida: { type: Boolean, required: true, Default: false },
    ResfriarTemperaturaAtual: { type: String, required: false, Default: '' },

    WhirlpoolRodando: { type: Boolean, required: true, Default: false },
    WhirlpoolRodandoMinuto: { type: String, required: false, Default: '' },
    WhirlpoolRodandoMinutoRestante: { type: String, required: false, Default: '' },
    WhirlpoolRodandoMinutoAtingido: { type: String, required: false, Default: '' },

    SpargeVazio: { type: Boolean, required: true, Default: true },
    SpargeRodando: { type: Boolean, required: true, Default: false },
    SpargeFinalizado: { type: Boolean, required: true, Default: false },

    RampaRodando: { type: Boolean, required: true, Default: false },
    RampaRodandoNumero: { type: String, required: false, Default: '' },
    RampaRodandoTemperatura: { type: String, required: false, Default: '' },
    RampaRodandoMinuto: { type: String, required: false, Default: '' },
    RampaRodandoMinutoAtingido: { type: Boolean, required: true, Default: false },
    RampaRodandoMinutoRestante: { type: String, required: false, Default: '' },
    RampaTemperaturaAtual: { type: String, required: false, Default: '' },
    RampaFinalizada: { type: Boolean, required: true, Default: false },

    FermentadorVazio: { type: Boolean, required: true, Default: true },
    FermentadorEnchendo: { type: Boolean, required: true, Default: false },
    FermentadorCheio: { type: Boolean, required: true, Default: false },

    ComunicacaoComArduinoOk: { type: Boolean, required: true, Default: true },
    ComunicacaoComArduinoErroMensagem: { type: String, required: false, Default: '' },

    dataInclusao: { type: Date, required: true },
    dataFinalizacao: { type: Date, required: false }
});

var BrassagemModel = mongoose.model('brassagens', Brassagem);


var atualizaBrassagem = function (socket) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
                socket.emit('atualizaBrassagem', brassagem);
        }
        else {
            console.log(err);
        }
    });
};

var novaBrassagem = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    BrassagemModel = new BrassagemModel(
        {
            BrassagemCriada: true,
            BrassagemFinalizada: false,
            HLTVazio: true,
            HLTEnchendo: false,
            HLTCheio: false,
            HLTAquecendo: false,
            HLTAquecendoTemperatura: null,
            HLTTemperaturaAtual: null,
            HermsVazio: true,
            HermsEnchendo: false,
            HermsCheio: false,
            HermsAquecendo: false,
            HermsAquecendoTemperatura: null,
            HermsTemperaturaAtual: null,
            MashVazio: true,
            MashEnchendo: false,
            MashCheio: false,
            BOLVazio: true,
            BOLEnchendo: false,
            BOLCheio: false,
            BOLFervendo: false,
            BOLFervendoTemperatura: null,
            BOLFervendoMinuto: null,
            BOLFervendoMinutoRestante: null,
            BOLFervuraFinalizada: false,
            BOLTemperaturaAtual: null,
            ResfriarRodando: false,
            ResfriarRodandoTemperatura: null,
            ResfriarRodandoTemperaturaAtingida: false,
            ResfriarTemperaturaAtual: null,
            WhirlpoolRodando: false,
            WhirlpoolRodandoMinuto: null,
            WhirlpoolRodandoMinutoRestante: null,
            WhirlpoolRodandoMinutoAtingido: null,
            SpargeVazio: true,
            SpargeRodando: false,
            SpargeFinalizado: false,
            RampaRodando: false,
            RampaRodandoNumero: null,
            RampaRodandoTemperatura: null,
            RampaRodandoMinuto: null,
            RampaRodandoMinutoAtingido: false,
            RampaRodandoMinutoRestante: null,
            RampaTemperaturaAtual: null,
            RampaFinalizada: false,
            FermentadorVazio: true,
            FermentadorEnchendo: false,
            FermentadorCheio: false,
            ComunicacaoComArduinoOk: true,
            ComunicacaoComArduinoErroMensagem: null,
            dataInclusao: new Date()
        }


        );
    BrassagemModel.save(function (err, brassagem, result) {
        if (!err) {
            atualizaBrassagem(io); 
            res.send();
        } else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var finalizaBrassagem = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);

    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                    brassagem.BrassagemFinalizada = true;
                    brassagem.dataFinalizacao = new Date();
                    brassagem.save(function (err) {
                        if (!err) {
                            atualizaBrassagem(io);
                            res.send();
                        }
                        else {
                            res.status('500').send({ status: 500, error: err.message });
                        }
                    });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheHLT = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);

    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HLTVazio = false;
                brassagem.HLTEnchendo = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoHLT = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HLTEnchendo = false;
                brassagem.HLTCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var HLTCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HLTVazio = false;
                brassagem.HLTEnchendo = false;
                brassagem.HLTCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var aqueceHLT = function (req, res, io) {
    var temperatura = req.params.temperatura;
    if (!temperatura && temperatura == '') {
        temperatura = "0";
    }
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.HLTVazio) {
                    res.status('500').send({ status: 500, error: 'O hlt está vazio' });
                }
                else if (brassagem.HLTEnchendo) {
                    res.status('500').send({ status: 500, error: 'O hlt está enchendo' });
                }
                else {
                    brassagem.HLTAquecendo = true;
                    brassagem.HLTAquecendoTemperatura = temperatura;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraAquecimentoHLT = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HLTAquecendo = false;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheHerms = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HermsVazio = false;
                brassagem.HermsEnchendo = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoHerms = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HermsEnchendo = false;
                brassagem.HermsCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var HermsCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HermsVazio = false;
                brassagem.HermsEnchendo = false;
                brassagem.HermsCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var aqueceHerms = function (req, res, io) {
    var temperatura = req.params.temperatura;
    if (!temperatura && temperatura == '') {
        temperatura = "0";
    }
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.HermsVazio) {
                    res.status('500').send({ status: 500, error: 'O herms está vazio' });
                }
                else if (brassagem.HermsEnchendo) {
                    res.status('500').send({ status: 500, error: 'O herms está enchendo' });
                }
                else {
                    brassagem.HermsAquecendo = true;
                    brassagem.HermsAquecendoTemperatura = temperatura;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraAquecimentoHerms = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.HermsAquecendo = false;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheMash = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.HLTVazio) {
                    res.status('500').send({ status: 500, error: 'O hlt está vazio' });
                }
                else if (brassagem.HLTEnchendo) {
                    res.status('500').send({ status: 500, error: 'O hlt está enchendo' });
                }
                else {
                    brassagem.MashVazio = false;
                    brassagem.MashEnchendo = true;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoMash = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.MashEnchendo = false;
                brassagem.MashCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var MashCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.MashVazio = false;
                brassagem.MashEnchendo = false;
                brassagem.MashCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheFermentador = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.BOLVazio) {
                    res.status('500').send({ status: 500, error: 'O bol está vazio' });
                }
                else if (brassagem.BOLEnchendo) {
                    res.status('500').send({ status: 500, error: 'O bol está enchendo' });
                }
                else {
                    brassagem.FermentadorVazio = false;
                    brassagem.FermentadorEnchendo = true;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoFermentador = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.FermentadorEnchendo = false;
                brassagem.FermentadorCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var FermentadorCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.FermentadorVazio = false;
                brassagem.FermentadorEnchendo = false;
                brassagem.FermentadorCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheSparge = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.HLTVazio) {
                    res.status('500').send({ status: 500, error: 'O hlt está vazio' });
                }
                else if (brassagem.HLTEnchendo) {
                    res.status('500').send({ status: 500, error: 'O hlt está enchendo' });
                }
                else {
                    brassagem.SpargeVazio = false;
                    brassagem.SpargeRodando = true;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoSparge = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.SpargeRodando = false;
                brassagem.SpargeFinalizado = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var SpargeCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.SpargeVazio = false;
                brassagem.SpargeRodando = false;
                brassagem.SpargeFinalizado = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var encheBOL = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.MashVazio) {
                    res.status('500').send({ status: 500, error: 'O mash está vazio' });
                }
                else if (brassagem.MashEnchendo) {
                    res.status('500').send({ status: 500, error: 'O mash está enchendo' });
                }
                else {
                    brassagem.BOLVazio = false;
                    brassagem.BOLEnchendo = true;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraEnchimentoBOL = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.BOLEnchendo = false;
                brassagem.BOLCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var BOLCheio = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.BOLVazio = false;
                brassagem.BOLEnchendo = false;
                brassagem.BOLCheio = true;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var rodaResfriamento = function (req, res, io) {
    var temperatura = req.params.temperatura;
    if (!temperatura && temperatura == '') {
        temperatura = "0";
    }
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.BOLVazio) {
                    res.status('500').send({ status: 500, error: 'O bol está vazio' });
                }
                else if (brassagem.BOLEnchendo) {
                    res.status('500').send({ status: 500, error: 'O bol está enchendo' });
                }
                else {
                    brassagem.ResfriarRodando = true;
                    brassagem.ResfriarRodandoTemperatura = temperatura;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraResfriamento = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.ResfriarRodando = false;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

var rodaWhirlpool = function (req, res, io) {
    var minuto = req.params.minuto;
    if (!minuto && minuto == '') {
        minuto = "0";
    }
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                if (brassagem.BOLVazio) {
                    res.status('500').send({ status: 500, error: 'O bol está vazio' });
                }
                else if (brassagem.BOLEnchendo) {
                    res.status('500').send({ status: 500, error: 'O bol está enchendo' });
                }
                else {
                    brassagem.WhirlpoolRodando = true;
                    brassagem.WhirlpoolRodandoMinuto = minuto;
                    brassagem.save(function () {
                        atualizaBrassagem(io);
                        res.send();
                    });
                }
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};
var paraWhirlpool = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.findOne({ 'BrassagemFinalizada': false }, function (err, brassagem) {
        if (!err) {
            if (brassagem) {
                brassagem.WhirlpoolRodando = false;
                brassagem.save(function (err) {
                    if (!err) {
                        atualizaBrassagem(io);
                        res.send();
                    }
                    else {
                        res.status('500').send({ status: 500, error: err.message });
                    }
                });
            }
            else {
                atualizaBrassagem(io);
                res.send();
            }
        }
        else {
            res.status('500').send({ status: 500, error: err.message });
        }
    });
};

module.exports.BrassagemModel = BrassagemModel;
module.exports.atualizaBrassagem = atualizaBrassagem;
module.exports.novaBrassagem = novaBrassagem;
module.exports.finalizaBrassagem = finalizaBrassagem;

module.exports.encheHLT = encheHLT;
module.exports.paraEnchimentoHLT = paraEnchimentoHLT;
module.exports.HLTCheio = HLTCheio;
module.exports.aqueceHLT = aqueceHLT;
module.exports.paraAquecimentoHLT = paraAquecimentoHLT;

module.exports.encheHerms = encheHerms;
module.exports.paraEnchimentoHerms = paraEnchimentoHerms;
module.exports.HermsCheio = HermsCheio;
module.exports.aqueceHerms = aqueceHerms;
module.exports.paraAquecimentoHerms = paraAquecimentoHerms;

module.exports.encheMash = encheMash;
module.exports.paraEnchimentoMash = paraEnchimentoMash;
module.exports.MashCheio = MashCheio;

module.exports.encheFermentador = encheFermentador;
module.exports.paraEnchimentoFermentador = paraEnchimentoFermentador;
module.exports.FermentadorCheio = FermentadorCheio;

module.exports.encheSparge = encheSparge;
module.exports.paraEnchimentoSparge = paraEnchimentoSparge;
module.exports.SpargeCheio = SpargeCheio;

module.exports.encheBOL = encheBOL;
module.exports.paraEnchimentoBOL = paraEnchimentoBOL;
module.exports.BOLCheio = BOLCheio;

module.exports.rodaResfriamento = rodaResfriamento;
module.exports.paraResfriamento = paraResfriamento;

module.exports.rodaWhirlpool = rodaWhirlpool;
module.exports.paraWhirlpool = paraWhirlpool;