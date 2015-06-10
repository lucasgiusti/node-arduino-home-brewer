var socket = io();
var objBrewing = null;
var divVisible = 'div-default';

function signin() {
    window.location.assign("signin.html");
}

$.get("loggedtest", function (data) { })
        .fail(function (error, message) {
            var erro = $.parseJSON(error.responseText).status;
                if (erro == 401) {
                    signin();
                }
        });


function DisplayPageHLT() {
    $(".div-hlt").hide();

    if (objBrewing.HLTHeating) {
        $(".hlt-temperature").text("Temp. " + objBrewing.HLTHeatingTemperature + "ºC");
        $(".hlt-temperature-actual").text("Actual. " + objBrewing.HLTTemperatureActual + "ºC");

        $(".div-hlt-heating").show();
        divVisible = 'div-hlt-heating';
    }
    else if (objBrewing.HLTFilling) {
        $(".div-hlt-filling").show();
        divVisible = 'div-hlt-filling';
    }
    else if (objBrewing.HLTFull) {
        $(".div-hlt-full").show();
        divVisible = 'div-hlt-full';
    }
    else {
        $(".div-hlt-empty").show();
        divVisible = 'div-hlt-empty';
    }
}

function DisplayPageHerms() {
    $(".div-herms").hide();

    if (objBrewing.HermsHeating) {
        $(".herms-temperature").text("Temp. " + objBrewing.HermsHeatingTemperature + "ºC");
        $(".herms-temperature-actual").text("Actual. " + objBrewing.HermsTemperatureActual + "ºC");

        $(".div-herms-heating").show();
        divVisible = 'div-herms-heating';
    }
    else if (objBrewing.HermsFilling) {
        $(".div-herms-filling").show();
        divVisible = 'div-herms-filling';
    }
    else if (objBrewing.HermsFull) {
        $(".div-herms-full").show();
        divVisible = 'div-herms-full';
    }
    else {
        $(".div-herms-empty").show();
        divVisible = 'div-herms-empty';
    }

}

function DisplayPageMLT() {
    $(".div-mlt").hide();

    if (objBrewing.MLTFilling) {
        $(".div-mlt-filling").show();
        divVisible = 'div-mlt-filling';
    }
    else if (objBrewing.MLTFull) {
        $(".div-mlt-full").show();
        divVisible = 'div-mlt-full';
    }
    else {
        $(".div-mlt-empty").show();
        divVisible = 'div-mlt-empty';
    }
}

function DisplayPageFermenter() {
    $(".div-fermenter").hide();

    if (objBrewing.FermenterFilling) {
        $(".div-fermenter-filling").show();
        divVisible = 'div-fermenter-filling';
    }
    else if (objBrewing.FermenterFull) {
        $(".div-fermenter-full").show();
        divVisible = 'div-fermenter-full';
    }
    else {
        $(".div-fermenter-empty").show();
        divVisible = 'div-fermenter-empty';
    }
}

function DisplayPageSparge() {
    $(".div-sparge").hide();

    if (objBrewing.SpargeExecuting) {
        $(".div-sparge-filling").show();
        divVisible = 'div-sparge-filling';
    }
    else if (objBrewing.SpargeFinalizado) {
        $(".div-sparge-full").show();
        divVisible = 'div-sparge-full';
    }
    else {
        $(".div-sparge-empty").show();
        divVisible = 'div-sparge-empty';
    }
}

function DisplayPageBOL() {
    $(".div-bol").hide();

    if (objBrewing.BOLHeating) {
        $(".bol-temperature").text("Temp. " + objBrewing.BOLHeatingTemperature + "ºC");
        $(".bol-temperature-actual").text("Actual. " + objBrewing.BOLTemperatureActual + "ºC");

        $(".bol-time").text("Time " + objBrewing.BOLHeatingTime + "M");
        $(".bol-time-actual").text("End. " + objBrewing.BOLHeatingTimeEnd + "M");


        $(".div-bol-heating").show();
        divVisible = 'div-bol-heating';
    }
    else if (objBrewing.BOLFilling) {
        $(".div-bol-filling").show();
        divVisible = 'div-bol-filling';
    }
    else if (objBrewing.HeatFinished) {
        $(".div-bol-full").show();
        divVisible = 'div-bol-full';
    }
    else if (objBrewing.BOLFull) {
        $(".div-bol-full").show();
        divVisible = 'div-bol-full';
    }
    else {
        $(".div-bol-empty").show();
        divVisible = 'div-bol-empty';
    }
}

