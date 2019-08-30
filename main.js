'use strict'

const MAX_FREQ = 5000;
const STEP = 100;
const NB_GUESS = 3;

function Frequency() {
    this.freqRange = []
    this.freqToGuess = [];
    this.freqValue = 0;
}

Frequency.prototype.fillFreqRange = function(maxFreq, step) {
    this.freqRange = Array.from(Array(MAX_FREQ/STEP +1).keys()).map(x => x*STEP).slice(1);
}

Frequency.prototype.fillFreqToGuess = function(nbGuess) {
    this.freqToGuess = Array.from({length: NB_GUESS}, x => this.freqRange[random(this.freqRange.length)]);
}

Frequency.prototype.setFreqValue = function() {
    this.freqValue = this.freqToGuess[random(this.freqToGuess.length)];
}

function random(bound) {
    return Math.floor(Math.random()*bound);
}

const frequency = new Frequency();
frequency.fillFreqRange(MAX_FREQ, STEP);
frequency.fillFreqToGuess(NB_GUESS);
frequency.setFreqValue();

console.log(frequency.freqRange);
console.log(frequency.freqToGuess);
console.log(frequency.freqValue);

// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(frequency.freqValue, audioCtx.currentTime); // value in hertz

const buttonStart = document.querySelector('.start');

let oscillatorStarted = false;

buttonStart.addEventListener('click', function() {

    oscillator.connect(audioCtx.destination);

    if (!oscillatorStarted) {
        oscillator.start();
        oscillatorStarted = true;
    }   
    
}, false);

const buttonStop = document.querySelector('.stop');

buttonStop.addEventListener('click', function() {
     oscillator.disconnect(audioCtx.destination);
}, false);

const guessButtons = document.querySelectorAll(".guess");

for (let button of guessButtons.entries()) {
    button[1].textContent = frequency.freqToGuess[button[0]];
}

const guesses = document.querySelector(".guesses");

guesses.addEventListener('mousedown', function(event) {
    console.log("button clicked");
    console.log(event.target);
    if (event.target.textContent === String(frequency.freqValue)) {
        console.log("correct");
    } else {
        console.log("wrong");
    }
});

guesses.addEventListener('mouseup', function() {

    console.log("mouse up");

    frequency.fillFreqToGuess(NB_GUESS);
    frequency.setFreqValue();

    for (let button of guessButtons.entries()) {
        button[1].textContent = frequency.freqToGuess[button[0]];
    }

    oscillator.frequency.setValueAtTime(frequency.freqValue, audioCtx.currentTime);

    console.log(frequency.freqRange);
    console.log(frequency.freqToGuess);
    console.log(frequency.freqValue);
})