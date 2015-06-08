var socket = io();
var objBrewing = null;
var telaExibida = 'div-principal';

function ExibeTelaHLT() {
    if (telaExibida == "div-hlt-heat" || telaExibida == "div-hlt-alterar-temperature") {
        return;
    }

    $(".div-hlt").hide();

    if (objBrewing.HLTHeating) {
        $(".hlt-temperature").text("Temp. " + objBrewing.HLTHeatingTemperature + "ºC");
        $(".hlt-temperature-actual").text("Actual. " + objBrewing.HLTTemperatureActual + "ºC");

        $(".div-hlt-heating").show();
        telaExibida = 'div-hlt-heating';
    }
    else if (objBrewing.HLTFilling) {
        $(".div-hlt-filling").show();
        telaExibida = 'div-hlt-filling';
    }
    else if (objBrewing.HLTFull) {
        $(".div-hlt-full").show();
        telaExibida = 'div-hlt-full';
    }
    else {
        $(".div-hlt-empty").show();
        telaExibida = 'div-hlt-empty';
    }
}

function ExibeTelaHerms() {
    if (telaExibida == "div-herms-heat" || telaExibida == "div-herms-alterar-temperature") {
        return;
    }

    $(".div-herms").hide();

    if (objBrewing.HermsHeating) {
        $(".herms-temperature").text("Temp. " + objBrewing.HermsHeatingTemperature + "ºC");
        $(".herms-temperature-actual").text("Actual. " + objBrewing.HermsTemperatureActual + "ºC");

        $(".div-herms-heating").show();
        telaExibida = 'div-herms-heating';
    }
    else if (objBrewing.HermsFilling) {
        $(".div-herms-filling").show();
        telaExibida = 'div-herms-filling';
    }
    else if (objBrewing.HermsFull) {
        $(".div-herms-full").show();
        telaExibida = 'div-herms-full';
    }
    else {
        $(".div-herms-empty").show();
        telaExibida = 'div-herms-empty';
    }

}

function ExibeTelaMLT() {
    $(".div-mlt").hide();

    if (objBrewing.MLTFilling) {
        $(".div-mlt-filling").show();
        telaExibida = 'div-mlt-filling';
    }
    else if (objBrewing.MLTFull) {
        $(".div-mlt-full").show();
        telaExibida = 'div-mlt-full';
    }
    else {
        $(".div-mlt-empty").show();
        telaExibida = 'div-mlt-empty';
    }
}

function ExibeTelaFermenter() {
    $(".div-fermenter").hide();

    if (objBrewing.FermenterFilling) {
        $(".div-fermenter-filling").show();
        telaExibida = 'div-fermenter-filling';
    }
    else if (objBrewing.FermenterFull) {
        $(".div-fermenter-full").show();
        telaExibida = 'div-fermenter-full';
    }
    else {
        $(".div-fermenter-empty").show();
        telaExibida = 'div-fermenter-empty';
    }
}

function ExibeTelaSparge() {
    $(".div-sparge").hide();

    if (objBrewing.SpargeExecuting) {
        $(".div-sparge-filling").show();
        telaExibida = 'div-sparge-filling';
    }
    else if (objBrewing.SpargeFinalizado) {
        $(".div-sparge-full").show();
        telaExibida = 'div-sparge-full';
    }
    else {
        $(".div-sparge-empty").show();
        telaExibida = 'div-sparge-empty';
    }
}

function ExibeTelaBOL() {
    $(".div-bol").hide();

    if (objBrewing.BOLHeating) {
        $(".bol-temperature").text("Temp. " + objBrewing.BOLHeatingTemperature + "ºC");
        $(".bol-temperature-actual").text("Actual. " + objBrewing.BOLTemperatureActual + "ºC");

        $(".bol-time").text("Time " + objBrewing.BOLHeatingTime + "M");
        $(".bol-time-actual").text("End. " + objBrewing.BOLHeatingTimeEnd + "M");


        $(".div-bol-heating").show();
        telaExibida = 'div-bol-heating';
    }
    else if (objBrewing.BOLFilling) {
        $(".div-bol-filling").show();
        telaExibida = 'div-bol-filling';
    }
    else if (objBrewing.HeatFinished) {
        $(".div-bol-full").show();
        telaExibida = 'div-bol-full';
    }
    else if (objBrewing.BOLFull) {
        $(".div-bol-full").show();
        telaExibida = 'div-bol-full';
    }
    else {
        $(".div-bol-empty").show();
        telaExibida = 'div-bol-empty';
    }
}

