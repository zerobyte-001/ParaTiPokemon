const startScreen = document.getElementById('start-screen');
const fireflyContainer = document.getElementById('firefly-container');
const canvasSpace = document.getElementById('canvas-space');
const starsBackground = document.getElementById('stars-background');

const messages = [
    "Estas flores son para ti, cochinita 🌻",
    "Ya báñate, por favor (pero igual te quiero)",
    "Toma agua, alien de mi corazón 💧",
    "Un girasol para mi persona favorita (y más terca)",
    "Ven te invito a comer algo, paga tú, claro",
    "Despierta, ya pasó medio día, floja",
    "Te compré esto para que dejes de renegar",
    "Un girasol brillante para alguien igual de intensa",
    "Ponte bloqueador que te vas a quemar",
    "Respira hondo y deja de estresarte por todo",
    "Te amo más que al wifi de alta velocidad",
    "Una flor amarilla porque sé que te encantan (no me niegues)",
    "Córtate las uñas de los pies ya, porfa",
    "Eres mi distracción favorita cuando debo estudiar",
    "Deja el celular un ratito y búscame",
    "Te daría un abrazo, pero con lo que reniegas me da miedo",
    "Un girasol para la dueña de mis quincenas",
    "Come bien o me enojo",
    "Te ves bien hoy... para ser tú",
    "Aquí tienes tu dosis diaria de atención",
    "¡Feliz Día de las Flores Amarillas!",
    "Que esta flor te alcance hoy",
    "Tu sonrisa hace bien a mis días",
    "Contigo todo lugar es bonito",
    "Eres luz en mi vida",
    "El amarillo también dice 'te quiero'",
    "Gracias por sumar luz a mis días",
    "Contigo el día pesa menos",
    "Esta flor te recuerda cuánto vales",
    "Hoy el amarillo lleva tu nombre",
    "Siempre tienes un lugar aquí",
    "Gracias por quedarte siempre",
    "Un girasol para quien ilumina",
    "Que nada apague tu brillo",
    "Hoy celebro tenerte cerca",
    "Me gustas más que el girasol",
    "Tu alegría es contagiosa",
    "Admiro demasiado tu forma de ser",
    "Haces que lo difícil se vea fácil",
    "Qué bonito es coincidir contigo",
    "Eres de lo mejor que tengo",
    "Tu paz es mi lugar favorito",
    "Tienes un corazón gigante",
    "Gracias por existir y estar",
    "Me encantas muchísimo",
    "Tu energía ilumina cualquier lugar",
    "Un día a tu lado es un gran día",
    "Eres arte puro",
    "Me das tanta calma",
    "No hay nadie como tú",
    "Brillas con luz propia",
    "Cada momento contigo es único",
    "Tu risa es mi sonido favorito",
    "Te mereces el universo entero",
    "Haces mi mundo mucho más feliz",
    "Eres mi sol en días nublados",
    "Qué fortuna la mía de conocerte",
    "Todo es mejor si estás cerca",
    "Eres una persona maravillosa",
    "Te quiero muchísimo hoy y siempre"
];

let firefliesData = [];
let availableMessages = [];

// Iniciar experiencia al hacer clic en la pantalla de inicio
startScreen.addEventListener('click', () => {
    startScreen.style.display = 'none';
    fireflyContainer.style.display = 'block';

    // --- REPRODUCIR LA MÚSICA LOCAL (MP3) AL TOCAR ---
    const backgroundAudio = document.getElementById('background-audio');
    if (backgroundAudio) {
        backgroundAudio.play().catch(error => {
            console.log("Error al reproducir el audio:", error);
        });
    }

    initStars();
    initFireflies();
    requestAnimationFrame(updateAnimation);

    // Lanzar estrellas fugaces periódicamente
    setInterval(createShootingStar, 3500);

    // Cambiar los textos de las luciérnagas cada 15 segundos sin repetir entre ellas
    setInterval(changeFireflyMessages, 15000);
});

