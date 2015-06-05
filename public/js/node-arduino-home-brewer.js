var socket = io();
var objBrassagem = null;
var telaExibida = 'div-principal';

function ExibeTelaHLT() {
    if (telaExibida == "div-hlt-aquecer" || telaExibida == "div-hlt-alterar-temperatura") {
        return;
    }

    $(".div-hlt").hide();

    if (objBrassagem.HLTAquecendo) {
        $(".hlt-temperatura").text("Temp. " + objBrassagem.HLTAquecendoTemperatura + "ºC");
        $(".hlt-temperatura-atual").text("Atual. " + objBrassagem.HLTTemperaturaAtual + "ºC");

        $(".div-hlt-aquecendo").show();
        telaExibida = 'div-hlt-aquecendo';
    }
    else if (objBrassagem.HLTEnchendo) {
        $(".div-hlt-enchendo").show();
        telaExibida = 'div-hlt-enchendo';
    }
    else if (objBrassagem.HLTCheio) {
        $(".div-hlt-cheio").show();
        telaExibida = 'div-hlt-cheio';
    }
    else {
        $(".div-hlt-vazio").show();
        telaExibida = 'div-hlt-vazio';
    }
}

function ExibeTelaHerms() {
    if (telaExibida == "div-herms-aquecer" || telaExibida == "div-herms-alterar-temperatura") {
        return;
    }

    $(".div-herms").hide();

    if (objBrassagem.HermsAquecendo) {
        $(".herms-temperatura").text("Temp. " + objBrassagem.HermsAquecendoTemperatura + "ºC");
        $(".herms-temperatura-atual").text("Atual. " + objBrassagem.HermsTemperaturaAtual + "ºC");

        $(".div-herms-aquecendo").show();
        telaExibida = 'div-herms-aquecendo';
    }
    else if (objBrassagem.HermsEnchendo) {
        $(".div-herms-enchendo").show();
        telaExibida = 'div-herms-enchendo';
    }
    else if (objBrassagem.HermsCheio) {
        $(".div-herms-cheio").show();
        telaExibida = 'div-herms-cheio';
    }
    else {
        $(".div-herms-vazio").show();
        telaExibida = 'div-herms-vazio';
    }

}

function ExibeTelaMash() {
    $(".div-mash").hide();

    if (objBrassagem.MashEnchendo) {
        $(".div-mash-enchendo").show();
        telaExibida = 'div-mash-enchendo';
    }
    else if (objBrassagem.MashCheio) {
        $(".div-mash-cheio").show();
        telaExibida = 'div-mash-cheio';
    }
    else {
        $(".div-mash-vazio").show();
        telaExibida = 'div-mash-vazio';
    }
}

function ExibeTelaFermentador() {
    $(".div-fermentador").hide();

    if (objBrassagem.FermentadorEnchendo) {
        $(".div-fermentador-enchendo").show();
        telaExibida = 'div-fermentador-enchendo';
    }
    else if (objBrassagem.FermentadorCheio) {
        $(".div-fermentador-cheio").show();
        telaExibida = 'div-fermentador-cheio';
    }
    else {
        $(".div-fermentador-vazio").show();
        telaExibida = 'div-fermentador-vazio';
    }
}

function ExibeTelaSparge() {
    $(".div-sparge").hide();

    if (objBrassagem.SpargeRodando) {
        $(".div-sparge-enchendo").show();
        telaExibida = 'div-sparge-enchendo';
    }
    else if (objBrassagem.SpargeFinalizado) {
        $(".div-sparge-cheio").show();
        telaExibida = 'div-sparge-cheio';
    }
    else {
        $(".div-sparge-vazio").show();
        telaExibida = 'div-sparge-vazio';
    }
}

