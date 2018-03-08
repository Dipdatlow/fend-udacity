var card = document.getElementsByClassName("card");
var cards = [...card];
var firstChoice = '';
var firstElement = '';
var playerCantOpenMoreCards = false;
var movesElement = document.getElementById("moves");
var starElements = document.getElementsByClassName("fa-star");
var movesCounter = 0;
var starsCounter = 3;
var restartElement = document.getElementById("restart");
var matchCounter = 0;
var second = 0, minute = 0, hour = 0;
var timerIcon = document.getElementsByClassName("timer");
var timer = timerIcon[1];
var interval;
var firstMove = true;
var finalTime = document.getElementById("final-time");
var finalStars = document.getElementsByClassName("final-stars");
var playerJustRestarted = false;
var playAgain = document.getElementById("play-again");

/*
@description function that open the cards on click, verify if the first card matches the second. In the end, inside this
function, another function verifies if that was the last match left.
 */
var displayCard = function () {
    playerJustRestarted = false;
    if (firstMove) {
        startTimer();
    }
    if (this.classList.contains("match") || playerCantOpenMoreCards || this.classList.contains("open")){
        return false;
    }
    var innerElement = this.getElementsByClassName("fa");
    var iconElement = [...innerElement];
    this.classList.toggle("open");
    this.classList.toggle("show");
    firstMove = false;
    if (firstChoice === ''){
        firstElement = this;
        firstChoice = iconElement[0].className;
    } else {
        playerCantOpenMoreCards = true;
        movesCounter++;
        movesElement.textContent = movesCounter.toString();
        score();
        if (iconElement[0].className === firstChoice){
            matchSuccessful(this);
        } else {
            matchFailed(this);
        }
        checkWinCondition();
    }
};

/*
@description check if the last cards was matched, if so, open a congratulations pop-up showing the time, moves done
and stars rating.
 */
var checkWinCondition = function () {
  if (matchCounter >= 8){
      $('#myModal').modal(focus);
      finalTime.innerHTML = "Time: " + "0" + minute + ":" + second + " and "+movesCounter+" Moves";
      if (starsCounter === 1) {
        finalStars[2].classList.remove("earned-star");
        finalStars[1].classList.remove("earned-star");
      }
      if (starsCounter === 2) {
          finalStars[2].classList.remove("earned-star");
      }
  }
};


var matchSuccessful = function (thisElement){
    matchCounter++;
    firstElement.classList.toggle("match");
    thisElement.classList.toggle("match");
    playerCantOpenMoreCards = false;
    firstChoice = '';
};

/*
@description hide the cards, and set a time interval, so the player cant open instantaneously another card
 */
var matchFailed = function (thisElement){
    setTimeout(function(firstElement, thisElement){
        firstChoice = '';
        firstElement.classList.toggle("open");
        firstElement.classList.toggle("show");
        thisElement.classList.toggle("open");
        thisElement.classList.toggle("show");
        playerCantOpenMoreCards = false;
    }, 1500, firstElement, thisElement);
};

/*
@description check the number of moves so far, if moves number reach 10, remove one star, reaching 15 moves remove the
other star.
 */
function score() {
    if (movesCounter >= 10 && starsCounter === 3) {
        starsCounter--;
        starElements[2].classList.remove("earned-star");
    }
    if (movesCounter >= 15 && starsCounter === 2) {
        starsCounter--;
        starElements[1].classList.remove("earned-star");
    }
}

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard)
}


const deck = document.querySelector(".deck");

/*
@description the start game function that shuffles the deck.
 */
function startGame() {
    var shuffledCards = shuffle(cards);
    for (var i = 0; i < shuffledCards.length; i++) {
        shuffledCards.forEach(function(item) {
            deck.appendChild(item);
        })
    }
}


/*
@description hide all cards, reset all info's and shuffle's the deck.
 */
var restart = function () {
    if (playerCantOpenMoreCards) {
        return false;
    }
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("open");
        cards[i].classList.remove("show");
        cards[i].classList.remove("match");
    }
    clearBoard();
    startGame();
};


playAgain.addEventListener("click", restart);

/*
@description resets all information back to the beginning.
 */
function clearBoard() {
    movesCounter = 0;
    firstChoice = '';
    firstElement = '';
    starsCounter = 3;
    matchCounter = 0;
    second = 0;
    minute = 0;
    hour = 0;
    playerJustRestarted = true;
    timer.innerHTML = "0" + minute+":0" + second;
    movesElement.textContent = movesCounter.toString();
    for (i = 0; i < starElements.length; i++) {
        if (!(starElements[i].classList.contains("earned-star"))) {
            starElements[i].classList.add("earned-star");
        }
    }

}

restartElement.addEventListener("click", restart);

// start the function whenever the page is loaded.
document.body.onload = startGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
@description start the timer only if is the first move, and stop the timer when the player wins.
 */
function startTimer(){
    interval = setInterval(function(){
        if (playerJustRestarted) {
            return false
        }
        if (matchCounter >= 8) {
            return false
        }
        timer.innerHTML = "0" + minute+":" + second;
        second++;
        if(second === 60){
            minute++;
            second = 0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
    },1000);
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
