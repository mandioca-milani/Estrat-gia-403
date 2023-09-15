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
 * Insere o botão de download do curso selecionado.
 * 
 * @param {HTMLElement} elmCurso elemento raiz do curso.
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
 * Executa o download do curso selecionado.
 * 
 * @param {HTMLElement} elmCurso elemento raiz do curso.
 */
function botaoDownloadCursoOnClick(elmCurso) {

}


/**
 * Insere o botão de download da aula selecionada.
 * 
 * @param {HTMLElement} elmAula elemento raiz da aula.
 */
function inserirBotaoDownloadAula(elmAula) {
    const elmLateral = elmAula.querySelector('.Collapse-header-side');

    const botao403 = document.createElement('button');
    botao403.classList.add('Button', '-small', 'estrategia-403');
    botao403.textContent = 'Baixar';

    botao403.onclick = () => {
        botaoDownloadAulaOnClick(elmAula);
    }

    elmLateral.insertAdjacentElement('beforebegin', botao403);
    return botao403;
}


/**
 * Executa o download da aula selecionada.
 * 
 * @param {HTMLElement} elementoAula elemento raiz da aula.
 */
function botaoDownloadAulaOnClick(elementoAula) {
    // abre a aula selecionada caso esteja fechada
    if (elementoAula.querySelector('.isOpened') == null) {
        elementoAula.querySelector('.Collapse-header').click();
    }

    // expressões regulares
    const reLivros = /^https:\/\/api.estrategiaconcursos.com.br\/api\/aluno\/\1(?<tipo>pdfSimplificado|pdfGrifado|pdf)\/download\/[0-9]{0,}\?.*$/;
    const reResumos = /^https:\/\/api.estrategiaconcursos.com.br\/api\/video\/[0-9]{0,}\/download\/\1(?<tipo>resumo|slideshow|mapa_mental)\?.*$/;

    // estrutura da aula
    const aula = {
        livros: {
            resumo: '',
            normal: '',
            alunos: ''
        },
        videos: []
    };

    // seleciona todos os elementos que contém os livros
    const elementoLivros = Array.from(elementoAula.querySelectorAll('a.LessonButton'))
        .filter(link => reLivros.test(link.href));


    // captura os livros da aula
    elementoLivros.forEach(elementoLivro => {
        const tipo = reLivros.exec(elementoLivro.href)[1];

        if (tipo == 'pdfSimplificado') {
            aula.livros.resumo = elementoLivro.href;
        } else if (tipo == 'pdf') {
            aula.livros.alunos = elementoLivro.href;
        } else if (tipo == 'pdfGrifado') {
            aula.livros.normal = elementoLivro.href;
        }
    });


    // seleciona todos os elementos que contem os vídeos
    const elementoVideos = Array.from(elementoAula.querySelectorAll('a.VideoItem'));

    // captura os vídeos e os resumos
    elementoVideos.forEach(elementoVideo => {
        elementoVideo.click();

        // seleciona todos os elementos que contem os resumos
        const elementoResumos = Array.from(elementoAula.querySelectorAll('a.LessonButton'))
            .filter(link => reResumos.test(link.href));

        const video = {
            resumo: '',
            slides: '',
            mental: '',
            v720p: '',
            v480p: '',
            v360p: '',
            audio: ''
        };

        // captura os resumos do video
        elementoResumos.forEach(elementoResumo => {
            const tipo = reResumos.exec(elementoResumo.href)[1];

            if (tipo == 'resumo') {
                video.resumo = elementoResumo.href;
            } else if (tipo == 'slideshow') {
                video.slides = elementoResumo.href;
            } else if (tipo == 'mapa_mental') {
                video.mental = elementoResumo.href;
            }
        });

        aula.videos.push(video);
    });

    return aula;
}
