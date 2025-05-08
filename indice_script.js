document.addEventListener('DOMContentLoaded', () => {
    const chapterListBodyEl = document.getElementById('chapter-list-body');

    document.title = `Índice - ${novelTitle}`;

    if (chapters.length > 0) {
        chapters.sort((a, b) => {
            const numA = parseInt(a.title.split(' ')[1]); // Extrai o número de "Capítulo X"
            const numB = parseInt(b.title.split(' ')[1]);
            return numB - numA; // numB - numA para ordem decrescente
        });

        chapters.forEach((chapter) => {
            const numericPartOfTitle = parseInt(chapter.title.split(' ')[1]);
            const chapterNumberForLink = numericPartOfTitle + 1;

            const row = document.createElement('tr');
            row.addEventListener('click', () => {
                window.location.href = `index.html?chapter=${chapterNumberForLink}`;
            });

            const cellChapter = document.createElement('td');
            cellChapter.textContent = chapter.title;

            const cellTitle = document.createElement('td');
            cellTitle.textContent = chapter.subtitle || chapter.title;

            row.appendChild(cellChapter);
            row.appendChild(cellTitle);
            chapterListBodyEl.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = "Nenhum capítulo encontrado.";
        row.appendChild(cell);
        chapterListBodyEl.appendChild(row);
    }
});