function ExibeTelaBOL() {
    $(".div-bol").hide();

    if (objBrassagem.BOLFervendo) {
        $(".bol-temperatura").text("Temp. " + objBrassagem.BOLFervendoTemperatura + "ºC");
        $(".bol-temperatura-atual").text("Atual. " + objBrassagem.BOLTemperaturaAtual + "ºC");

        $(".bol-minuto").text("Temp. " + objBrassagem.BOLFervendoMinuto + "M");
        $(".bol-minuto-atual").text("Rest. " + objBrassagem.BOLFervendoMinutoRestante + "M");


        $(".div-bol-aquecendo").show();
        telaExibida = 'div-bol-aquecendo';
    }
    else if (objBrassagem.BOLEnchendo) {
        $(".div-bol-enchendo").show();
        telaExibida = 'div-bol-enchendo';
    }
    else if (objBrassagem.FervuraFinalizada) {
        $(".div-bol-cheio").show();
        telaExibida = 'div-bol-cheio';
    }
    else if (objBrassagem.BOLCheio) {
        $(".div-bol-cheio").show();
        telaExibida = 'div-bol-cheio';
    }
    else {
        $(".div-bol-vazio").show();
        telaExibida = 'div-bol-vazio';
    }
}

function ExibeTelaRampa() {
    if (telaExibida == "div-rampa-aquecer" || telaExibida == "div-rampa-alterar-temperatura") {
        return;
    }

    $(".div-rampa").hide();

    if (objBrassagem.RampaRodando) {
        $(".rampa-temperatura").text("Temp. " + objBrassagem.RampaRodandoTemperatura + "ºC");
        $(".rampa-temperatura-atual").text("Atual. " + objBrassagem.RampaTemperaturaAtual + "ºC");

        $(".rampa-minuto").text("Temp. " + objBrassagem.RampaRodandoMinuto + "M");
        $(".rampa-minuto-atual").text("Rest. " + objBrassagem.RampaRodandoMinutoRestante + "M");

        $(".rampa-numero").text("Rampa " + objBrassagem.RampaRodandoNumero);


        $(".div-rampa-aquecendo").show();
        telaExibida = 'div-rampa-aquecendo';
    }
    else if (objBrassagem.RampaFinalizada) {
        $(".div-rampa-cheio").show();
        telaExibida = 'div-rampa-cheio';
    }
    else {
        $(".div-rampa-vazio").show();
        telaExibida = 'div-rampa-vazio';
    }
}

function ExibeTelaResfriar() {
    $(".div-resfriar").hide();

    if (objBrassagem.ResfriarRodando) {
        $(".resfriar-temperatura").text("Temp. " + objBrassagem.ResfriarRodandoTemperatura + "ºC");
        $(".resfriar-temperatura-atual").text("Atual. " + objBrassagem.ResfriarTemperaturaAtual + "ºC");

        $(".div-resfriar-aquecendo").show();
        telaExibida = 'div-resfriar-aquecendo';
    }
    else {
        $(".div-resfriar-vazio").show();
        telaExibida = 'div-resfriar-vazio';
    }
}

function ExibeTelaWhirlpool() {
    $(".div-whirlpool").hide();

    if (objBrassagem.WhirlpoolRodando) {
        $("." + item + "-minuto").text("Temp. " + objBrassagem.WhirlpoolRodandoMinuto + "M");
        $("." + item + "-minuto-atual").text("Rest. " + objBrassagem.WhirlpoolRodandoMinutoRestante + "M");

        $(".div-whirlpool-aquecendo").show();
        telaExibida = 'div-whirlpool-aquecendo';
    }
    else {
        $(".div-whirlpool-vazio").show();
        telaExibida = 'div-whirlpool-vazio';
    }
}

