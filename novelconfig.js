const novelMainTitleEl = document.getElementById('novel-main-title-index');

const novelTitle = "Conquistas do Chico";

const chapters = [
    { file: 'chapters/ch0.txt', title: 'Capítulo 0', subtitle: 'Prólogo' },
    { file: 'chapters/ch1.txt', title: 'Capítulo 1', subtitle: 'Parâmetros' },
];

novelMainTitleEl.textContent = novelTitle;