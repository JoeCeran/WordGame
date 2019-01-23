var questions = {
    Questions: [{
    question: "What is the name of Yamaha's FM synthesizer released in 1983?",
    title: "Released in 1983, the name of Yamaha's FM synthesizer is the: ",
    items: ["DX7", "M1", "D50", "Juno 106", "MS20"]
    },
    {
    question: "Who is the strongest in One Piece??",
    title: "The strongest in One Piece is: ",
    items: ["Nami", "Luffy", "Robin", "Zoro", "Sanji"]
    },
    {
    question: "Which is the best Gundam series???",
    title: "The best Gundam series is: ",
    items: ["Seed", "Wing", "G", "Zeta", "0079"]
    }]
}
var Goku;
var correctAnswers = [0, 1 , 4];


var number = 30;
var intervalId;
var correct = 0;
var incorrect = 0;
var selection;
var i;
var round = 0;
var startEd = true;

$(document).ready(function() {

//code for running the timer
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
//code for displaying the timer
function decrement() {
    number--;
    $("#show-number").html("<h2> Time remaining: </h2>" + "<h2>" + number + "</h2>");
    //code for if the timer runs out and the player hasn't picked an answer
    if (number === 0) {
        incorrect++;
        document.getElementById("show-questions").innerHTML = "<h2>Wrong! " + questions.Questions[round].title + questions.Questions[round].items[correctAnswers[round]] + "</h2>";
        document.getElementById("show-img").src="assets/images/"+ questions.Questions[round].items[correctAnswers[round]] +".png";
        clearIt();
        clearInterval(intervalId);
        number = 30;
        round++;
        setTimeout(function(){$("#show-img").empty(); main();},3000);
    }
}
//code for writing out the questions 
function questioned() {
    document.getElementById("show-questions").innerHTML = "<h2>" + questions.Questions[round].title + "</h2><br>";
    for (var i = 0; i < questions.Questions[round].items.length; i++) {
        var questionBtn = $("<button>");
        questionBtn.addClass("btn btn-lg normal-button");
        questionBtn.attr("value", i);
        questionBtn.text(questions.Questions[round].items[i]);
        $("#show-questions").append(questionBtn);
    }
}
//code for writing the start button
function start() {
        var startBtn = $("<button>");
        startBtn.addClass("btn btn-lg flicker normal-button");
        startBtn.text("Start");
        startBtn.attr("value", 11);
        $("#show-questions").append(startBtn);
}
//code for writing the reset button
function reset() {
        var questionBtn = $("<button>");
        questionBtn.addClass("btn btn-lg flicker normal-button");
        questionBtn.text("Start Again?");
        questionBtn.attr("value", 10);
        $("#show-score").append(questionBtn);
}
//code for displaying the image
function showImg() {
        var showImg = $("<img>");
        showImg.addClass("image");
        showImg.attr("id", "show-img");
        $("#show-image").append(showImg);
    }

//code for keeping score
function clickOn() {
$(".normal-button").click(function() {
    selection = eval($(this).attr("value"));
    select = selection.toString();
    //code for what the start button actions
    if (select == 11) {
        clearIt();
        var audio2 = new Audio("assets/sounds/Select.mp3");
        audio2.play();
        start = false;
        main();
    }
    //code for the reset button's actions
    else if (select == 10) {
        round = 0;
        correct = 0;
        incorrect = 0;
        var audio2 = new Audio("assets/sounds/Select.mp3");
        audio2.play();
        main();
        document.getElementById("show-score").innerHTML = "";
    }
    //code for if the selection was correct
    else if (select == correctAnswers[round]) {
        document.getElementById("show-questions").innerHTML = "<h2>Correct! " + questions.Questions[round].title + "<h2 class=flicker2>" + questions.Questions[round].items[correctAnswers[round]] + "</h2>" + "</h2>";
        showImg();
        document.getElementById("show-img").src="assets/images/"+ questions.Questions[round].items[correctAnswers[round]] +".png";
        var audio2 = new Audio("assets/sounds/Select.mp3");
        audio2.play();
        correct++;
        clearIt();
        clearInterval(intervalId);
        number = 30;
        round++;
        setTimeout(function(){main(); document.getElementById("show-img").src = "assets/images/original.png"},3000);
    }
    //code for if the selection was wrong
    else if (select != correctAnswers[round]){
        incorrect++;
        document.getElementById("show-questions").innerHTML = "<h2>Wrong! " + questions.Questions[round].title + questions.Questions[round].items[correctAnswers[round]] + "</h2>";
        document.getElementById("show-img").src="assets/images/"+ questions.Questions[round].items[correctAnswers[round]] +".png";
        var audio2 = new Audio("assets/sounds/Select.mp3");
        audio2.play();
        clearIt();
        clearInterval(intervalId);
        number = 30;
        round++;
        setTimeout(function(){$("#show-img").empty(); main();},3000);
    }

});
}
//code for displaying score
function score() {
    document.getElementById("show-score").innerHTML = "<h2>All Done, here's how you did!</h2> <h3><br>Correct: " + correct + "<br>Incorrect: " + incorrect+"</h3>";
    clearIt();
    reset();
}
//code for changing the round
function clearIt(){
    $(".normal-button").remove();
}
//running the functions
function main(){
document.getElementById("show-img").src = "assets/images/original.png";
//code for if the game hasn't started yet
if (startEd == true) {
start();
clickOn();
startEd = false;
} 
//code for if the game has ended
else if (startEd == false && round == 3) {
    score();
    clickOn();
    document.getElementById("show-img").src = "assets/images/Win.png";4
    document.getElementById("show-questions").innerHTML = "";
    document.getElementById("show-number").innerHTML = "";
    var audio2 = new Audio("assets/sounds/Win.mp3");
        audio2.play();
    
}
//code for if the game has started
else if (startEd == false && round != 3) {
    questioned();
    run();
    clickOn(); 
    }
}
main();
});
