# mental-math-website

This is a JavaScript based mental math game which dynamically generates math questions with varying difficulty and tracks player's score based on the difficulty. The game is timed for a span of 3 minutes.

How to use

The game requires a basic HTML structure with certain elements in place. 

Here are some important elements:

start-btn: A button to start or restart the game.
question: A container where the generated question will be placed.
controls-container: A container for the controls of the game.
result: A container to show the result after the game ends.
submit-btn: A button to submit the user's answer.
error-msg: A container to display error messages.
difficulty: A select element where the user can choose the difficulty of the game.
timer: A container where the timer will be displayed.
Game mechanics
The game uses the following rules and mechanics:

The game starts when the user clicks the start button. The score is reset to 0, and the first question is generated.
The difficulty of the questions can be set by the user. Based on the difficulty, the range of the numbers and the operators used in the questions are adjusted.

<img width="500" alt="Screenshot 2023-07-06 at 9 02 59 pm" src="https://github.com/moeyahmed/mental-math-website/assets/97722511/bdb6f191-92ab-4964-b157-b7946e4963f4">


The question is generated as a math equation with a missing component. This missing component could be either of the numbers, the operator or the result.
The user has to figure out the missing component and type it in the provided input field.

<img width="500" alt="Screenshot 2023-07-06 at 9 03 13 pm" src="https://github.com/moeyahmed/mental-math-website/assets/97722511/464ba04f-4164-4788-806a-35b1e0016bbc">


The user can submit their answer by clicking the submit button.
If the user's answer is correct, the score is updated based on the difficulty of the game (1 point for easy, 2 for medium, 3 for hard), and a new question is generated.
If the user's answer is incorrect, an error message is displayed and a new question is generated.
The game continues until the time is up (3 minutes). When the time is up, the game ends and the final score is displayed.

questionGenerator(): Generates a new question based on the difficulty.
stopGame(resultText): Stops the game when the time is up and displays the final score.
Event listeners for the start button and the submit button to control the flow of the game.

