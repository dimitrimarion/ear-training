'use strict'

function Frequency() {
    this.freqRange = []
    this.freqToGuess = [];
    this.freqValue = 0;
}

// min: 500, max: 5000, step: 100
// Create an array filled with keys created from Array.from => [0, 1, 2, ..., 50]
// Remove value inferior than min/step => [5, 6,..., 50]
// And multiply each element by step
Frequency.prototype.fillFreqRange = function(min, max, step) {

    let arrKeys = Array.from(Array(max/step + 1).keys());
    let arrKeysFiltered = arrKeys.filter(x => x  >= min/step);
    this.freqRange = arrKeysFiltered.map(x => x*step);
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