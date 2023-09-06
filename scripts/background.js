const reCurso = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas$/;
const reAula = /^https:\/\/www.estrategiaconcursos.com.br\/app\/dashboard\/cursos\/[0-9]{0,}\/aulas\/[0-9]{0,}\/videos\/[0-9]{0,}$/


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.title && (reCurso.test(tab.url) || reAula.test(tab.url))) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['scripts/inserir-elementos.js']
        });
    }
});
