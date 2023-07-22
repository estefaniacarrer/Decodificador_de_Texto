// As "chaves" de criptografia que utilizaremos são:
// `A letra "e" é convertida para "enter"`
// `A letra "i" é convertida para "imes"`
// `A letra "a" é convertida para "ai"`
// `A letra "o" é convertida para "ober"`
// `A letra "u" é convertida para "ufat"`


const textArea = document.querySelector(".txt-in");
const mensagem = document.querySelector(".txt-out");
const informacao = document.querySelector(".informacao");
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDecriptar = document.querySelector(".btn-decriptar");
const btnCopy = document.querySelector(".btn-copy");

textArea.addEventListener("input", () => {
    const textoOriginal = textArea.value;
    const textoCorrigido = corrigirTexto(textoOriginal);
    textArea.value = textoCorrigido;
});

function corrigirTexto(texto) {
    return texto.toLowerCase().replace(/[áàãâä]/gi, 'a')
                               .replace(/[éèẽêë]/gi, 'e')
                               .replace(/[íìĩîï]/gi, 'i')
                               .replace(/[óòõôö]/gi, 'o')
                               .replace(/[úùũûü]/gi, 'u')
                               .replace(/ç/gi, 'c')
                               //.replace(/[^a-z]/gi, '');
}

function criptografarTexto() {
    const textoEncriptado = encriptar(textArea.value);
    mensagem.textContent = textoEncriptado;
    mostrarApenasMensagem();
    mensagem.style.display = "block";
}

function descriptografarTexto() {
    const textoDecriptado = decriptar(textArea.value);
    mensagem.textContent = textoDecriptado;
    mostrarApenasMensagem();
}

function mostrarApenasMensagem() {
    btnCopy.style.display = "block";

    // Esconde a seção de texto não encontrado
    const txtNoSection = document.querySelector(".txt-no");
    txtNoSection.style.display = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }

    return stringEncriptada;
}

function decriptar(stringDecriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDecriptada = stringDecriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDecriptada.includes(matrizCodigo[i][1])) {
            stringDecriptada = stringDecriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }

    return stringDecriptada;
}

function copiarTexto() {
    const textoCriptografado = mensagem.textContent;
    const textareaTemporario = document.createElement("textarea");
    textareaTemporario.value = textoCriptografado;
    document.body.appendChild(textareaTemporario);
    textareaTemporario.select();

    document.execCommand("copy");
    document.body.removeChild(textareaTemporario);

    // Mostra "Copiado!" no botão por 5 segundos e depois restaura o texto original
    const textoOriginalBotao = btnCopy.innerText;
    btnCopy.innerText = "Copiado!";
    setTimeout(() => {
        btnCopy.innerText = textoOriginalBotao;
    }, 2000);
}
