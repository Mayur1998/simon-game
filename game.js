var userClickedPattern = [];
var gamePattern = [];
var rcolor = ["red", "yellow", "blue", "green"];
var i = 0;
var lvl = 0;
var count = 0;


function blink(button) {
  $("#" + button).fadeOut(100).fadeIn(100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}



function newSequence() {
  lvl++;
  $("h1").text("Level " + lvl);
  var num = Math.floor(Math.random() * 4);
  gamePattern.push(rcolor[num]);
  var currButton2 = gamePattern[gamePattern.length - 1];
  playSound(currButton2);
  blink(currButton2);

}
$(document).keypress(function() {
  if (count == 0) {
    count++;
    newSequence();
  }
});


function checkAns() {
  if (i < lvl) {
    if (gamePattern[i] === userClickedPattern[i]) {
      if (i === (lvl - 1)) {
        i = 0;
        userClickedPattern = [];
        setTimeout(newSequence, 1000);
      }
       else {
        i++;
      }
    } else {
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      var over = new Audio("sounds/wrong.mp3");
      over.play();
      setTimeout(function () {
        $("body").removeClass("game-over");

      },200);
      count = 0;
      lvl = i =  0;
      gamePattern = [];
      userClickedPattern = [];
    }
  }
}
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  var currButton = userClickedPattern[userClickedPattern.length - 1];
  playSound(currButton);
  blink(currButton);
  animatePress(currButton);
  checkAns();
});

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}
