const questoes = [
    {
        pergunta: 'Qual é a capital do Brasil?',
        escolhas: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
        resposta: 'Brasília',
    },
    {
        pergunta: 'Qual é a capital da Argentina?',
        escolhas: ['Buenos Aires', 'Brasília', 'Lisboa', 'Paris'],
        resposta: 'Buenos Aires',
    },
    {
        pergunta: 'Qual é a capital da França?',
        escolhas: ['Roma', 'Madri', 'Paris', 'Londres'],
        resposta: 'Paris',
    },
    {
        pergunta: 'Qual é a capital da Espanha?',
        escolhas: ['Lisboa', 'Madri', 'Barcelona', 'Valência'],
        resposta: 'Madri',
    },
    {
        pergunta: 'Qual é a capital da Itália?',
        escolhas: ['Veneza', 'Milão', 'Roma', 'Nápoles'],
        resposta: 'Roma',
    },
    {
        pergunta: 'Qual é a capital do Canadá?',
        escolhas: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
        resposta: 'Ottawa',
    },
    {
        pergunta: 'Qual é a capital dos Estados Unidos?',
        escolhas: ['Nova York', 'Los Angeles', 'Chicago', 'Washington D.C'],
        resposta: 'Washington D.C',
    },
    {
        pergunta: 'Qual é a capital do Reino Unido?',
        escolhas: ['Liverpool', 'Manchester', 'Edimburgo', 'Londres'],
        resposta: 'Londres',
    },
];

const perguntaElement = document.querySelector('#pergunta');
const escolhaElements = document.querySelectorAll('.escolha');
const proximaButton = document.querySelector('#proxima');
const pontuacaoElement = document.querySelector('#pontuacao');
const errosElement = document.querySelector('#erros');

let perguntaAtual = 0;
let pontuacao = 0;
let erros = 0;
let respostaEscolhida = false;

function carregarPergunta() {
    const perguntaAtualData = questoes[perguntaAtual]
    perguntaElement.innerText = perguntaAtualData.pergunta;
    
    const escolhas = misturaRespostas(perguntaAtualData.escolhas);

    for(let i = 0; i < escolhaElements.length; i++) {
       escolhaElements[i].innerText = escolhas[i];
    }

    respostaEscolhida = false;
}

function misturaRespostas(array) {
    let atualIndex = array.length;
    let valorTemporario;
    let aleatorioIndex;

    while(0 !== atualIndex) {
        aleatorioIndex = Math.floor(Math.random() * atualIndex);
        atualIndex -= 1;

        valorTemporario = array[atualIndex];
        array[atualIndex] = array[aleatorioIndex];
        array[aleatorioIndex] = valorTemporario;
    }

    return array;
}

function verificarResposta(evento) {

    if(respostaEscolhida) return;

    respostaEscolhida = true;

    if(evento.target.innerText === questoes[perguntaAtual].resposta) {
        pontuacao++;
        pontuacaoElement.innerText = `Pontuação ${pontuacao}`;
        alert(`A resposta está correta, parabéns !!!`);
    } else {
        erros++;
        errosElement.innerText = `Erros ${erros}`;
        alert(`Tente outra vez! A resposta correta é: ${questoes[perguntaAtual].resposta}`);
    }
 
}

escolhaElements.forEach((botao) => {
    botao.addEventListener('click', verificarResposta);
});

proximaButton.addEventListener('click', () => {
    if(!respostaEscolhida) {
        alert('Por favor, responda a pergunta !');
    }

    perguntaAtual++;

    if(perguntaAtual < questoes.length) {
        carregarPergunta();
    } else {
        alert(`Fim do jogo! Você acertou ${pontuacao} de ${questoes.length} perguntas.`);
        reiniciarQuiz();
    }
});


function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    erros = 0;
    pontuacaoElement.innerText = `Pontuação: 0`;
    errosElement.innerText = `Erros: 0`;
    carregarPergunta();
}

carregarPergunta();