function DisplayPageStep() {
    $(".div-step").hide();

    if (objBrewing.StepExecuting) {
        $(".step-temperature").text("Temp. " + objBrewing.StepExecutingTemperature + "ºC");
        $(".step-temperature-actual").text("Actual. " + objBrewing.StepTemperatureActual + "ºC");

        $(".step-time").text("Time " + objBrewing.StepExecutingTime + "M");
        $(".step-time-actual").text("End. " + objBrewing.StepExecutingTimeEnd + "M");

        $(".step-number").text("Step " + objBrewing.StepExecutingNumber);


        $(".div-step-heating").show();
        divVisible = 'div-step-heating';
    }
    else if (objBrewing.StepFinished) {
        $(".div-step-full").show();
        divVisible = 'div-step-full';
    }
    else {
        $(".div-step-empty").show();
        divVisible = 'div-step-empty';
    }
}

function DisplayPageCooling() {
    $(".div-cooling").hide();

    if (objBrewing.CoolingExecuting) {
        $(".cooling-temperature").text("Temp. " + objBrewing.CoolingExecutingTemperature + "ºC");
        $(".cooling-temperature-actual").text("Actual. " + objBrewing.CoolingTemperatureActual + "ºC");

        $(".div-cooling-heating").show();
        divVisible = 'div-cooling-heating';
    }
    else {
        $(".div-cooling-empty").show();
        divVisible = 'div-cooling-empty';
    }
}

function DisplayPageWhirlpool() {
    $(".div-whirlpool").hide();

    if (objBrewing.WhirlpoolExecuting) {
        $(".whirlpool-time").text("Time " + objBrewing.WhirlpoolExecutingTime + "M");
        $(".whirlpool-time-actual").text("End. " + objBrewing.WhirlpoolExecutingTimeEnd + "M");

        $(".div-whirlpool-heating").show();
        divVisible = 'div-whirlpool-heating';
    }
    else {
        $(".div-whirlpool-empty").show();
        divVisible = 'div-whirlpool-empty';
    }
}

function CheckPageDisplay(pages) {
    if (!objBrewing) {
        divVisible = 'div-default';
        pages = divVisible.split('-')[1];
    }
    else if (objBrewing && divVisible == 'div-default') {
        divVisible = 'div-brewing';
        pages = divVisible.split('-')[1];
    }

    if (pages == 'default') {
        $(".div-page").hide();
        $('.div-default').show();
    }
    else if (pages == 'brewing') {
        $('.div-default').hide();
        $('.div-brewing').show();
    }
    else if (pages == 'hlt') {
        DisplayPageHLT();
    }
    else if (pages == 'herms') {
        DisplayPageHerms();
    }
    else if (pages == 'mlt') {
        DisplayPageMLT();
    }
    else if (pages == 'fermenter') {
        DisplayPageFermenter();
    }
    else if (pages == 'sparge') {
        DisplayPageSparge();
    }
    else if (pages == 'bol') {
        DisplayPageBOL();
    }
    else if (pages == 'step') {
        DisplayPageStep();
    }
    else if (pages == 'cooling') {
        DisplayPageCooling();
    }
    else if (pages == 'whirlpool') {
        DisplayPageWhirlpool();
    }
}

function startLayout() {
    $(".div-page").hide();
    $('.container').removeAttr('style');
    $(".btn-middle").css("width", "48%");
    $(".down").css("width", "24%");
    $(".up").css("width", "24%");
    $(".txt-value").css("width", "45%");
    $(".new-brewing").css("height", "196px");

    $(".btn-middle").css("margin-bottom", "5px");
    $(".btn-middle").css("margin-left", "3px");
    $(".btn-large").css("margin-bottom", "5px");
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
    $(".down").css("float", "left");
    $(".up").css("margin-right", "5px");
    $(".up").css("margin-bottom", "5px");
    $(".txt-value").css("float", "left");
    $(".txt-value").css("margin-left", "6px");
    $(".txt-value").css("margin-right", "6px");
    $(".form-signin-heading").css("text-align", "center");
    $(".temperature").css("margin-right", "20px");
    $(".time").css("margin-right", "20px");
    $(".about").css("margin-top", "30px");
}

