document.addEventListener('DOMContentLoaded', () => {
    const chapterTitleEl = document.getElementById('chapter-title');
    const chapterSubtitleEl = document.getElementById('chapter-subtitle');
    const chapterContentEl = document.getElementById('chapter-content');

    const prevChapterButton = document.getElementById('prev-chapter');
    const nextChapterButton = document.getElementById('next-chapter');
    const prevChapterButtonBottom = document.getElementById('prev-chapter-bottom');
    const nextChapterButtonBottom = document.getElementById('next-chapter-bottom');

    const TOTAL_CHAPTERS = chapters.length;
    let currentChapter;

    async function loadChapter(chapterNumber) {
        if (chapterNumber < 1 || chapterNumber > TOTAL_CHAPTERS) {
            console.error("Tentativa de carregar capítulo inválido:", chapterNumber);
            chapterTitleEl.textContent = "Capítulo não encontrado";
            chapterSubtitleEl.style.display = 'none';
            chapterContentEl.innerHTML = "<p>O capítulo solicitado não existe ou o link está incorreto.</p>";
            prevChapterButton.disabled = true;
            nextChapterButton.disabled = true;
            prevChapterButtonBottom.disabled = true;
            nextChapterButtonBottom.disabled = true;
            return;
        }

        const chapterData = chapters[chapterNumber - 1];

        try {
            const response = await fetch(chapterData.file);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${chapterData.file}: ${response.statusText}`);
            }
            const textContent = await response.text();

            chapterTitleEl.textContent = chapterData.title;
            if (chapterData.subtitle) {
                chapterSubtitleEl.textContent = chapterData.subtitle;
                chapterSubtitleEl.style.display = 'block';
            } else {
                chapterSubtitleEl.style.display = 'none';
            }
            document.title = `${novelTitle} - ${chapterData.title}`;

            const paragraphs = textContent.split(/\r?\n\r?\n|\n\n+/);
            let htmlContent = '';
            paragraphs.forEach(p => {
                if (p.trim() !== '') {
                    htmlContent += `<p>${p.trim().replace(/\n/g, '<br>')}</p>`;
                }
            });
            chapterContentEl.innerHTML = htmlContent;

            currentChapter = chapterNumber;
            updateNavigationButtons();
            window.scrollTo(0, 0);

            localStorage.setItem('currentNovelChapter', currentChapter);
            history.pushState({ chapter: currentChapter }, "", `?chapter=${currentChapter}`);

        } catch (error) {
            chapterContentEl.innerHTML = `<p>Erro ao carregar o conteúdo do capítulo. Tente novamente mais tarde.</p>`;
            console.error("Erro no fetch:", error);
        }
    }

    function updateNavigationButtons() {
        // currentChapter é 1-based
        prevChapterButton.disabled = currentChapter === 1;
        nextChapterButton.disabled = currentChapter === TOTAL_CHAPTERS;
        prevChapterButtonBottom.disabled = currentChapter === 1;
        nextChapterButtonBottom.disabled = currentChapter === TOTAL_CHAPTERS;
    }

    nextChapterButton.addEventListener('click', () => {
        if (currentChapter < TOTAL_CHAPTERS) {
            loadChapter(currentChapter + 1);
        }
    });
    prevChapterButton.addEventListener('click', () => {
        if (currentChapter > 1) {
            loadChapter(currentChapter - 1);
        }
    });
    nextChapterButtonBottom.addEventListener('click', () => {
        if (currentChapter < TOTAL_CHAPTERS) {
            loadChapter(currentChapter + 1);
        }
    });
    prevChapterButtonBottom.addEventListener('click', () => {
        if (currentChapter > 1) {
            loadChapter(currentChapter - 1);
        }
    });

    function initializeChapter() {
        const params = new URLSearchParams(window.location.search);
        const chapterFromUrl = parseInt(params.get('chapter'));

        // Tenta carregar da URL (se válido)
        if (chapterFromUrl && chapterFromUrl >= 1 && chapterFromUrl <= TOTAL_CHAPTERS) {
            loadChapter(chapterFromUrl);
            return;
        }

        // Tenta carregar do localStorage (se válido)
        const savedChapter = localStorage.getItem('currentNovelChapter');
        const parsedSavedChapter = parseInt(savedChapter);
        if (parsedSavedChapter && parsedSavedChapter >= 1 && parsedSavedChapter <= TOTAL_CHAPTERS) {
            loadChapter(parsedSavedChapter);
            return;
        }

        // Padrão: carrega o primeiro capítulo (que é o chapterNumber 1 do sistema)
        loadChapter(1);
    }

    window.onpopstate = function(event) {
        if (event.state && event.state.chapter) {
            const chapterFromState = parseInt(event.state.chapter);
            if (chapterFromState && chapterFromState >= 1 && chapterFromState <= TOTAL_CHAPTERS) {
                loadChapter(chapterFromState);
            } else {
                loadChapter(1);
            }
        } else {
            initializeChapter();
        }
    };

    if (TOTAL_CHAPTERS > 0) {
        initializeChapter();
    } else {
        chapterTitleEl.textContent = "Nenhum capítulo encontrado";
        chapterSubtitleEl.style.display = 'none';
        chapterContentEl.innerHTML = "<p>Adicione capítulos à configuração no script.js.</p>";
        prevChapterButton.disabled = true;
        nextChapterButton.disabled = true;
        prevChapterButtonBottom.disabled = true;
        nextChapterButtonBottom.disabled = true;
    }
});