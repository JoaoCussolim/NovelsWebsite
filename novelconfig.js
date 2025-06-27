const novelMainTitleEl = document.getElementById('novel-main-title-index');

const novelTitle = "Conquistas do Chico";

const chapters = [
    { file: 'chapters/ch1.txt', title: 'Capítulo 1', subtitle: 'Prólogo' },
    { file: 'chapters/ch2.txt', title: 'Capítulo 2', subtitle: 'Professor Chico' },
    { file: 'chapters/ch3.txt', title: 'Capítulo 3', subtitle: 'Projeto Gênese' },
];

novelMainTitleEl.textContent = novelTitle;