var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userclickpattern=[];
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userclickpattern.push(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);

    checkAnswer(userclickpattern.length-1)
 });

function animatepress(currentcolor){

$("#"+currentcolor).addClass("pressed");
setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed")
},100);

}


function nextSequence(){
userclickpattern=[];
 level++;
 $("#level-title").text("Level "+level);

 var randomNumber=Math.floor(Math.random()*4);
 var randomchosencolor=buttonColors[randomNumber];
 gamePattern.push(randomchosencolor);

 $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
 playsound(randomchosencolor);



}


function playsound(name){
    

    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
   
    }

    function checkAnswer(currentLevel) {

        //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        if (gamePattern[currentLevel] === userclickpattern[currentLevel]) {
    
          console.log("success");
    
          //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
          if (userclickpattern.length === gamePattern.length){
    
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
    
          console.log("wrong");
          playsound("wrong");
          $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startover();
    
        }
    
    }

    function startover(){

     level=0;
     gamePattern = [];
     started = false;


    }