function VerificaTelaExibir(telas) {
    if (!objBrassagem) {
        telaExibida = 'div-principal';
        telas = telaExibida.split('-')[1];
    }
    else if (objBrassagem && telaExibida == 'div-principal') {
        telaExibida = 'div-brassagem';
        telas = telaExibida.split('-')[1];
    }

    if (telas == 'principal') {
        $(".div-tela").hide();
        $('.div-principal').show();
    }
    else if (telas == 'brassagem') {
        $('.div-principal').hide();
        $('.div-brassagem').show();
    }
    else if (telas == 'hlt') {
        ExibeTelaHLT();
    }
    else if (telas == 'herms') {
        ExibeTelaHerms();
    }
    else if (telas == 'mash') {
        ExibeTelaMash();
    }
    else if (telas == 'fermentador') {
        ExibeTelaFermentador();
    }
    else if (telas == 'sparge') {
        ExibeTelaSparge();
    }
    else if (telas == 'bol') {
        ExibeTelaBOL();
    }
    else if (telas == 'rampa') {
        ExibeTelaRampa();
    }
    else if (telas == 'resfriar') {
        ExibeTelaResfriar();
    }
    else if (telas == 'whirlpool') {
        ExibeTelaWhirlpool();
    }
}

function defineLayout() {
    $(".btn-medio").css("width", "48%");
    $(".diminuir").css("width", "24%");
    $(".aumentar").css("width", "24%");
    $(".txt-valor").css("width", "45%");

    $(".btn-medio").css("margin-bottom", "5px");
    $(".btn-grande").css("margin-bottom", "5px");
    $(".btn-com-legenda").css("margin-right", "1px");
    $(".voltar-1-botao").css("margin-top", "156px");
    $(".voltar-1-botao-2-legendas").css("margin-top", "106px");
    $(".voltar-2-botoes").css("margin-top", "180px");
    $(".voltar-2-botoes-2-legendas").css("margin-top", "67px");
    $(".voltar-2-botoes-1-legenda").css("margin-top", "92px");
    $(".voltar-3-botoes").css("margin-top", "130px");
    $(".voltar-3-botoes-1-legenda").css("margin-top", "53px");
    $(".voltar-5-botoes").css("margin-top", "0px");
    $(".log-1-botao").css("margin-top", "180px");
    $(".log-1-botao-2-legendas").css("margin-top", "105px");
    $(".log-2-botoes").css("margin-top", "130px");
    $(".log-2-botoes-2-legendas").css("margin-top", "55px");
    $(".log-2-botoes-1-legenda").css("margin-top", "90px");
    $(".log-3-botoes").css("margin-top", "78px");
    $(".log-3-botoes-1-legenda").css("margin-top", "40px");
    $(".log-5-botoes").css("margin-top", "0px");
    $(".diminuir").css("float", "left");
    $(".aumentar").css("margin-right", "5px");
    $(".aumentar").css("margin-bottom", "5px");
    $(".txt-valor").css("float", "left");
    $(".txt-valor").css("margin-left", "5px");
    $(".txt-valor").css("margin-right", "5px");
    $(".lbl-titulo").css("text-align", "center");
    $(".temperatura").css("margin-right", "20px");
    $(".minuto").css("margin-right", "20px");
}

socket.on('atualizaBrassagem', function (brassagem) {
    objBrassagem = brassagem;

    var telas = telaExibida.split('-')[1];
    VerificaTelaExibir(telas);
});

$(".nova-brassagem").click(function () {
    $.post("nova-brassagem", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao criar nova brassagem\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".finalizar-brassagem").click(function () {
    swal({
        title: "",
        text: "Finalizar Brassagem ?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Não",
        confirmButtonColor: '#428bca',
        confirmButtonText: 'Sim',
        closeOnConfirm: true
    },
function () {
    $.post("finalizar-brassagem", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao finalizar brassagem\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});
});

$(".voltar").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[classes.length - 1]).hide();
    $(".div-brassagem").show();
});

$(".item").click(function () {
    var classes = $(this).attr("class").split(" ");
    var telas = classes[classes.length - 1];
    $(".div-brassagem").hide();

    VerificaTelaExibir(telas);
});

