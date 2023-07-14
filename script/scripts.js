import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

/*
//Conecta na API, atualiza gráfico, e lista de valores moedas
async function conectaAPI() {
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conectaTraduzido = await conecta.json();
    let tempo = geraHorario();
    let valor = conectaTraduzido.USDBRL.ask;
    adicionarDados(graficoParaDolar, tempo, valor);
    imprimeCotacao("dolar", valor);
}
//Atualiza a cada 5 segundos
setInterval(() => conectaAPI(), 5000);
*/

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoEuro = document.getElementById('graficoEuro');
const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Euro',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerEuro = new Worker('./script/workers/workerEuro.js');
workerEuro.postMessage('eur');

workerEuro.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("euro", valor);
    adicionarDados(graficoParaEuro, tempo, valor);
});

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("iene", valor);
    adicionarDados(graficoParaIene, tempo, valor);
});