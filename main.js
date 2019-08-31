'use strict'

import Frequency from './src/Frequency';
import Oscillator from './src/Oscillator';

const MAX_FREQ = 5000;
const STEP = 100;
const NB_GUESS = 4;

const frequency = new Frequency();
frequency.fillFreqRange(MAX_FREQ, STEP);
frequency.fillFreqToGuess(NB_GUESS);
frequency.setFreqValue();

console.log(frequency.freqRange);
console.log(frequency.freqToGuess);
console.log(frequency.freqValue);

const oscillator = new Oscillator('sine', frequency.freqValue);
oscillator.init();

const buttonStart = document.querySelector('.start');
buttonStart.addEventListener('click', function () {
    oscillator.onPlay();
} , false);

const buttonStop = document.querySelector('.stop');
buttonStop.addEventListener('click', function() {
     oscillator.disconnect();
}, false);

const guessButtons = document.querySelectorAll(".guess");
setButtonFreq();

const guesses = document.querySelector(".guesses");

guesses.addEventListener('mousedown', onGuess);
guesses.addEventListener('mouseup', updateFreq);

function setButtonFreq() {
    for (let button of guessButtons.entries()) {
        button[1].textContent = frequency.freqToGuess[button[0]];
    }
}

function onGuess(event) {
    console.log("button clicked");
    console.log(event.target);
    if (event.target.textContent === String(frequency.freqValue)) {
        console.log("correct");
    } else {
        console.log("wrong");
    }
}

function updateFreq() {
    console.log("mouse up");

    frequency.fillFreqToGuess(NB_GUESS);
    frequency.setFreqValue();

    setButtonFreq();

    oscillator.setFrequency(frequency.freqValue);

    console.log(frequency.freqRange);
    console.log(frequency.freqToGuess);
    console.log(frequency.freqValue);
}