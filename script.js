console.log("Script carregou!");

const track = document.querySelector(".track");
const imagens = document.querySelectorAll(".track img");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

let indice = 0;

function larguraCard() {
    return imagens[0].getBoundingClientRect().width + 25;
}
function atualizar() {

    const largura = larguraCard();

    track.style.transform =
        `translateX(-${indice * largura}px)`;

}

next.onclick = () => {
    if (indice < imagens.length - 1) indice++;
    else indice = 0;
    atualizar();
};

prev.onclick = () => {
    if (indice > 0) indice--;
    else indice = imagens.length - 1;
    atualizar();
};

// autoplay
setInterval(() => {
    if (indice < imagens.length - 1) indice++;
    else indice = 0;

    atualizar();
}, 4500);

// swipe mobile
let inicio = 0;

track.addEventListener("touchstart", e => {
    inicio = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {

    const fim = e.changedTouches[0].clientX;

    if (inicio - fim > 50) {

        if (indice < imagens.length - 1) indice++;

        atualizar();

    }

    if (fim - inicio > 50) {

        if (indice > 0) indice--;

        atualizar();

    }

});

// ampliar imagem
imagens.forEach(img=>{

img.onclick=()=>{

const fundo=document.createElement("div");

fundo.style.position="fixed";
fundo.style.left=0;
fundo.style.top=0;
fundo.style.width="100%";
fundo.style.height="100%";
fundo.style.background="rgba(0,0,0,.9)";
fundo.style.display="flex";
fundo.style.alignItems="center";
fundo.style.justifyContent="center";
fundo.style.zIndex="999999";

const foto=document.createElement("img");

foto.src=img.src;
foto.style.maxWidth="95%";
foto.style.maxHeight="95%";
foto.style.borderRadius="18px";
foto.style.boxShadow="0 20px 60px rgba(0,0,0,.5)";

fundo.appendChild(foto);

document.body.appendChild(fundo);

fundo.onclick=()=>fundo.remove();

}

});
