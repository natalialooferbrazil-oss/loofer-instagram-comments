const track = document.querySelector(".track");
const cards = document.querySelectorAll(".track img");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const dotsContainer = document.getElementById("dots");

let indice = 0;
let autoplay;

// Quantos cards aparecem na tela
function cardsVisiveis() {
    return window.innerWidth <= 768 ? 1 : 3;
}

// Largura de um card + gap
function larguraCard() {
    const estilo = getComputedStyle(track);
    const gap = parseInt(estilo.gap) || 24;
    return cards[0].offsetWidth + gap;
}

// Cria bolinhas
function criarDots() {

    dotsContainer.innerHTML = "";

    const total = cards.length - cardsVisiveis() + 1;

    for (let i = 0; i < total; i++) {

        const dot = document.createElement("span");

        if (i === indice)
            dot.classList.add("active");

        dot.onclick = () => {

            indice = i;

            atualizar();

            reiniciarAutoPlay();

        }

        dotsContainer.appendChild(dot);

    }

}

// Atualiza posição
function atualizar() {

    track.style.transform =
        `translateX(-${indice * larguraCard()}px)`;

    [...dotsContainer.children].forEach((d, i) => {

        d.classList.toggle("active", i === indice);

    });

}

// Próximo
function proximo() {

    indice++;

    const limite = cards.length - cardsVisiveis();

    if (indice > limite)
        indice = 0;

    atualizar();

}

// Anterior
function anterior() {

    indice--;

    const limite = cards.length - cardsVisiveis();

    if (indice < 0)
        indice = limite;

    atualizar();

}

next.onclick = () => {

    proximo();

    reiniciarAutoPlay();

}

prev.onclick = () => {

    anterior();

    reiniciarAutoPlay();

}

// AutoPlay

function iniciarAutoPlay() {

    autoplay = setInterval(proximo, 4500);

}

function reiniciarAutoPlay() {

    clearInterval(autoplay);

    iniciarAutoPlay();

}

// Swipe

let inicio = 0;

track.addEventListener("touchstart", e => {

    inicio = e.touches[0].clientX;

});

track.addEventListener("touchend", e => {

    const fim = e.changedTouches[0].clientX;

    if (inicio - fim > 50)
        proximo();

    if (fim - inicio > 50)
        anterior();

});

// Modal

cards.forEach(card => {

    card.onclick = () => {

        overlay.style.display = "flex";

        overlayImg.src = card.src;

    }

});

overlay.onclick = () => {

    overlay.style.display = "none";

}

// Responsivo

window.addEventListener("resize", () => {

    if (indice > cards.length - cardsVisiveis())
        indice = 0;

    criarDots();

    atualizar();

});

// Inicialização

criarDots();

atualizar();

iniciarAutoPlay();
