'use strict'

function Frequency() {
    this.freqRange = []
    this.freqToGuess = [];
    this.freqValue = 0;
}

// Create an array filled with keys created from Array.from => [0, 1, 2, ..., 50]
// Then multiply each element by STEP => [0, 100, 200,... , 4900, 5000]
// And remove the first element
// [100, 200, ..., 4900, 5000]
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