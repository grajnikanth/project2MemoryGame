/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// variables cardOne and cardTwo are used to compare two cards for each move.
// after each move both these are set to null for the next move.
// variable moves will increment by one when two cards are clicked to see the cards

let cardOne = null;
let cardTwo = null;
let moves = 0;

// global variables for displaying time in minutes:seconds
// variable timeElapsed will track total number of seconds the user has been playing
// clockRunning will be set true when the game begins which is when user clicks on the first card
// variable clockId is used to control the stop clock started by using setInterval() function.
let clockRunning = false;
let clockId = null;
let timeElapsed = 0;
let minutes = 0;
let seconds = 0;

// totalMatches is a counter to keeps track of total matches user picked. totalMatches = 8, then
// game finished by user and found 8 matches for the 16 cards.
let totalMatches = 0;

// class = deck is the parent unordered list holding all the cards as list items
// variable deck is used to append the randomized children (li's) in shuffle() function
const deck = document.querySelector('.deck');

// select all the children of deck with "li" elements. Returns a nodeList. Convert to
// an array using the Array.from() function

const deckOfCards = document.querySelectorAll('.deck li');

// function shuffleDeck() is used at the beginning of the game and/or reset or replay pressed
function shuffleDeck() {
  const arrayOfCards = Array.from(deckOfCards);
  const shuffledArray = shuffle(arrayOfCards);
// In below loop we are taking the nodes which are already present and appending to the deck
// again in a new shuffled order. The older nodes of "deck" are deleted with the new ones.
// Hence we do not end up with twice as many cards in the deck.
  for(let i=0;i<shuffledArray.length;i++) {
    deck.appendChild(shuffledArray[i]);
  }
// call showAllCards() function twice once to toggle cards to show them and once to toggle
// them to become facedown/close but this time with a 2 second delay so user can see the cards
// at least once to memorize the card locations.
  showAllCards();
  setTimeout(showAllCards,2000);
}

shuffleDeck(); // begin game

// function showAllCards() is used to toggle display and facedown condition of cards.
 function showAllCards() {
   deckOfCards.forEach(function(card) {
     card.classList.toggle('open'); //.toggle(class) will add the class if not present and
     //remove if present
     card.classList.toggle('show');
   });
 }


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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Setting up Event listener for a card click inside the deck

// select the entire deck so that clicks inside the deck can be checked

// The click event contains a property called "target" which contains information about
// the particular element that was clicked. We use this to see if a "card" was clicked

// classlist returns an object which has information about the classes of the element clicked
// we can check what all classes does this card element have in addition to class=card.
// eg does it have match does it have show etc and change them as needed for the click
//event.


deck.addEventListener('click', function(event) {
  let x = event.target;
// pass "x" to function cardFaceDown() to check if the click target was a card and if it
// is visible or not.
// if card is facedown and cardOne = null, then assign x -> cardOne
// else if cardTwo = null and if the new click is not the first card,
// then x -> cardTwo. Also implies 2 cards were clicked so moves++
  if(cardFaceDown(x)) {
    if(!cardOne) {
      cardOne = x;
    }
    else if(!cardTwo&&(x!=cardOne)) {
      cardTwo = x;
      moves++;
      showMoves();
    }
  }
// If two cards were clicked check if they match, if they do not match, then make them
// disappear and set cardOne and cardTwo = null to start the cycle again.
// Delay the closing of cards using setTimeout so user has time to see that the cards do not match.
// if the cards match, then make them appear and set class = match for both.
  if(cardOne&&cardTwo) {
    if(checkMatch(cardOne, cardTwo)) {
      addMatch(cardOne,cardTwo);
      totalMatches++;
      cardOne = null;
      cardTwo = null;
    }
    else {
      setTimeout(function() { removeCards(cardOne,cardTwo);
        cardOne = null;
        cardTwo = null;
      },800);
    }
  }
// If the totalMatches = 8, => all 16 cards were matched so game is finshed.
// Show the modal for game results, show the results and stopClock.
  if(totalMatches===8) {
    modalToggle();
    stopClock();
    modalDataDisplay();
  }

});


// function cardFacedown() actions:
// If clicked is card and clock is not running, then this is first click by user
// so start clock and set boolean clockRunning to true.

//if card is clicked and the class legnth = 1 only => class = "card" so card is facedown.
// so add "open and show" to show card.

// returning true => card is facedown (i.e, class != match or open or show) and click was on a card.
// if false => may be click was not on card or maybe card is already opened or
// card is matched already.


