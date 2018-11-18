let begin = document.querySelector("#WelcomeBox"),
  rodBar = document.querySelector("#rod"),
  fishbar = document.querySelector("#fishbar"),
  heart = document.querySelector("#heart"),
  z = 0,
  y = 0,
  speed = 1,
  acc = 2,
  keypressAcc = 15;


function moveFishbar(){
  console.log(z);
  setInterval(function(){
   if(z<=410){
       z+= speed;
       speed += acc;
       fishbar.style.top = `${z}px`
   }else{
     z= 410;
   }
  }, 500);
}

function keymoveFishbar(){
    if(z>0){
       speed -= keypressAcc;
       // fishbar.style.top = `${z}px`
   }
}

function moveHeart() {
  setInterval(function() {
    let addend = Math.random() * (71 - -70) + -70;
    newY = y + Math.floor(addend);
    if (newY >= 0 && newY <= 410) {
       y = newY;
      heart.style.top = `${y}px`
    }
  }, 2000);
}

begin.addEventListener("click", function() {
  startGame();
  moveHeart();
  moveFishbar();
});

document.addEventListener("keypress", function (event){
  if (event.keyCode === 13){
    keymoveFishbar();
    // moveFishbar();
  }
});

function startGame() {
  begin.style.display = "none";
  rodBar.style.display = "inline-block";
}
