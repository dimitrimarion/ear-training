'use strict'

const MAX_FREQ = 5000;
const STEP = 100;
const NB_GUESS = 3;

function random(bound) {
    return Math.floor(Math.random()*bound);
}

// Sequence of frequencies from 100Hz to 5000Hz: [100, 200, ... , 4900, 5000] 
const freqRange = Array.from(Array(MAX_FREQ/STEP +1).keys()).map(x => x*STEP).slice(1);
console.log(freqRange);

// Create an array with 3 freq choosen randomly
const freqToGuess = Array.from({length: NB_GUESS}, x => freqRange[random(freqRange.length)]);
console.log(freqToGuess);

// Get the freq to guess
const freqValue = freqToGuess[random(freqToGuess.length)];
console.log(freqValue);

// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(freqValue, audioCtx.currentTime); // value in hertz

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
    button[1].textContent = freqToGuess[button[0]];
}