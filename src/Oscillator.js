'use strict'

function Oscillator(type, frequency) {
    this.audioCtx = new AudioContext();
    this.oscillatorNode = null;
    this.type = type;
    this.frequency = frequency;
    this.oscillatorStarted = false;
}

Oscillator.prototype.init = function() {
    this.oscillatorNode = this.audioCtx.createOscillator();
    this.oscillatorNode.type = this.type;
    this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.audioCtx.currentTime); 
}

Oscillator.prototype.connect = function() {
    this.oscillatorNode.connect(this.audioCtx.destination);
}

Oscillator.prototype.disconnect = function() {
    this.oscillatorNode.disconnect(this.audioCtx.destination);
}

Oscillator.prototype.start = function() {
    this.oscillatorNode.start();
}

Oscillator.prototype.setFrequency = function (frequency) {
    this.oscillatorNode.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
}

Oscillator.prototype.onPlay = function () {

    this.connect();

    if (!this.oscillatorStarted) {
        this.start();
        this.oscillatorStarted = true;
    }  
}

export default Oscillator;