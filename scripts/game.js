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
  maxheartDown = -70,
  maxheartUp = 71,
  maxrodHeight = 410,
  speed = 1,
  acc = 2,
  keypressAcc = 15,
  progress = 395,
  fullProgress = 790;

  /*
 * This function is meant to always move the green bar down. If the bar ever
 * hits the top, the decrease and direction change in speed will allow it to
 * bounce off and not pass the top boundry. On the other side, a similar bounce
 * mechanism is used but Math.round() will eventually make the speed zero,
 * causing the bar to rest at the bottom.
 */

function moveFishbar() {
  setInterval(function() {
    fishbarY += speed;
    if (fishbarY <= 0) {
      fishbarY = 0;
      speed = speed * -0.3;
    } else if (fishbarY >= maxrodHeight) {
      fishbarY = maxrodHeight;
      speed = Math.round(speed * -0.3);
    } else {
      speed += acc;
    }
    fishbar.style.top = `${fishbarY}px`;
  }, 50);
}

/*
* This function is meant to counter the downward speed of the greenbar
* upon the enter keypress to move it up. The keypress accleration is much greater
* than the accleration of the bar so it does so accordingly.
*/

function keymoveFishbar() {
  if (fishbarY > 0) {
    speed -= keypressAcc;
    fishbar.style.top = `${z}px`;
  }
}


function moveHeart() {
  setInterval(function() {
    let addend = Math.random() * (maxheartUp - maxheartDown) + maxheartDown;
    newY = heartY + Math.floor(addend);
    if (newY >= 0 && newY <= maxrodHeight) {
      heartY = newY;
      heart.style.top = `${heartY}px`;
    }
  }, 1000);
}

function overallProgress() {
  let trackProgress = setInterval(function() {
    if (Math.abs(fishbarY - heartY) <= (fishbarLength + heartLength) * 0.5) {
      progress += (fullProgress * .05);
      if (progress <= fullProgress) {
        progressMeter.style.width = `${progress}px`;
      }
    } else {
      progress -= (fullProgress * 0.1);
      if (progress >= 0) {
        progressMeter.style.width = `${progress}px`;
      }
    }
    if (progress < 0 || progress > fullProgress) {
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
  if (event.keyCode === 13) { //13 is the Enter Key
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
  if (progress >= fullProgress) {
    alert("You win!");
  } else {
    alert("There's plenty of fish in the sea but none are seeming to bite...");
  }
}
