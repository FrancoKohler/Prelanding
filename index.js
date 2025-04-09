/*-----------POPUP CLOSE---------*/
const closePopupBtn = document.getElementById("btnPopup");
const popupContainer = document.querySelector(".popup-containter");

closePopupBtn.addEventListener("click", function () {
  // Cerrar el popup
  popupContainer.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const correctAnswers = ["2007", "Siri", "iPhone X", "Internet"];

  const questionDivs = document.querySelectorAll(".div-quiz");
  const congratsDiv = document.querySelector(".div-congrats");
  const gameSection = document.querySelector(".section-game");
  const winButton = document.querySelector(".div-congrats .btn-win");

  // Initially hide all sections except the first question
  questionDivs.forEach((div, index) => {
    if (index !== 0) div.style.display = "none";
  });
  congratsDiv.style.display = "none";
  gameSection.style.display = "none";

  // Iterate through each question
  questionDivs.forEach((questionDiv, index) => {
    const buttons = questionDiv.querySelectorAll(".btns");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => (btn.disabled = true));

        // Reset button styles
        buttons.forEach((btn) => {
          btn.style.backgroundColor = "";
          btn.style.color = "";
        });

        // Apply correct/incorrect color
        if (this.textContent.trim() === correctAnswers[index]) {
          this.style.backgroundColor = "green";
          this.style.color = "white";
        } else {
          this.style.backgroundColor = "red";
          this.style.color = "white";
        }

        setTimeout(() => {
          questionDiv.style.display = "none";
          if (index + 1 < questionDivs.length) {
            questionDivs[index + 1].style.display = "flex";
          } else {
            congratsDiv.style.display = "flex";
          }
        }, 1200);
      });
    });
  });

  /*---Game section Appears at last---*/
  winButton.addEventListener("click", function () {
    congratsDiv.style.display = "none";
    gameSection.style.display = "flex";
  });
});
/*------WHACK A MOLE-----*/
const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreEl = document.getElementById("score");
let score = 0;
let gameStarted = false;

const sound = new Audio("../assets/smash.mp3");
const congratulationsOverlay = document.getElementById("congratulations");
const finalScoreElement = document.getElementById("final-score");

// Function to start the game
function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  run();
}

// Function to stop the game
function stopGame() {
  gameStarted = false;
  /*----REACHES WHEN SCORE GOES 200 AND STOPS---*/
  congratulationsOverlay.style.display = "block";
  finalScoreElement.textContent = score;
}

// Function to run the mole spawn logic
function run() {
  if (!gameStarted) return;

  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "../assets/giftbox.svg";

  img.addEventListener("click", () => {
    score += 10;
    sound.play();
    scoreEl.textContent = score;

    img.src = "../assets/iphone.svg";

    /*----SCORE LIMIT AND IMG DELAY---*/
    setTimeout(() => {
      hole.removeChild(img);
      if (score >= 180) {
        stopGame();
      } else {
        run();
      }
    }, 500); /*---delay of img shown after hammer-*/
  });

  hole.appendChild(img);

  /*---TIMER FOR MOLE DISAPPEAR---*/
  timer = setTimeout(() => {
    hole.removeChild(img);
    if (score >= 180) {
      stopGame();
    } else {
      run();
    }
  }, 1500);
}

// Event listener to start the game with a click
window.addEventListener("click", startGame);

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
