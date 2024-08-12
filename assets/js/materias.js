function selecionarMateria(materia) {
    document.querySelector('input[name="materia"][value="' + materia + '"]').checked = true;
}

function jogar() {
    var materiaSelecionada = document.querySelector('input[name="materia"]:checked');
    if (materiaSelecionada) {
        sessionStorage.setItem('materia-selecionada', materiaSelecionada.value);
    } else {
        sessionStorage.removeItem('materia-selecionada');
    }
}
