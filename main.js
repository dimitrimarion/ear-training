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

const buttonControlPlay = document.querySelector(".control-play");

buttonControlPlay.addEventListener('click', function () {
    if (buttonControlPlay.classList.contains("paused")) {
        buttonControlPlay.classList.remove("paused");
        oscillator.disconnect();
    } else {
        buttonControlPlay.classList.add("paused");
        oscillator.onPlay();
    }
});

const guessButtons = document.querySelectorAll(".guess");
setButtonFreq();

const guesses = document.querySelector(".guesses");

guesses.addEventListener('mousedown', onGuess);
//guesses.addEventListener('mouseup', updateFreq);

const redoButton = document.querySelector(".redo");
redoButton.addEventListener('click', redo);

function setButtonFreq() {
    for (let button of guessButtons.entries()) {
        button[1].textContent = frequency.freqToGuess[button[0]];
    }
}

function onGuess(event) {
    console.log("button clicked");
    console.log(event.target);
    if (event.target.textContent === String(frequency.freqValue)) {
        event.target.classList.add("correct");
    } else {
        event.target.classList.add("wrong");
        for (let button of guessButtons) {
            if (button.textContent === String(frequency.freqValue)) {
                button.classList.add("correct");
            }
        }
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

function redo() {
    updateFreq();

    for (let button of guessButtons) {
        button.classList.remove("correct");
        button.classList.remove("wrong");  
    }
}