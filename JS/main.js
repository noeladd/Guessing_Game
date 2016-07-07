(function(){/* **** Variables **** */

var winningNumber= generateWinningNumber();
var playersGuess;
var guessArr = [];
var totalGuesses = 0;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
   return Math.floor(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
    playersGuess = Number($('#guess').val());
    $('#guess').val('');
    if(totalGuesses < 5){
    checkGuess();
    } else{
        $('#message').text("You're out of guesses! You Lose!!!")
        $("#message").addClass('loser');
    }
    
    
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
    if (playersGuess < winningNumber){
        return "lower"
    } else {
        return "higher"
    }
}
    

// Check if the Player's Guess is the winning number 

function checkGuess(){
    if (playersGuess > 100 || playersGuess < 0){
        $("#message").text("Invalid value, try a number between 0 and 100!");    
    } 
    else {
    if (winningNumber == playersGuess){
        $('#message').text("You Win!");
        $('#message').addClass('winner')
    }
    else {
        if(guessArr.indexOf(playersGuess) != -1){
            $('#message').text("You submitted a duplicate number! Try Again");
        }   
        else {
        totalGuesses ++;
        guessArr.push(playersGuess);
        $("#message").text(guessMessage());
            
        }
    }
    }
}

function guessMessage(){
    var message = "Your guess is " + lowerOrHigher() + " than the winning number"
  if(playersGuess > (winningNumber + 10) || playersGuess < (winningNumber - 10)){ 
      return message +='.'
  } else if (playersGuess > (winningNumber + 5) || playersGuess < (winningNumber - 5)){
      return message +=" and you are within 10 digits.";
  } else{
      return message += " and you are within 5 digits.";
  }
                                                
    
};
// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var threeNumbers = [];
    var guessesLeft = 5;
    threeNumbers.push(Math.floor(Math.random() * 100));
    threeNumbers.push(winningNumber);
    threeNumbers.push(Math.floor(Math.random() * 100));
    if (totalGuesses <5){
        guessesLeft -= totalGuesses;
    } else{
        guessesLeft = "no";
    }
    var hintMessage = "Your number is one of these 3: " + threeNumbers.join(', ') + " and you have " + guessesLeft +' guesses left.'
    $("#hint").text(hintMessage);
}

// Allow the "Player" to Play Again

function playAgain(){
    location.reload(true);
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
    $('#submit').click( function(event){
        playersGuessSubmission();
    })
    $("#getHint").click( function(event){
        provideHint();
    })
    $('#again').click(function(){
        playAgain();
    })
    $('#guess').keyup(function(event){
    if(event.keyCode == 13) {
        $("#submit").click();
    }
});
})})()
