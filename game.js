document.addEventListener('DOMContentLoaded', function () {
    let score = document.getElementById('score');
    let msg = document.getElementById('msg');
    let winLosMsg = document.getElementById('winLosMsg');
    let circle = document.getElementById('circle');
    let text = document.getElementById('text');
    let gameBoard = document.getElementById('gameBoard');
    let newgame = document.getElementById('newgame');
    let bgImage = document.getElementById("bgImage");
    let misClicked = document.getElementById("Misclicked");
    let sureClicked = document.getElementById("Sureclicked");
    let gameRuleBtn = document.getElementById("gameRuleBtn");
    let gameFrame = document.getElementById("gameFrame");

    let scoreVal = 0;
    let mistakeCounter = 0;
    const MAX_MISTAKES = 3;
    let misClickCount = 0;
    let correctClickCount = 0;

    // for game off
    let gameActive = true;

    function updateScore(points) {
                // for game off
      if (!gameActive) return;
      scoreVal += points;
      score.textContent = scoreVal;

      if (scoreVal < 0) {
        msg.textContent = "Danger Zone";
        msg.style.backgroundColor = "red";
        circle.style.backgroundColor = "red";
      } else if (scoreVal >= 100) {
        gameActive = false;
        winLosMsg.textContent = "You Are Winner";
        winLosMsg.style.backgroundColor = "gold";
        circle.style.backgroundColor = "gold";
      } else {
        getRandomPosition();
      }
      // for 3 mistakeCounter
      if (points === -10) {
        mistakeCounter++;
        if (mistakeCounter >= MAX_MISTAKES) {
          gameActive = false;
          winLosMsg.textContent = "You are Loser";
          winLosMsg.style.backgroundColor = "red";
          circle.style.backgroundColor = "red";
          scoreVal = 0;
          mistakeCounter = 0;
        }
      } else {
        mistakeCounter = 0;
      }
      if (scoreVal < 0){
        msg.style.display = "block";
      } else{
        msg.style.display = "none";
      }
    }

    function msgPopup() {
      msg.style.left = "50%";
      msg.style.top = "0px";
    }
    msgPopup();

    function zoomInCircle() {
      circle.style.transform = 'scale(0.8,0.8)';
    }

    function zoomOutCircle() {
      circle.style.transform = 'scale(1,1)';
    }

    function getRandomPosition() {
      if (!gameActive) return; // for game off
      let gameBoardHeight = gameBoard.clientHeight;
      let gameBoardWidth = gameBoard.clientWidth;
      let circleWidth = circle.clientWidth;
      let circleHeight = circle.clientHeight;

      let maxRandomX = gameBoardWidth - circleWidth;
      let maxRandomY = gameBoardHeight - circleHeight;

      let randomX = Math.floor(Math.random() * maxRandomX);
      let randomY = Math.floor(Math.random() * maxRandomY);

      // Ensure the circle stays within the gameBoard
      randomX = Math.min(randomX, maxRandomX);
      randomY = Math.min(randomY, maxRandomY);

      circle.style.left = `${randomX}px`;
      circle.style.top = `${randomY}px`;

      // for random circle color
      const simple_color = ["#85C1E9", "#8E44AD", "tomato", "pink", "aqua", "#F9E79F", "#21618C", "#BFC9CA", "#943126","#2E4053"];
      const randomNumber = getRandomNumber();
      function getRandomNumber() {
        return Math.floor((Math.random() * simple_color.length));
      }

      // for random text
      let randomText = Math.random();
      if (randomText < 0.5) {
        if (!gameActive) return; // for game off
        text.textContent = "Click Left";
        circle.style.backgroundColor = `${simple_color[randomNumber]}`;
      } else {
        if (!gameActive) return; // for game off
        text.textContent = "Click Right";
        circle.style.backgroundColor = `${simple_color[randomNumber]}`;
      }

      zoomInCircle();
      zoomOutCircle();
    }

    function handleClick(event) {
      if (!gameActive) return; // for game off
      const clickedShift = event.target.textContent.trim();
      const currentShift = text.textContent.trim();
      if (clickedShift === currentShift) {
        if (clickedShift === "Click Left") {
          updateScore(10);
          correctClickCount++
          sureClicked.textContent = correctClickCount;
        } else {
          updateScore(-10);
          misClickCount++
          misClicked.textContent = misClickCount;
        }
      }
    }

    function handleContextMenu(event) {
      if (!gameActive) return; // for game off
      event.preventDefault();
      const clickedShift = event.target.textContent.trim();
      const currentShift = text.textContent.trim();
      if (clickedShift === currentShift) {
        if (clickedShift === "Click Right") {
          updateScore(10);
          correctClickCount++
          sureClicked.textContent = correctClickCount;
        } else {
          updateScore(-10);
          misClickCount++
          misClicked.textContent = misClickCount;
        }
      }
    }

  // for bg image
  let bgImageList = [
    "./img/3.jpg",
    "./img/4.avif",
    "./img/5.avif",
    "./img/6.avif",
    "./img/1.avif",
    "./img/2.avif"
  ];
  function showImg() {
    let currentImg = Math.floor(Math.random() * bgImageList.length);
    let imgURL = bgImageList[currentImg];
    console.log(imgURL);
    bgImage.style.backgroundImage = `url('${imgURL}')`;
  }
  showImg();

    // for restart game
  function newgameStart(){
    location.reload();
  }

   // For show/hide game rules
  let showGameRules = false; 
  function toggleRules() {
    showGameRules = !showGameRules; // Toggle the flag
    gameFrame.style.display = showGameRules ? "block" : "none";
  }
    // Add the event listeners to the circle
    circle.addEventListener("click", handleClick);
    circle.addEventListener("contextmenu", handleContextMenu);
    newgame.addEventListener("click", newgameStart);
    gameRuleBtn.addEventListener("click", toggleRules);


    getRandomPosition();
  });