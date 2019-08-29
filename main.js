'use strict'

const MAX_FREQ = 5000;
const STEP = 100;

// Sequence of frequencies from 100Hz to 5000Hz: [100, 200, ... , 4900, 5000] 
const freqRange = Array.from(Array(MAX_FREQ/STEP +1).keys()).map(x => x*STEP).slice(1);

// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

const freqValue = freqRange[Math.floor(Math.random()*freqRange.length)];
console.log(freqValue);

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(freqValue, audioCtx.currentTime); // value in hertz
oscillator.start();

const buttonStart = document.querySelector('.start');

buttonStart.addEventListener('click', function() {
    oscillator.connect(audioCtx.destination);
}, false);

const buttonStop = document.querySelector('.stop');

buttonStop.addEventListener('click', function() {
    oscillator.disconnect(audioCtx.destination);
}, false);