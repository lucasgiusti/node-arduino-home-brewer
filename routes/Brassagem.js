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
        if (err) {
            console.log('Error inserting brassagem: ' + err);
        } else {
            atualizaBrassagem(io);
        }
    });

    res.send();
};

var finalizaBrassagem = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.update({ 'BrassagemFinalizada': false }, { 'BrassagemFinalizada': true, dataFinalizacao: new Date() }, function (err, brassagem) {
        if (!err) {
            atualizaBrassagem(io);
        }
        else {
            console.log(err);
        }
    });
    res.send();
};

var encheHLT = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.update({ 'BrassagemFinalizada': false }, { 'HLTVazio': false, 'HLTEnchendo': true }, function (err, brassagem) {
        if (!err) {
            atualizaBrassagem(io);
        }
        else {
            console.log(err);
        }
    });
    res.send();
};

var encheHerms = function (req, res, io) {
    BrassagemModel = mongoose.model('brassagens', Brassagem);
    return BrassagemModel.update({ 'BrassagemFinalizada': false }, { 'HermsVazio': false, 'HermsEnchendo': true }, function (err, brassagem) {
        if (!err) {
            atualizaBrassagem(io);
        }
        else {
            console.log(err);
        }
    });
    res.send();
};

module.exports.BrassagemModel = BrassagemModel;
module.exports.atualizaBrassagem = atualizaBrassagem;
module.exports.novaBrassagem = novaBrassagem;
module.exports.finalizaBrassagem = finalizaBrassagem;

module.exports.encheHLT = encheHLT;
module.exports.encheHerms = encheHerms;