

var score = 0;
var round = Math.floor(Math.random() * 7);
var firstRound = true;
var i = 0;   
var words = ["usa", "japan", "italy", "germany", "england", "china", "scotland"];
const lengths = words.length;
var invalid = ["0","1","2","3","4","5","6","7","8","9","enter","[","]","tab","capslock", 
"shift","control","alt", ".", "," , "/", "-", "=", "'",";", "backspace", "`"];
var used = [];
var usedwrong = [];
var guesses = 6 ; 
var index;
var j = round;
var nextRound;
var targetP;
var newP;

//printing out the underscores
function underDash(){
if (i < words[j].length) {
        for (i = 0; i < words[j].length; i++) {
                targetP = document.getElementById("current");
                newP = document.createElement("div");
                newP.setAttribute("class", "dash");
                newP.setAttribute("id", "current" + (i+1))
                newP.textContent = "_";
                console.log(newP);
                targetP.appendChild(newP);
                
        } 
}
}


//Selecting which flag to show
function rounds(){
if (round == 0) {
        document.getElementById("img").src="assets/images/USA.png";
        }
        else if (round == 1){
        document.getElementById("img").src="assets/images/Japan.png";
        }
        else if (round == 2){
        document.getElementById("img").src="assets/images/Italy.png";
        }
        else if (round == 3){
        document.getElementById("img").src="assets/images/Germany.png";
        }
        else if (round == 4){
        document.getElementById("img").src="assets/images/England.png";
        }
        else if (round == 5){
        document.getElementById("img").src="assets/images/China.png";
        }
        else if (round == 6){
        document.getElementById("img").src="assets/images/Scotland.png";
        }
}

//resets everything for the next round after you win
function winRound() {
        round = Math.floor(Math.random() * 7);
        score++;
        words = ["usa", "japan", "italy", "germany", "england", "china", "scotland"];
        document.getElementById("Text").innerHTML = words[j] + " was correct!";
        guesses = 6; 
        for(i = 0; i < words[j].length; i++){
                document.getElementById("current" + (i+1)).remove();
                }
        for(i = 0; i < words[j].length; i++){
                used.splice(i);
                }
        for(i = 0; i < words[j].length; i++){
                usedwrong.splice(i);
        }
        i = 0;
        return score;
        }


        

document.onkeyup = function(event) {

        j = round;
        var letter = event.key.toLowerCase();

        //writes the blank spaces
        underDash();

        //Win the grand prize
        if (score > 5 ) {
                document.getElementById("Text").innerHTML = "You Win!";
                document.getElementById("img").src="assets/images/Win.png";
                var audio = new Audio("assets/sounds/Woohoo.mp3");
                audio.play();
                return false;
        }
                //compares the key to letters of the round's country flag
                if (words[j].indexOf(letter) > -1) {
                        var x = words[j].indexOf(letter) + 1;
                        var y = 0;
                        document.getElementById("current" + x).innerHTML = letter; 
                        used.push(letter);
                        words[j] = words[j].replace(letter," ")
                        }
                //compares the key input to see if the key is invalid
                else if (invalid.indexOf(letter) > -1) {
                }   
                //compares the key input to see if the key has been used
                else if (used.indexOf(letter) > -1) {
                        return false;
                }  
                //compares the key input to see if the key has been used     
                else if (usedwrong.indexOf(letter) > -1) {
                        return false;
                }
                //compares the key input to see if the input is not correct
                else  {
                        usedwrong.push(letter);
                        guesses = guesses - 1;
                } 

        //Declaring a victory  
        if (used.length == words[j].length){  
        winRound();
        }


        //Declaring a loss
        if (guesses < 1) {
        alert("you lose!");   
        }
        
        //Deciding what word and flag will be displayed
        rounds();    

        document.getElementById("score").innerHTML = "Score: " + "<br>" + "<br>" + score;
        document.getElementById("guessesleft").innerHTML = "Guesses left: " + "<br>" + "<br>" + guesses;
        //document.getElementById("current").innerHTML = newP;
        document.getElementById("latter").innerHTML = "Letters already used: " + usedwrong;


}

        document.getElementById("score").innerHTML = "Score: " + "<br>" + "<br>" + score;
        document.getElementById("guessesleft").innerHTML = "Guesses left: " + "<br>" + "<br>" + guesses;
        //document.getElementById("current").innerHTML = newP;
        document.getElementById("latter").innerHTML = "Letters already used: " + usedwrong;
