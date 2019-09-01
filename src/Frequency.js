'use strict'

function Frequency() {
    this.freqRange = []
    this.freqToGuess = [];
    this.freqValue = 0;
}

Frequency.prototype.fillFreqRange = function(maxFreq, step) {
    this.freqRange = Array.from(Array(maxFreq/step +1).keys()).map(x => x*step).slice(1);
}

// Use a set to avoid duplicate freq
Frequency.prototype.fillFreqToGuess = function(nbGuess) {
    let freqSet = new Set();
    
    while (freqSet.size != nbGuess) {
        freqSet.add(this.freqRange[random(this.freqRange.length)]);
    }

    this.freqToGuess = [...freqSet];
}

Frequency.prototype.setFreqValue = function() {
    this.freqValue = this.freqToGuess[random(this.freqToGuess.length)];
}

function random(bound) {
    return Math.floor(Math.random()*bound);
}

export default Frequency;