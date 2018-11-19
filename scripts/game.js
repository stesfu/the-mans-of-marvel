let begin = document.querySelector("#WelcomeBox"),
  rodBar = document.querySelector("#rod"),
  fishbar = document.querySelector("#fishbar"),
  heart = document.querySelector("#heart"),
  progressBar = document.querySelector("#progressBar"),
  progressMeter = document.querySelector("#progress"),
  fishbarY = 0,
  heartY = 0,
  fishbarLength = 90,
  heartLength = 70,
  speed = 1,
  acc = 2,
  keypressAcc = 15,
  progress = 395;

function moveFishbar() {
  setInterval(function() {
    fishbarY += speed;
    if (fishbarY <= 0) {
      fishbarY = 0;
      speed = speed * -0.3;
    } else if (fishbarY >= 410) {
      fishbarY = 410;
      speed = Math.round(speed * -0.3);
    } else {
      speed += acc;
    }
    fishbar.style.top = `${fishbarY}px`;
  }, 50);
}

function keymoveFishbar() {
  if (fishbarY > 0) {
    speed -= keypressAcc;
    fishbar.style.top = `${z}px`;
  }
}

function moveHeart() {
  setInterval(function() {
    let addend = Math.random() * (71 - -70) + -70;
    newY = heartY + Math.floor(addend);
    if (newY >= 0 && newY <= 410) {
      heartY = newY;
      heart.style.top = `${heartY}px`;
    }
  }, 2000);
}

function overallProgress() {
  let trackProgress = setInterval(function() {
    if (Math.abs(fishbarY - heartY) <= (fishbarLength + heartLength) * 0.5) {
      progress += 39.5;
      if (progress <= 790) {
        progressMeter.style.width = `${progress}px`;
      }
    } else {
      progress -= 79;
      if (progress >= 0) {
        progressMeter.style.width = `${progress}px`;
      }
    }
    if (progress < 0 || progress > 790) {
      clearInterval(trackProgress);
      endGame();
    }
  }, 1000);
}

begin.addEventListener("click", function() {
  startGame();
  moveHeart();
  moveFishbar();
  overallProgress();
});

document.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    keymoveFishbar();
  }
});

function startGame() {
  begin.style.display = "none";
  rodBar.style.display = "inline-block";
  progressBar.style.display = "inline-block";
}

function endGame() {
  rodBar.style.display = "none";
  progressBar.style.display = "none";
  if (progress >= 790) {
    alert("You win!");
  } else {
    alert("There's plenty of fish in the sea but none are seeming to bite...");
  }
}
