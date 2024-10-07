import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import Notes from 'reveal.js/plugin/notes/notes';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import './styles/global.css';
import 'reveal.js/plugin/highlight/monokai.css';
import slidesIndex from './slidesIndex.json';
import flowchart from 'flowchart.js';

// Variable para la instancia de Reveal.js
let deck: Reveal.Api;

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
    const slidesHtml = await response.text();
    document.querySelector('.slides')!.innerHTML = slidesHtml;

    // Inicializar los diagramas después de cargar las diapositivas
    initializeDiagrams();

    // Si ya existe una instancia de Reveal, la destruimos
    if (deck) {
        deck.destroy();
    }

    // Inicializamos Reveal.js nuevamente
    deck = new Reveal({
        hash: true,
        plugins: [Highlight, Notes],
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
        pdfSeparateFragments: false,
        pdfMaxPagesPerSlide: 1,
        pdfPageHeightOffset: -1,
        // Elimina o comenta la siguiente línea
        // highlight: {
        //     theme: 'monokai',
        // },
    });

    deck.initialize();
}

// Función para crear el índice
const createIndex = async () => {
    document.querySelector('.slides')!.innerHTML = `
        <section>
            <h1>Índice de Diapositivas</h1>
            <ul>
                ${slidesIndex.dias.map(dia => `
                    <li>
                        <a href="?day=${dia.ruta}">
                            Día ${dia.numero}: ${dia.titulo}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </section>
    `;

    if (deck) {
        deck.destroy();
    }

    // Inicializamos Reveal.js nuevamente para el índice
    deck = new Reveal({
        hash: true,
        plugins: [Highlight, Notes],
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
        pdfSeparateFragments: false,
        pdfMaxPagesPerSlide: 1,
        pdfPageHeightOffset: -1,
        // Elimina o comenta la siguiente línea
        // highlight: {
        //     theme: 'monokai',
        // },
    });

    deck.initialize();
};

// Función para obtener parámetros de la URL
function getURLParameter(name: string): string | null {
    return new URLSearchParams(window.location.search).get(name);
}

// Inicialización
window.onload = async () => {
    const day = getURLParameter('day');
    if (day) {
        await loadSlides(day);
    } else {
        await createIndex();
    }
};

// Exponer funciones globalmente (si es necesario)
(window as any).loadDay = loadSlides;
(window as any).showIndex = createIndex;
