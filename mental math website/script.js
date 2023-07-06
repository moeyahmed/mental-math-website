let operators = ["+", "-", "*"];
let score = 0;
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;
let countdown; // for clearing the interval when the game ends
const difficultySelector = document.getElementById("difficulty");

//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Countdown timer function
function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  countdown = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      stopGame("Time's up! <span>Game Over, Restart game.</span>");
    }
  }, 1000);
}
function updateScore(difficulty) {
  switch(difficulty) {
      case 'easy':
          score += 5;
          break;
      case 'medium':
          score += 10;
          break;
      case 'hard':
          score += 15;
          break;
  }
}


const questionGenerator = () => {
  let difficulty = difficultySelector.value;
  let min, max;
  switch (difficulty) {
    case 'easy':
      min = 5;
      max = 15;
      operators = ["+", "-"];
      break;
    case 'medium':
      min = 10;
      max = 25;
      operators = ["+", "-", "*"];
      break;
    case 'hard':
      min = 100;
      max = 500;
      operators = ["+", "-", "*"];
      break;
    default:
      min = 1;
      max = 20;
  }
  let [num1, num2] = [randomValue(min, max), randomValue(min, max)];

  // For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);

  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 5);

  // Reset previous input value if present
  if (document.getElementById("inputValue")) {
    document.getElementById("inputValue").value = "";
  }
  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }


};

submitBtn.addEventListener("click", () => {
  errorMessage.classList.add("hide");
  let userInput = document.getElementById("inputValue").value;
  //If user input is not empty
  if (userInput) {
    //If the user guessed correct answer
    if (userInput == answerValue) {
      updateScore(difficultySelector.value); // Update the score
      questionGenerator(); // Generate a new question
    }
    //If user inputs operator other than +,-,*
    else if (operatorQuestion && !operators.includes(userInput)) {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Wrong Answer!";
      questionGenerator(); // Generate a new question
    }
    //If user guessed wrong answer
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Wrong Answer!";
      questionGenerator(); // Generate a new question
    }
  }
  //If user input is empty
  else {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "Input Cannot Be Empty";
  }
});


startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  score = 0; // reset the score
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();

  // Start the countdown
  let threeMinutes = 60 * 3,
      display = document.querySelector('#timer');
  startTimer(threeMinutes, display);
});


const stopGame = (resultText) => {
  result.innerHTML = resultText + "<br/>Your score is " + score;
  startBtn.innerText = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");

  // Clear the countdown
  clearInterval(countdown);
};



