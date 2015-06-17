var version = "1.0.0";
var footerText = "Node Arduino Home Brewer - " + version;
var descriptionText = "Node Arduino Home Brewer\nfor Herms System\n\nVersion " + version;
var socket = io();
var objBrewing = null;
var divVisible = 'div-default';

//Detect Mobile Device
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/BB10/i,k=/Opera Mini/i,l=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),n=function(a,b){return a.test(b)},o=function(a){var o=a||navigator.userAgent;return this.apple={phone:n(b,o),ipod:n(c,o),tablet:n(d,o),device:n(b,o)||n(c,o)||n(d,o)},this.android={phone:n(e,o),tablet:!n(e,o)&&n(f,o),device:n(e,o)||n(f,o)},this.windows={phone:n(g,o),tablet:n(h,o),device:n(g,o)||n(h,o)},this.other={blackberry:n(i,o),blackberry10:n(j,o),opera:n(k,o),firefox:n(l,o),device:n(i,o)||n(j,o)||n(k,o)||n(l,o)},this.seven_inch=n(m,o),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},p=function(){var a=new o;return a.Class=o,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=o:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=p():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=p()):a.isMobile=p()}(this);



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

    if(!isMobile.any){
        $(".hlt-log").html(objBrewing.HLTLog.split("\n").join("<br>"));
        $(".div-hlt-log").show();
    }

    $(".hlt-temperature-actual").text(objBrewing.HLTTemperatureActual + "ºC");


    if (objBrewing.HLTHeating) {
        $(".hlt-temperature").text("To. " + objBrewing.HLTHeatingTemperature + "ºC");

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

    if(!isMobile.any){
        $(".herms-log").html(objBrewing.HermsLog.split("\n").join("<br>"));
        $(".div-herms-log").show();
    }

    $(".herms-temperature-actual").text(objBrewing.HermsTemperatureActual + "ºC");

    if (objBrewing.HermsHeating) {
        $(".herms-temperature").text("To " + objBrewing.HermsHeatingTemperature + "ºC");

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

    if(!isMobile.any){
        $(".mlt-log").html(objBrewing.MLTLog.split("\n").join("<br>"));
        $(".div-mlt-log").show();
    }

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

    if(!isMobile.any){
        $(".fermenter-log").html(objBrewing.FermenterLog.split("\n").join("<br>"));
        $(".div-fermenter-log").show();
    }

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

    if(!isMobile.any){
        $(".sparge-log").html(objBrewing.SpargeLog.split("\n").join("<br>"));
        $(".div-sparge-log").show();
    }

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

    if(!isMobile.any){
        $(".bol-log").html(objBrewing.BOLLog.split("\n").join("<br>"));
        $(".div-bol-log").show();
    }

    $(".bol-temperature-actual").text(objBrewing.BOLTemperatureActual + "ºC");

    if (objBrewing.BOLHeating) {
        $(".bol-temperature").text("To " + objBrewing.BOLHeatingTemperature + "ºC");

        $(".bol-time").text("Time " + objBrewing.BOLHeatingTime + "M");
        $(".bol-time-actual").text(objBrewing.BOLHeatingTimeEnd + "M");


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

    if(!isMobile.any){
        $(".step-log").html(objBrewing.StepLog.split("\n").join("<br>"));
        $(".div-step-log").show();
    }

    $(".step-temperature-actual").text(objBrewing.StepTemperatureActual + "ºC");

    if (objBrewing.StepExecuting) {
        $(".step-temperature").text("To " + objBrewing.StepExecutingTemperature + "ºC");

        $(".step-time").text("Time " + objBrewing.StepExecutingTime + "M");
        $(".step-time-actual").text(objBrewing.StepExecutingTimeEnd + "M");

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

    if(!isMobile.any){
        $(".cooling-log").html(objBrewing.CoolingLog.split("\n").join("<br>"));
        $(".div-cooling-log").show();
    }

    $(".cooling-temperature-actual").text(objBrewing.CoolingTemperatureActual + "ºC");

    if (objBrewing.CoolingExecuting) {
        $(".cooling-temperature").text("To " + objBrewing.CoolingExecutingTemperature + "ºC");

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

    if(!isMobile.any){
        $(".whirlpool-log").html(objBrewing.WhirlpoolLog.split("\n").join("<br>"));
        $(".div-whirlpool-log").show();
    }

    if (objBrewing.WhirlpoolExecuting) {
        $(".whirlpool-time").text("Time " + objBrewing.WhirlpoolExecutingTime + "M");
        $(".whirlpool-time-actual").text(objBrewing.WhirlpoolExecutingTimeEnd + "M");

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

    $(".div-log").hide();


    if (pages == 'default') {
        $(".div-page").hide();
        $('.div-default').show();

        if(!isMobile.any){
            $(".div-about-log").show();
            $(".about-log").html(descriptionText.split("\n").join("<br>"));
        }
    }
    else if (pages == 'brewing') {
        $('.div-default').hide();
        $('.div-brewing').show();

        if(!isMobile.any){
            $(".div-brewing-log").show();
            $(".brewing-log").html("");
        }
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
    $(".div-log").hide();

    if(!isMobile.any){
        $(".log").css("visibility", "hidden");
        $(".form-signin").css("margin-left", "0px");
        $(".about").css("visibility", "hidden");
    }

    $(".footer-text").text(footerText);
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
    $(".div-log").hide();

    var classes = $(this).parent().attr("class").split(" ");
    var pages = classes[classes.length - 1].split("-")[1];
    $(".div-" + pages).hide();

    divVisible = 'div-brewing';
    $(".div-brewing").show();

    if(!isMobile.any){
            $(".div-brewing-log").show();
            $(".brewing-log").html("");
    }
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
swal({ title: "", text: descriptionText, confirmButtonColor: '#428bca' });    
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