function cardFaceDown(card) {
  // code for starting the clock if click is a valid click
  if(card.classList.contains('card')&&!clockRunning) {
    startClock();
    clockRunning = true;
  }

  if(card.classList.contains('card')&&(card.classList.length===1)) {
    card.classList.add('open','show');
    return true;
  }
  else {
    return false;
  }

}
// function checkMatch() checks if two cards are the same.
function checkMatch(card1, card2) {
  if(card1.firstElementChild.className === card2.firstElementChild.className) {
    return true;
  }
  else {
    return false;
  }
}
// function addMatch() will update the class of the two cards which match to make them visible.
function addMatch(card1, card2) {
  card1.classList.remove('open','show');
  card1.classList.add('match');
  card2.classList.remove('open','show');
  card2.classList.add('match');
}
// remove two cards which were clicked and do not match. Make them disappear
function removeCards(card1, card2) {
  card1.classList.remove('show','open');
  card2.classList.remove('show','open');
}

// function to control stop watch - startClock and stopClock
// timeElaspsed++ for each second increase.
// setInterval() will run the function inside it every one second.
// We want to update our stopwatch display for every second of time passes by in the game.

function startClock() {
  clockId = setInterval(function() {
    timeElapsed++;
    displayTime();
  },1000);
}
// Stop the clock when game is done
function stopClock() {
  clearInterval(clockId);
}

// displayTime function to display the stop watch time progress in minutes:seconds

function displayTime() {
  clockElement = document.querySelector('.clock');
  let timeFormed = timeFormated();
  if(timeFormed[1]<10) {
      clockElement.innerHTML = `${timeFormed[0]}:0${timeFormed[1]}`;
  }
  else {
    clockElement.innerHTML = `${timeFormed[0]}:${timeFormed[1]}`;
  }
}

function timeFormated() {
  minutes = Math.floor(timeElapsed/60);
  seconds = timeElapsed%60;
  return [minutes, seconds];
}

// showMoves() function to display the number of moves made and to control number
// of stars for rating the player
// For every 8 moves one start is deducted.
//starDisplay() when called will remove one star from display.

function showMoves() {
  let movesDisplay = document.querySelector('.moves');
  movesDisplay.innerHTML = moves;
  switch(moves) {
    case 8:
      starDisplay();
      break;
    case 16:
      starDisplay();
      break;
    case 24:
      starDisplay();
      break;
    case 32:
      starDisplay();
      break;
  }
}

// starDisplay(0) will remove one star from display each time it is called.
// Note that the getElementsByClassName returns a HTML Collection. In this case this Collection
// length is 1. So you need to use the index 0 to access the element

function starDisplay() {
    let starsEl = document.getElementsByClassName('stars');
    starsEl[0].firstElementChild.remove();
}

// Code to control the Modal once game is finished

function modalToggle() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

// Display the stats of the player after game is finished.

function modalDataDisplay() {
  const timeElement = document.querySelector('.modal_time');
  let timeFormed = timeFormated();
  if(timeFormed[1]<10) {
      timeElement.innerHTML = `Time Taken = ${timeFormed[0]}:0${timeFormed[1]}`;
  }
  else {
    timeElement.innerHTML = `Time Taken = ${timeFormed[0]}:${timeFormed[1]}`;
  }
  const starElement = document.querySelector('.modal_stars');
  const starsNumber = document.querySelector('.stars').childElementCount;
  starElement.innerHTML = `Star Rating = ${starsNumber}`;
  const movesElement = document.querySelector('.modal_moves');
  movesElement.innerHTML = `Total Moves = ${moves}`;
}


// Add click events to deal with cancel and replay button on the modalDataDisplay

document.querySelector('.modal_cancel').addEventListener('click', function(event) {
  modalToggle();
});

document.querySelector('.modal_replay').addEventListener('click', function(event) {
    modalToggle();
    resetGame();
});

// add click event to reset in the middle of the game using the reset icon
document.querySelector('.restart').addEventListener('click', resetGame);

// function resetGame() to handle reset or clicking of replay button on the modal_replay
// reset will undo the game so far and return it to original state and a new random set
// of card locations are selected.

function resetGame() {
  stopClock();
  timeElapsed = 0;
  clockRunning = false;
  totalMatches = 0;
  displayTime();
  resetStars();
  moves = 0;
  showMoves();
  hideCards();
  shuffleDeck();
}

// Reset the total stars to 5 to reset the game. First delete all stars and loop
// 5 times to create 5 new children of stars
function resetStars() {
  let starsEl = document.getElementsByClassName('stars');
  while (starsEl[0].firstChild) {
    starsEl[0].removeChild(starsEl[0].firstChild);
  }

  for(let i=0;i<5;i++) {
    let x = document.createElement('li');
    let y = document.createElement('i');
    y.classList.add('fa','fa-star');
    x.appendChild(y);
    starsEl[0].appendChild(x);
  }
}

// hidecards() function is used to change the class of deckOfCards to only card so
// that the cards are not visible once reset. We are removing the match, open or show classes
// if they exist

function hideCards() {
  for(let cards of deckOfCards) {
    cards.className = 'card';
  }
}

// function matchAllCards() is for testing only. This is not being used for the game at present
function matchAllCards() {
  for(let cards of deckOfCards) {
    cards.classList.add('card','match');
  }
}
