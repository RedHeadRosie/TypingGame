const quotes = [
    'I wish you were as accurate, & as much to be relied on as I am myself.',
    'Do anything, but let it produce joy',
    'Happiness is a choice, a repetitive one',
    'The secret of life is enjoying the passage of time.',
    'Participate in life instead of just watching it pass you by',
    'Stop seeking out the storms and enjoy more fully the sunlight',
    'And in the end, it’s not the years in your life that count. It’s the life in your years.',
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let targetWord;
let wordQueue;
let highlightPosition;
let startTime;

function startGame() {
    console.log("Game started!");

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    startTime = new Date().getTime();

    document.body.className = "";
    start.className = "started";
    setTimeout(() => { start.className = "button"; }, 2000);

}

function checkInput() {
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
    const typedValue = input.value.trim();

    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }

    wordQueue.shift(); //shift removes first item (0th element)
    input.value = ""; // empty textbox
    quote.childNodes[highlightPosition].className = "";  

    if (wordQueue.length === 0) { // if we have run out of words then game over.
        gameOver();
        return;
    }

    highlightPosition++;                           
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratuations!</span><br> 
    You finished in ${elapsedTime / 1000} seconds.
`;
} 

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);
