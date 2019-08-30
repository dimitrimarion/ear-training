'use strict'

import Frequency from './src/Frequency';

const MAX_FREQ = 5000;
const STEP = 100;
const NB_GUESS = 3;

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