function ExibeTelaStep() {
    if (telaExibida == "div-step-heat" || telaExibida == "div-step-alterar-temperature") {
        return;
    }

    $(".div-step").hide();

    if (objBrewing.StepExecuting) {
        $(".step-temperature").text("Temp. " + objBrewing.StepExecutingTemperature + "ºC");
        $(".step-temperature-actual").text("Actual. " + objBrewing.StepTemperatureActual + "ºC");

        $(".step-time").text("Time " + objBrewing.StepExecutingTime + "M");
        $(".step-time-actual").text("End. " + objBrewing.StepExecutingTimeEnd + "M");

        $(".step-numero").text("Step " + objBrewing.StepExecutingNumber);


        $(".div-step-heating").show();
        telaExibida = 'div-step-heating';
    }
    else if (objBrewing.StepFinished) {
        $(".div-step-full").show();
        telaExibida = 'div-step-full';
    }
    else {
        $(".div-step-empty").show();
        telaExibida = 'div-step-empty';
    }
}

function ExibeTelaCooling() {
    $(".div-cooling").hide();

    if (objBrewing.CoolingExecuting) {
        $(".cooling-temperature").text("Temp. " + objBrewing.CoolingExecutingTemperature + "ºC");
        $(".cooling-temperature-actual").text("Actual. " + objBrewing.CoolingTemperatureActual + "ºC");

        $(".div-cooling-heating").show();
        telaExibida = 'div-cooling-heating';
    }
    else {
        $(".div-cooling-empty").show();
        telaExibida = 'div-cooling-empty';
    }
}

function ExibeTelaWhirlpool() {
    $(".div-whirlpool").hide();

    if (objBrewing.WhirlpoolExecuting) {
        $(".whirlpool-time").text("Time " + objBrewing.WhirlpoolExecutingTime + "M");
        $(".whirlpool-time-actual").text("End. " + objBrewing.WhirlpoolExecutingTimeEnd + "M");

        $(".div-whirlpool-heating").show();
        telaExibida = 'div-whirlpool-heating';
    }
    else {
        $(".div-whirlpool-empty").show();
        telaExibida = 'div-whirlpool-empty';
    }
}

function VerificaTelaExibir(telas) {
    if (!objBrewing) {
        telaExibida = 'div-principal';
        telas = telaExibida.split('-')[1];
    }
    else if (objBrewing && telaExibida == 'div-principal') {
        telaExibida = 'div-brewing';
        telas = telaExibida.split('-')[1];
    }

    if (telas == 'principal') {
        $(".div-tela").hide();
        $('.div-principal').show();
    }
    else if (telas == 'brewing') {
        $('.div-principal').hide();
        $('.div-brewing').show();
    }
    else if (telas == 'hlt') {
        ExibeTelaHLT();
    }
    else if (telas == 'herms') {
        ExibeTelaHerms();
    }
    else if (telas == 'mlt') {
        ExibeTelaMLT();
    }
    else if (telas == 'fermenter') {
        ExibeTelaFermenter();
    }
    else if (telas == 'sparge') {
        ExibeTelaSparge();
    }
    else if (telas == 'bol') {
        ExibeTelaBOL();
    }
    else if (telas == 'step') {
        ExibeTelaStep();
    }
    else if (telas == 'cooling') {
        ExibeTelaCooling();
    }
    else if (telas == 'whirlpool') {
        ExibeTelaWhirlpool();
    }
}

function defineLayout() {
    $(".btn-medio").css("width", "48%");
    $(".diminuir").css("width", "24%");
    $(".aumentar").css("width", "24%");
    $(".txt-value").css("width", "45%");
    $(".new-brewing").css("height", "250px");

    $(".btn-medio").css("margin-bottom", "5px");
    $(".btn-grande").css("margin-bottom", "5px");
    $(".btn-com-info").css("margin-right", "1px");
    $(".back-1-button").css("margin-top", "156px");
    $(".back-1-button-2-info").css("margin-top", "106px");
    $(".back-2-buttons").css("margin-top", "180px");
    $(".back-2-buttons-2-info").css("margin-top", "67px");
    $(".back-2-buttons-1-info").css("margin-top", "92px");
    $(".back-3-buttons").css("margin-top", "130px");
    $(".back-3-buttons-1-info").css("margin-top", "53px");
    $(".back-5-buttons").css("margin-top", "7px");
    $(".log-1-button").css("margin-top", "180px");
    $(".log-1-button-2-info").css("margin-top", "105px");
    $(".log-2-buttons").css("margin-top", "130px");
    $(".log-2-buttons-2-info").css("margin-top", "55px");
    $(".log-2-buttons-1-info").css("margin-top", "90px");
    $(".log-3-buttons").css("margin-top", "78px");
    $(".log-3-buttons-1-info").css("margin-top", "40px");
    $(".log-5-buttons").css("margin-top", "0px");
    $(".diminuir").css("float", "left");
    $(".aumentar").css("margin-right", "5px");
    $(".aumentar").css("margin-bottom", "5px");
    $(".txt-value").css("float", "left");
    $(".txt-value").css("margin-left", "8px");
    $(".txt-value").css("margin-right", "8px");
    $(".lbl-titulo").css("text-align", "center");
    $(".temperature").css("margin-right", "20px");
    $(".time").css("margin-right", "20px");
    $(".about").css("margin-top", "30px");
}

