let dadosEstufa
if (screen.width < 640 || screen.height < 480 || screen.width < 1024 || screen.height < 700) {

    $('.content').show()
    $('.errorComputer').hide()

} else {
    $('.content').hide()
    $('.errorComputer').show()
}

if (getCookie("loggedUser") == "true") {
    openPage('home.html', 'TecPlan')
}

function getCookie(k) {
    var cookies = " " + document.cookie;
    var key = " " + k + "=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
}

function setCookie(k, v, expira, path) {
    if (!path) path = "/";

    var d = new Date();
    d.setTime(d.getTime() + (expira * 1000));

    document.cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v) + "; expires=" + d.toUTCString() + "; path=" + path;
}

function openPage(page, title) {

    if (getCookie("loggedUser") == "true") {


        if (title == '' || title == undefined) {
            title = 'TecPlan'
        }
        $('.content').html('')

        $('.content').html(`<div class="loading"><img src="./images/logo-svg.svg" alt="Logo da tecPlan"><h6>Carregando...</h6></div>`)
        document.title = `${title}`
        $.ajax({
            url: `${page}`,
            type: 'get',
        })
            .done(function (data) {
                $('.content').html(data)
            })
    } else {
        logout()
    }
}

function controlarEstufa(id, title) {
    estufaId = parseInt(id)
    $('.modal').modal('hide');
    dadosEstufa = {
        'nome': 'teste',
        'temperatura': 16
    }
    openPage('estufa-control.html', title)

}


$('#form-login').on('submit', function (e) {
    e.preventDefault();

    let user = $('#user-login').val()
    let pass = $('#pass-login').val()

    if (user.length < 8 || pass.length < 8) {
        Swal.fire(
            'Campos Inválidos',
            'Os campos devem ter no mínimo 8 caracteres',
            'error'
        )
    } else {
        setCookie("loggedUser", "true", 10800);
        openPage('home.html', 'TecPlan | Home')
    }
})

function logout() {
    setCookie("loggedUser", "false", 999999999999);
    window.location.reload(true)
}

function abrirModal(idModal, closeModal) {
    if (closeModal != '') {
        $(`#${closeModal}`).modal('hide')
    }
    $(`#${idModal}`).modal('show')
}

$('#form-new-estufa').on('submit', function (e) {
    e.preventDefault()
    console.log('cadastrando nova estufa')
})

