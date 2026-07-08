const viewport = document.querySelector(".viewport");
const track = document.querySelector(".track");
const imagens = document.querySelectorAll(".track img");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

let indice = 0;

function larguraCard() {
    return imagens[0].offsetWidth + 22;
}

function atualizar() {
    track.scrollTo({
        left: indice * larguraCard(),
        behavior: "smooth"
    });
}

// BOTÃO DIREITA
next.addEventListener("click", () => {

    indice++;

    if (indice >= imagens.length) {
        indice = 0;
    }

    atualizar();

});

// BOTÃO ESQUERDA
prev.addEventListener("click", () => {

    indice--;

    if (indice < 0) {
        indice = imagens.length - 1;
    }

    atualizar();

});

// AUTOPLAY
setInterval(() => {

    indice++;

    if (indice >= imagens.length) {
        indice = 0;
    }

    atualizar();

}, 4500);

// SWIPE MOBILE

let inicioX = 0;

track.addEventListener("touchstart", e => {
    inicioX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {

    const fimX = e.changedTouches[0].clientX;

    if (inicioX - fimX > 50){

        indice++;

        if(indice >= imagens.length){
            indice = 0;
        }

        atualizar();

    }

    if(fimX - inicioX > 50){

        indice--;

        if(indice < 0){
            indice = imagens.length - 1;
        }

        atualizar();

    }

});

// AMPLIAR IMAGEM

imagens.forEach(img => {

    img.addEventListener("click", ()=>{

        const fundo = document.createElement("div");

        fundo.style.position="fixed";
        fundo.style.left="0";
        fundo.style.top="0";
        fundo.style.width="100%";
        fundo.style.height="100%";
        fundo.style.background="rgba(0,0,0,.88)";
        fundo.style.display="flex";
        fundo.style.alignItems="center";
        fundo.style.justifyContent="center";
        fundo.style.zIndex="999999";

        const foto = document.createElement("img");

        foto.src = img.src;
        foto.style.maxWidth="95%";
        foto.style.maxHeight="95%";
        foto.style.borderRadius="20px";
        foto.style.boxShadow="0 30px 80px rgba(0,0,0,.5)";

        fundo.appendChild(foto);

        fundo.addEventListener("click",()=>{

            fundo.remove();

        });

        document.body.appendChild(fundo);

    });

});