socket.on('updateBrewing', function (brewing) {
    objBrewing = brewing;

    var telas = telaExibida.split('-')[1];
    VerificaTelaExibir(telas);
});

$(".new-brewing").click(function () {
    $.post("new-brewing", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao criar new brewing\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".finish-brewing").click(function () {
    swal({
        title: "",
        text: "Finish brewing ?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: '#428bca',
        confirmButtonText: 'Yes',
        closeOnConfirm: true
    },
function () {
    $.post("finish-brewing", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao finished brewing\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});
});

$(".back").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var telas = classes[classes.length - 1].split("-")[1];
    $(".div-" + telas).hide();

    telaExibida = 'div-brewing';
    $(".div-brewing").show();
});

$(".item").click(function () {
    var classes = $(this).attr("class").split(" ");
    var telas = classes[classes.length - 1];
    $(".div-brewing").hide();

    VerificaTelaExibir(telas);
});

$(".fill").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    
    telaExibida = 'div-' + tela + '-filling';

    $.post("fill" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao fill " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".stop-fill").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-full';
    $.post("stopfill" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao stop enchimento " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".heat").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-heat").show();
});

$(".stop-heat").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-full';

    $.post("stopheat" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao stop heat " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".temperature-heat").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var value = parseInt($(".temperature-" + tela).val());
    
    telaExibida = 'div-' + tela + '-heating';
    
    $.post("heat" + tela + "/" + value, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao heat " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".time-heat").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var value = parseInt($(".time-" + tela).val());

    telaExibida = 'div-' + tela + '-heating';

    $.post("heat" + tela + "/" + value, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao heat " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".temperature-time-heat").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var valueTemperature = parseInt($(".temperature-" + tela).val());
    var valueTime = parseInt($(".time-" + tela).val());

    telaExibida = 'div-' + tela + '-heating';

    $.post("heat" + tela + "/" + valueTemperature + "/" + valueTime, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao heat " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".log").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var texto = "";
    switch (item) {
        case "bol":
            texto = objBrewing.BOLLog;
            break;
        case "step":
            texto = objBrewing.StepLog;
            break;
        case "hlt":
            texto = objBrewing.HLTLog;
            break;
        case "herms":
            texto = objBrewing.HermsLog;
            break;
        case "cooling":
            texto = objBrewing.CoolingLog;
            break;
        case "mlt":
            texto = objBrewing.MLTLog;
            break;
        case "sparge":
            texto = objBrewing.SpargeLog;
            break;
        case "whirlpool":
            texto = objBrewing.WhirlpoolLog;
            break;
        case "fermenter":
            texto = objBrewing.FermenterLog;
            break;
    }

    swal({ title: "", text: texto, confirmButtonColor: '#428bca' });
});

$(".about").click(function(){
swal({ title: "", text: "Node Arduino Home Brewer\nfor Herms System\n\nVersão 1.0.0", confirmButtonColor: '#428bca' });    
});


$(".full").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-full';

    $.post(tela + "full", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao marcar " + tela + "como full\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brewing';
        });
});

$(".aumentar").click(function () {
    var objValor = $(this).prev();
    var classes = $(objValor).attr("class").split(" ");
    var value = parseInt($(objValor).val()) + 1;
    if (value < 0)
        value = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(value);
    })
});

$(".diminuir").click(function () {
    var objValor = $(this).next();
    var classes = $(objValor).attr("class").split(" ");
    var value = parseInt($(objValor).val()) - 1;
    if (value < 0)
        value = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(value);
    })
});

$(".alterar-time").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[1];

    telaExibida = tela + "-alterar-time";

    $("." + tela).hide();
    $("." + tela + "-alterar-time").show();
});

$(".alterar-temperature").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[1];

    telaExibida = tela + "-alterar-temperature";

    $("." + tela).hide();
    $("." + tela + "-alterar-temperature").show();
});

defineLayout();