// Rellena y baraja la lista de mensajes para evitar duplicados
function refillAvailableMessages() {
    availableMessages = [...messages].sort(() => Math.random() - 0.5);
}

// Obtiene un mensaje único de la bolsa aleatoria
function getUniqueMessage() {
    if (availableMessages.length === 0) {
        refillAvailableMessages();
    }
    return availableMessages.pop();
}

// Función que actualiza los textos en pantalla cada 15 segundos
function changeFireflyMessages() {
    if (fireflyContainer.style.display === 'none') return;
    refillAvailableMessages();

    firefliesData.forEach(f => {
        if (availableMessages.length > 0) {
            f.textElement.textContent = getUniqueMessage();
        }
    });
}

// Crear el fondo de estrellas estáticas parpadeantes
function initStars() {
    starsBackground.innerHTML = '';
    const totalStars = 55;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * screenWidth}px`;
        star.style.top = `${Math.random() * screenHeight}px`;

        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;

        starsBackground.appendChild(star);
    }
}

// Crear estrellas fugaces
function createShootingStar() {
    if (fireflyContainer.style.display === 'none') return;

    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const startX = Math.random() * screenWidth + (screenWidth * 0.2);
    const startY = Math.random() * (screenHeight * 0.4);

    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;

    starsBackground.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 1200);
}

function initFireflies() {
    canvasSpace.innerHTML = ''; 
    firefliesData = [];

    const isMobile = window.innerWidth < 768;
    const totalFireflies = isMobile ? 15 : 50; 

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const marginX = 90;
    const marginY = 80;

    // Inicializamos la bolsa de mensajes al arrancar
    refillAvailableMessages();

    for (let i = 0; i < totalFireflies; i++) {
        const item = document.createElement('div');
        item.classList.add('firefly-item');

        let x = marginX + Math.random() * (screenWidth - (marginX * 2));
        let y = marginY + Math.random() * (screenHeight - (marginY * 2));

        let vx = (Math.random() - 0.5) * 0.7;
        let vy = (Math.random() - 0.5) * 0.7;

        const flowerSpan = document.createElement('span');
        flowerSpan.classList.add('flower-emoji');
        flowerSpan.textContent = '🌻';
        flowerSpan.style.animationDelay = `${Math.random() * 3}s`;
        flowerSpan.style.animationDuration = `${2 + Math.random() * 2}s`;
        item.appendChild(flowerSpan);

        const p = document.createElement('p');
        // Asignamos un mensaje único y sin repetir en pantalla
        p.textContent = getUniqueMessage();
        item.appendChild(p);

        canvasSpace.appendChild(item);

        firefliesData.push({
            element: item,
            textElement: p, // Guardamos la referencia para cambiarlo cada 15s
            x: x,
            y: y,
            vx: vx,
            vy: vy
        });
    }
}

function updateAnimation() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const minX = 80;
    const maxX = screenWidth - 80;
    const minY = 60;
    const maxY = screenHeight - 60;

    firefliesData.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;

        if (f.x <= minX) {
            f.x = minX;
            f.vx *= -1;
        } else if (f.x >= maxX) {
            f.x = maxX;
            f.vx *= -1;
        }

        if (f.y <= minY) {
            f.y = minY;
            f.vy *= -1;
        } else if (f.y >= maxY) {
            f.y = maxY;
            f.vy *= -1;
        }

        f.element.style.left = `${f.x}px`;
        f.element.style.top = `${f.y}px`;
    });

    requestAnimationFrame(updateAnimation);
}

window.addEventListener('resize', () => {
    initStars();
    if (fireflyContainer.style.display === 'block') {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        firefliesData.forEach(f => {
            f.x = Math.min(Math.max(f.x, 80), screenWidth - 80);
            f.y = Math.min(Math.max(f.y, 60), screenHeight - 60);
        });
    }
});
