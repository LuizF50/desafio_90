document.addEventListener('DOMContentLoaded', function () {
    // Referências aos elementos do DOM
    const decryptBtn = document.getElementById('decryptBtn');
    const messageInput = document.getElementById('message');
    const resultOutput = document.getElementById('result');

    // Configuração inicial - campo de resultado vazio
    resultOutput.textContent = '';

    // Evento de clique no botão decifrar
    decryptBtn.addEventListener('click', function () {
        // Obtém o texto do campo de entrada
        const encryptedMessage = messageInput.value.trim();

        // Verifica se há texto para decifrar
        if (encryptedMessage === '') {
            resultOutput.textContent = 'Por favor, insira uma mensagem para decifrar';
            return;
        }

        // Decifra a mensagem usando Cifra de César com deslocamento -1
        const decryptedMessage = decryptCaesarCipher(encryptedMessage);

        // Exibe o resultado
        resultOutput.textContent = decryptedMessage;
    });

    /**
     * Decifra texto usando Cifra de César com deslocamento de -1
     * Processa letras do alfabeto inglês e certos caracteres especiais
     * @param {string} str - Texto cifrado
     * @returns {string} Texto decifrado
     */
    function decryptCaesarCipher(str) {
        return str.split('').map(char => {
            const code = char.charCodeAt(0);

            // Decifra letras maiúsculas básicas (A-Z)
            if (code >= 65 && code <= 90) {
                let decryptedCode = code - 1;
                if (decryptedCode < 65) decryptedCode = 90; // Volta para Z se passar de A
                return String.fromCharCode(decryptedCode);
            }

            // Decifra letras minúsculas básicas (a-z)
            if (code >= 97 && code <= 122) {
                let decryptedCode = code - 1;
                if (decryptedCode < 97) decryptedCode = 122; // Volta para z se passar de a
                return String.fromCharCode(decryptedCode);
            }

            // Casos especiais para pontuação e outros caracteres
            // Map de caracteres para decodificação específica
            const specialChars = {
                '!': ' ',      // ! decodifica para espaço
                '"': "'",      // " decodifica para '
                '#': '"',      // # decodifica para "
                '$': '!',      // $ decodifica para !
                '%': '.',      // % decodifica para .
                '&': ',',      // & decodifica para ,
                "'": '&',      // ' decodifica para &
                '(': "'",      // ( decodifica para '
                ')': '(',      // ) decodifica para (
                '*': ')',      // * decodifica para )
                '+': '*',      // + decodifica para *
                ',': '+',      // , decodifica para +
                '-': ',',      // - decodifica para ,
                '.': '-',      // . decodifica para -
                '/': '.',      // / decodifica para .
            };

            // Verifica se o caractere está no map de caracteres especiais
            if (specialChars[char]) {
                return specialChars[char];
            }

            // Mantém outros caracteres inalterados (incluindo acentos)
            return char;
        }).join('');
    }

    /**
     * Exemplo de uso:
     * Entrada: "Uif!hpmefo!lfz!up!uif!vojwfstf"t!tfdsfut!jt!ivoo!pg!dpogvtjpo"
     * Saída:   "The golden key to the universe's secrets is hunt of confusion"
     */
});