$(".encher").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    
    telaExibida = 'div-' + tela + '-enchendo';

    $.post("enche" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao encher " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".parar-enchimento").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-cheio';

    $.post("paraenchimento" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao parar enchimento " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-aquecer").show();
});

$(".parar-aquecimento").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-cheio';

    $.post("paraaquecimento" + tela, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao parar aquecimento " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".temperatura-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var valor = parseInt($(".temperatura-" + tela).val());
    
    telaExibida = 'div-' + tela + '-aquecendo';
    
    $.post("aquece" + tela + "/" + valor, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao aquecer " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".minuto-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var valor = parseInt($(".minuto-" + tela).val());

    telaExibida = 'div-' + tela + '-aquecendo';

    $.post("aquece" + tela + "/" + valor, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao aquecer " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".temperatura-minuto-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    var valorTemperatura = parseInt($(".temperatura-" + tela).val());
    var valorMinuto = parseInt($(".minuto-" + tela).val());

    telaExibida = 'div-' + tela + '-aquecendo';

    $.post("aquece" + tela + "/" + valorTemperatura + "/" + valorMinuto, function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao aquecer " + tela + "\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".log").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var texto = "";
    switch (item) {
        case "bol":
            texto = "Enchimento Iniciado\nEnchimento Parado\nEnchimento Finalizado\nFervura Iniciada\nFervura Finalizada";
            break;
        case "rampa":
            texto = "Rampa 1 Iniciada\nRampa 1 Finalizada";
            break;
        case "hlt":
            texto = "Enchimento Iniciado\nEnchimento Parado\nEnchimento Finalizado\nAquecimento Iniciado\nAquecimento Parado";
            break;
        case "herms":
            texto = "Enchimento Iniciado\nEnchimento Parado\nEnchimento Finalizado\nAquecimento Iniciado\nAquecimento Parado";
            break;
        case "resfriar":
            texto = "Resfriamento Iniciado\nResfriamento Parado\nResfriamento Finalizado";
            break;
        case "mash":
            texto = "Enchimento Iniciado\nEnchimento Parado\nEnchimento Finalizado";
            break;
        case "sparge":
            texto = "Sparge Iniciado\nSparge Parado\nSparge Finalizado";
            break;
        case "whirlpool":
            texto = "Whirlpool Iniciado\nWhirlpool Parado";
            break;
        case "fermentador":
            texto = "Enchimento Iniciado\nEnchimento Parado\nEnchimento Finalizado";
            break;
    }

    swal({ title: "", text: texto, confirmButtonColor: '#428bca' });
});

$(".cheio").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[classes.length - 1].split("-")[1];
    telaExibida = 'div-' + tela + '-cheio';

    $.post(tela + "cheio", function (data) { })
        .fail(function (error) {
            sweetAlert("", "Erro ao marcar " + tela + "como cheio\n" + $.parseJSON(error.responseText).error, "error");
            telaExibida = 'div-brassagem';
        });
});

$(".aumentar").click(function () {
    var objValor = $(this).prev();
    var classes = $(objValor).attr("class").split(" ");
    var valor = parseInt($(objValor).val()) + 1;
    if (valor < 0)
        valor = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(valor);
    })
});

$(".diminuir").click(function () {
    var objValor = $(this).next();
    var classes = $(objValor).attr("class").split(" ");
    var valor = parseInt($(objValor).val()) - 1;
    if (valor < 0)
        valor = 0;

    $("." + classes[1]).each(function (index) {
        $(this).val(valor);
    })
});

$(".alterar-minuto").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[1];

    telaExibida = tela + "-alterar-minuto";

    $("." + tela).hide();
    $("." + tela + "-alterar-minuto").show();
});

$(".alterar-temperatura").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var tela = classes[1];

    telaExibida = tela + "-alterar-temperatura";

    $("." + tela).hide();
    $("." + tela + "-alterar-temperatura").show();
});

defineLayout();