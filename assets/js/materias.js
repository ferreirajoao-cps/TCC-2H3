function selecionarMateria(materia) {
    // Marca a matéria selecionada
    document.querySelector('input[name="materia"][value="' + materia + '"]').checked = true;
}

function jogar() {
    // Verifica qual matéria foi selecionada
    var materiaSelecionada = document.querySelector('input[name="materia"]:checked');
    
    if (materiaSelecionada) {
        // Armazena a matéria selecionada no sessionStorage
        sessionStorage.setItem('materia-selecionada', materiaSelecionada.value);
    } else {
        // Remove se nenhuma matéria foi selecionada
        sessionStorage.removeItem('materia-selecionada');
    }
}