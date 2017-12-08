// requiring our Word module exported from word.js
var Word = require("./word.js");

var Letter = require("./letter.js")

var inquirer = require("inquirer");

var computerChoices = ["pikachu", "bulbasaur", "charmander", "squirtle", "mew", "pokemon"]

var computerArray =[];

var count = 0;

var winCount = 0 ;

var guessCount = 15 ;

var guessSoFar = [];

Word.prototype.splitWord = function(selectedWord) {
	var selectedLetters = [];
	selectedLetters = selectedWord.split("");
	this.matches = selectedLetters.length;
	return selectedLetters;
};

Letter.prototype.findMatches= function(userGuess, computerArray) {
	// here's where you do the check of value
	var indexes = [],i;
	for(i=0; i < computerArray.length; i++)
		if (computerArray[i]===userGuess.value) {
			indexes.push(i);
		}
		return indexes;
	
};

// creating and storing a new Word object
var computerWord = new Word(computerChoices);
var computerGuess = computerWord.selectedWord;

//console.log(computerGuess);

computerArray = computerWord.splitWord(computerGuess);

//console.log(computerArray);

displayArray = computerWord.emptyDisplayWord(computerArray.length);

console.log(displayArray.join(" "));

//var matches = [];
//matches = computerWord.checkAnswer("q",computerArray);
//console.log(matches.join(" "));
function resetAll() {
  
  count = 0;
  guessCount = 15;
  //console.log("----------Guess count:" + guessCount + "----------------")
  guessSoFar = [];
  //console.log("----------Guesses so far--[" + guessSoFar + "]---------------")
  //console.log(displayArray.join(" "));

  }



var askQuestion = function() {
  
  if (count < 15) {
    
    
    inquirer.prompt([
      {
        name: "userGuess",
        message: "What letter do you choose ?"
      }
    ]).then(function(answers) {

      var newLetter = answers.userGuess;

      
      if (guessSoFar.indexOf(newLetter) < 0) {
   
          guessSoFar.push(newLetter);

      }


      console.log("----------Guesses so far--[" + guessSoFar.join(",") + "]---------------");

      
      guessCount--

      console.log("----------Guess count:" + guessCount + "----------------");
      console.log("");

	var matches = computerWord.checkAnswer(newLetter,computerArray); 

	displayArray = computerWord.displayLetters; 

    	//matches-=1;

   	console.log(displayArray.join(" "));
   	console.log("");

     if (matches == 0) {

    		console.log("You win!!!!!");

    		resetAll(); }

    else {
      count++;
      askQuestion();
  }
    });

    	

     }

     else {

     	inquirer.prompt([

     	{
     		type: "confirm",
     		message: "would you like to end game?",
     		name: "end",
     		default: true
     	}
     	]).then(function(answer) {
     		if (answer.confirm) {
     			resetAll();
     		}
     		else {
     			console.log("Too bad!!!!!!!!")
     			resetAll();
     		}

     	});

     }

 };


  	askQuestion();