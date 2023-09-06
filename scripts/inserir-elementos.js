(() => {
    const reCurso = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas$/;
    const reAulas = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas\/[0-9]{0,}\/videos\/[0-9]{0,}$/;

    const conteudo = document.querySelector('#boxConteudo');
    const elmCurso = conteudo.querySelector('.CourseInfo');
    const elmAulas = conteudo.querySelectorAll('.LessonList-item');

    if (reCurso.test(document.URL) || reAulas.test(document.URL)) {
        inserirBotaoDownloadCurso(elmCurso);
        elmAulas.forEach(elmAula => {
            inserirBotaoDownloadAula(elmAula);
        });
    }
})();


/**
 * 
 * @param {HTMLElement} elmCurso
 */
function inserirBotaoDownloadCurso(elmCurso) {
    const elmPorcentagem = elmCurso.querySelector('.textoPorcentagem');

    const botao403 = document.createElement('button');
    botao403.classList.add('Button', '-medium', 'estrategia-403');
    botao403.textContent = 'Baixar';

    elmPorcentagem.insertAdjacentElement('afterend', botao403);
    return botao403;
}


/**
 * 
 * @param {HTMLElement} elmAula
 */
function inserirBotaoDownloadAula(elmAula) {
    const elmLateral = elmAula.querySelector('.Collapse-header-side');

    const botao403 = document.createElement('button');
    botao403.classList.add('Button', '-small', 'estrategia-403');
    botao403.textContent = 'Baixar';

    elmLateral.insertAdjacentElement('beforebegin', botao403);
    return botao403;
}
