const reCurso = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas$/;
const reAula = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas\/[0-9]{0,}\/videos\/[0-9]{0,}$/


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.title && (reCurso.test(tab.url) || reAula.test(tab.url))) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: inserirBotaoCurso
        });
    }
});


function inserirBotaoCurso() {
    const titulo = document.querySelector('.textoPorcentagem');
    if (!titulo) { return }

    let estrategia403 = document.createElement('button');
    estrategia403.classList.add('Button', '-medium', 'estrategia-403');
    estrategia403.textContent = 'Baixar';
    titulo.insertAdjacentElement('afterend', estrategia403);

    const aulas = document.querySelectorAll('.Collapse-header-side');
    aulas.forEach(aula => {
        let estrategia403 = document.createElement('button');
        estrategia403.classList.add('Button', '-small', 'estrategia-403');
        estrategia403.textContent = 'Baixar';
        aula.insertAdjacentElement('beforebegin', estrategia403)
    });
}