socket.on('updateBrewing', function (brewing) {
    objBrewing = brewing;

    var pages = divVisible.split('-')[1];
    CheckPageDisplay(pages);
});

$(".new-brewing").click(function () {
    $.post("new-brewing", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".logout").click(function () {
$.post("logout", function (data) { signin(); })
        .fail(function (error, message) {
            signin();
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
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});
});

$(".back").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var pages = classes[classes.length - 1].split("-")[1];
    $(".div-" + pages).hide();

    divVisible = 'div-brewing';
    $(".div-brewing").show();
});

$(".item").click(function () {
    var classes = $(this).attr("class").split(" ");
    var pages = classes[classes.length - 1];
    $(".div-brewing").hide();

    CheckPageDisplay(pages);
});

$(".fill").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    
    divVisible = 'div-' + page + '-filling';

    $.post("fill" + page, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".stop-fill").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    divVisible = 'div-' + page + '-full';
    $.post("stopfill" + page, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".start").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-heat").show();
});

$(".stop").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    divVisible = 'div-' + page + '-full';

    $.post("stop" + page, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".temperature-start").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    var value = parseInt($(".temperature-" + page).val());
    
    divVisible = 'div-' + page + '-heating';
    
    $.post("start" + page + "/" + value, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".time-start").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    var value = parseInt($(".time-" + page).val());

    divVisible = 'div-' + page + '-heating';

    $.post("start" + page + "/" + value, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".temperature-time-start").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    var valueTemperature = parseInt($(".temperature-" + page).val());
    var valueTime = parseInt($(".time-" + page).val());

    divVisible = 'div-' + page + '-heating';

    $.post("start" + page + "/" + valueTemperature + "/" + valueTime, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".log").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var text = "";
    switch (item) {
        case "bol":
            text = objBrewing.BOLLog;
            break;
        case "step":
            text = objBrewing.StepLog;
            break;
        case "hlt":
            text = objBrewing.HLTLog;
            break;
        case "herms":
            text = objBrewing.HermsLog;
            break;
        case "cooling":
            text = objBrewing.CoolingLog;
            break;
        case "mlt":
            text = objBrewing.MLTLog;
            break;
        case "sparge":
            text = objBrewing.SpargeLog;
            break;
        case "whirlpool":
            text = objBrewing.WhirlpoolLog;
            break;
        case "fermenter":
            text = objBrewing.FermenterLog;
            break;
    }

    swal({ title: "", text: text, confirmButtonColor: '#428bca' });
});

$(".about").click(function(){
swal({ title: "", text: "Node Arduino Home Brewer\nfor Herms System\n\nVersion 1.0.0", confirmButtonColor: '#428bca' });    
});


$(".full").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[classes.length - 1].split("-")[1];
    divVisible = 'div-' + page + '-full';

    $.post(page + "full", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Error\n" + $.parseJSON(error.responseText).error, "error");
            divVisible = 'div-brewing';
        });
});

$(".up").click(function () {
    var objValue = $(this).prev();
    var classes = $(objValue).attr("class").split(" ");
    var value = parseInt($(objValue).val()) + 1;
    if (value < 0)
        value = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(value);
    })
});

$(".down").click(function () {
    var objValue = $(this).next();
    var classes = $(objValue).attr("class").split(" ");
    var value = parseInt($(objValue).val()) - 1;
    if (value < 0)
        value = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(value);
    })
});

$(".change-time").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[1];

    divVisible = page + "-change-time";

    $("." + page).hide();
    $("." + page + "-change-time").show();
});

$(".change-temperature").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var page = classes[1];

    divVisible = page + "-change-temperature";

    $("." + page).hide();
    $("." + page + "-change-temperature").show();
});