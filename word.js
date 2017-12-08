// requiring our Letter module exported from letter.js
var Letter = require("./letter.js");

// constructor function
var Word = function(computerChoices) {

this.computerChoices = computerChoices;

this.selectedWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];
this.displayLetters = [];

this.matches = 0;


this.emptyDisplayWord = function(wordLength) {
	for(i=0; i < wordLength; i++) {
		letter = new Letter("_").value;
		this.displayLetters.push(letter);
		
	}
	//console.log(this.displayLetters);

	return this.displayLetters; 
};

this.checkAnswer = function(userGuess, computerArray) {
	var guessLetter = new Letter(userGuess);
	
	//console.log(guessLetter);
	var matchIndex = guessLetter.findMatches(guessLetter, computerArray);
	if (matchIndex.length)  {
	  	for(i=0; i < matchIndex.length; i++) {
	  		this.displayLetters[matchIndex[i]] = guessLetter.value;
	  		this.matches-=1;
	  	}

	  }


	  return this.matches;
};
	
};
 
// export constructor
module.exports = Word;