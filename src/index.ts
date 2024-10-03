import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import Markdown from 'reveal.js/plugin/markdown/markdown';
import Notes from 'reveal.js/plugin/notes/notes';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import './styles/global.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
import slidesIndex from './slidesIndex.json';
import flowchart from 'flowchart.js';

// Variable global para la instancia de Reveal.js
const deck = new Reveal({
    hash: true,
    plugins: [Highlight, Markdown, Notes],
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: true,
    progress: true,
    controls: true,
    touch: true,
    overview: true,
    width: '100%',
    height: '100%',
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.5,
});

// Función para inicializar los diagramas
function initializeDiagrams() {
    const diagramElements = document.querySelectorAll('.diagram-code');

    diagramElements.forEach((element: Element) => {
        const code = element.textContent || '';
        const diagramContainer = document.createElement('div');
        diagramContainer.className = 'diagram';

        // Reemplaza el elemento de código con el contenedor del diagrama
        element.parentElement!.replaceChild(diagramContainer, element);

        // Renderiza el diagrama
        const diagram = flowchart.parse(code);
        diagram.drawSVG(diagramContainer);
    });
}

// Función para cargar las diapositivas
async function loadSlides(day: string) {
    const response = await fetch(`./dias/${day}/diapositivas.html`);
    document.querySelector('.slides')!.innerHTML = await response.text();

    // Inicializar los diagramas después de cargar las diapositivas
    initializeDiagrams();

    // Resaltar el código
    hljs.highlightAll();

    // Sincronizar Reveal.js
    deck.sync();
}

// Función para cargar un día específico
const loadDay = async (day: string) => {
    await loadSlides(day);
};

// Función para crear el índice
const createIndex = async () => {
    document.querySelector('.slides')!.innerHTML = `
        <section>
            <h1>Índice de Diapositivas</h1>
            <ul>
                ${slidesIndex.dias.map(dia => `
                    <li>
                        <a href="#" onclick="loadDay('${dia.ruta}'); return false;">
                            Día ${dia.numero}: ${dia.titulo}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </section>
    `;

    hljs.highlightAll();
};

// Inicialización
window.onload = async () => {
    await createIndex();
    deck.initialize();
};

// Exponer funciones globalmente
(window as any).loadDay = loadDay;
(window as any).showIndex = createIndex;
