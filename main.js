// create web audio api context
var audioCtx = new AudioContext();

// create Oscillator node
var oscillator = audioCtx.createOscillator();

oscillator.type = 'square';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.start();

const buttonStart = document.querySelector('.start');

buttonStart.addEventListener('click', function() {
    oscillator.connect(audioCtx.destination);
}, false);

const buttonStop = document.querySelector('.stop');

buttonStop.addEventListener('click', function() {
    oscillator.disconnect(audioCtx.destination);
}, false);