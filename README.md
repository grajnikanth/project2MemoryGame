# project2MemoryGame
Udacity Front End Developer - Project 2 - Memory Game

This project contains the code for the Memory Game project.
This is a game where there are 16 cards displayed on the screen for few seconds in a 4x4 grid. Out of the 16 cards displayed, 8 cards are the same. That is there are 2 cards of the same type. The player has to memorize the locations of the various cards on the screen when the cards are displayed. Then the player can start clicking two cards at a time to test their memory of where two matching cards are located.

When a user clicks the first card which is facedown, the first card is displayed. Then the user clicks the next card and the program will check to see if the second card is a match to the first. If yes, both cards are now displayed with a green color to indicate that two cards were successfully matched. If the second card does not match the first card, both cards are flipped to face down and the user has to start the cycle of clicking two cards again.

The user is rated by number of stars on top top. As the user clicks more to make a match the number of stars reduce based on how many times the user clicks. Also the amount of time taken by the user is incremented one second at a time and displayed on the top.

Once the user successfully matches all the 8 cards, a modal appears on the screen to show the user the score that is number of moves taken by the user, the time taken and the number of stars the user attained.

Then the user can decide to play the game again by clicking the replay button.

If the cancel button the modal is clicked then nothing happens.

Allows the user is allowed to click the "restart" icon on the top right corner at any time during the game to restart the game. 

Each time the game starts the locations of the 16 cards is shuffled/randomized.

Instructions to download code
To  run the code clone the repository. The main javascript file is located in /js/ directory. The main html file is located in index.html. This contains all the html.

Rest of the files were provided by Udacity for this game. 
