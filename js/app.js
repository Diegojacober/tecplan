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

        Swal.fire({
            title: 'Deseja instalar o app',
            text: "Acesse de forma simples em seu telefone",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#B6C625',
            cancelButtonColor: '#ddd4',
            confirmButtonText: 'Instalar',
            cancelButtonText: 'Não',
          }).then((result) => {
            if (result.isConfirmed) {
             installApp()
            }
          })
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

let deferredPrompt; // Allows to show the install prompt
let setupButton;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log("beforeinstallprompt fired");
    // if (setupButton == undefined) {
    //     setupButton = document.getElementById("setup_button");
    // }
    // // Show the setup button
    // setupButton.style.display = "inline";
    // setupButton.disabled = false;
});

function installApp() {
    // Show the prompt
    deferredPrompt.prompt();
    //setupButton.disabled = true;
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA setup accepted');
                // hide our user interface that shows our A2HS button
                //setupButton.style.display = 'none';
            } else {
                console.log('PWA setup rejected');
            }
            deferredPrompt = null;
        });
}