
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

$(".nova-brassagem").click(function () {
        $(".div-principal").hide();
        $(".div-brassagem").show();
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
    $(".div-brassagem").hide();
    $(".div-principal").show();
});
});

$(".voltar").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[classes.length - 1]).hide();
    $(".div-brassagem").show();
});

$(".item").click(function () {
    var classes = $(this).attr("class").split(" ");
    $(".div-brassagem").hide();
    $(".div-" + classes[classes.length - 1] + "-vazio").show();
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

    $("." + classes[1]).hide();
    $("." + classes[1] + "-alterar-minuto").show();
});

$(".alterar-temperatura").click(function () {
    var classes = $(this).parent().attr("class").split(" ");

    $("." + classes[1]).hide();
    $("." + classes[1] + "-alterar-temperatura").show();
});

$(".encher").click(function () {
    var classes = $(this).parent().attr("class").split(" ");

    $("." + classes[1]).hide();
    $("." + classes[1] + "-enchendo").show();
});

$(".parar-enchimento").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-vazio").show();
});

$(".cheio").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-cheio").show();
});

$(".aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-aquecer").show();
});

$(".parar-aquecimento").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-cheio").show();
});

$(".temperatura-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var valor = parseInt($(".temperatura-" + item).val())
    $("." + item + "-temperatura").text("Temp. " + valor + "ºC");
    $("." + item + "-temperatura-atual").text("Atual. " + valor + "ºC");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-aquecendo").show();
});

$(".minuto-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var valor = parseInt($(".minuto-" + item).val())
    $("." + item + "-minuto").text("Temp. " + valor + "M");
    $("." + item + "-minuto-atual").text("Atual. " + valor + "M");
    $("." + classes[1]).hide();
    $("." + classes[1] + "-aquecendo").show();
});

$(".temperatura-minuto-aquecer").click(function () {
    var classes = $(this).parent().attr("class").split(" ");
    var item = classes[1].replace("div-", "");

    var valorTemperatura = parseInt($(".temperatura-" + item).val())
    $("." + item + "-temperatura").text("Temp. " + valorTemperatura + "ºC");
    $("." + item + "-temperatura-atual").text("Atual. " + valorTemperatura + "ºC");

    var valor = parseInt($(".minuto-" + item).val())
    $("." + item + "-minuto").text("Temp. " + valor + "M");
    $("." + item + "-minuto-atual").text("Atual. " + valor + "M");

    $("." + classes[1]).hide();
    $("." + classes[1] + "-aquecendo").show();
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

defineLayout();