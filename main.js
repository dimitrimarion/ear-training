'use strict'

import Frequency from './src/Frequency';
import Oscillator from './src/Oscillator';

const MAX_FREQ = 5000;
const MIN_FREQ = 100;
const STEP = 100;
const NB_GUESS = 4;

const frequency = new Frequency();
frequency.fillFreqRange(MIN_FREQ, MAX_FREQ, STEP);
frequency.fillFreqToGuess(NB_GUESS);
frequency.setFreqValue();

const oscillator = new Oscillator('sine', frequency.freqValue);
oscillator.init();

const buttonControlPlay = document.querySelector(".control-play");
buttonControlPlay.addEventListener('click', function () {
    if (buttonControlPlay.classList.contains("paused")) {
        pause();
    } else {
        buttonControlPlay.classList.add("paused");
        oscillator.onPlay();
    }
});

const guessButtons = document.querySelectorAll(".guess");
setButtonFreq();

const guesses = document.querySelector(".guesses");
guesses.addEventListener('mousedown', onGuess);

const redoButton = document.querySelector(".redo");
redoButton.addEventListener('click', redo);

function setButtonFreq() {
    for (let button of guessButtons.entries()) {
        button[1].textContent = frequency.freqToGuess[button[0]];
    }
}

function pause () {
    buttonControlPlay.classList.remove("paused");
    oscillator.disconnect();
}

function onGuess(event) {
    if (buttonControlPlay.classList.contains("paused")) {
        pause();
    }

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
    frequency.fillFreqToGuess(NB_GUESS);
    frequency.setFreqValue();
    setButtonFreq();

    oscillator.setFrequency(frequency.freqValue);
}

function redo() {
    updateFreq();

    for (let button of guessButtons) {
        button.classList.remove("correct");
        button.classList.remove("wrong");  
    }
}