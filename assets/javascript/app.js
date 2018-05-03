// Making the timer
var timeLimit = 11;
var intervalId;

// creating functions for timer
// Start the timer
function runTimer() {
    timeLimit = 11;
    intervalId = setInterval(decrement, 1000);
}

// Stop the timer
function stop() {
    clearInterval(intervalId);
}

// function that reduces by "seconds"
function decrement() {
    timeLimit--;
    $(".timer").html("Time Left: " + timeLimit);

    //Time limit stops the countdown
    if (timeLimit === 0) {
        
        stop();
        destroy();
        questionCounter++;
        nextQuestion(questionCounter);
        omitted++;        
   
    } 
}

// data vars
var correct = 0;
var incorrect = 0;
var omitted = 0;

// question bank with answers
var gameData = [
    {
        question: "question 1",
        choices: ["Lose", "Lose", "Lose", "Win"],
        answer: 3
    },
    {
        question: "question 2",
        choices: ["Win", "Lose", "Lose", "Lose"],
        answer: 0
    },
    {
        question: "question 3",
        choices: ["Lose", "Win", "Lose", "Lose"],
        answer: 1
    }
]

// function that clears the choice and question areas
function destroy() {
    $(".choiceArea").empty();
    $(".questionArea").empty();
}

// var that keeps track of object++
var questionCounter = 0;

//function for next screen with logic
function nextQuestion(questionCounter) {
    // condition for end the game
    if (questionCounter === gameData.length) {
        endScreen();
        stop();
    }
    else {
        // Display next question in questionArea
        $(".questionArea").append(gameData[questionCounter].question);

        // forloop for questionCounter increments
        for (var i=0; i < gameData[questionCounter].choices.length; i++) {
            
            //Make a new container
            var container = $("<div>");
            //give that container a class="choices"
            container.attr("class", "choices");
            // give that container a data value of i
            container.attr("data-value", i);
            // display the choices for the user
            container.text(gameData[questionCounter].choices[i]);
            // hook for choiceArea and append the container just made
            $(".choiceArea").append(container);
        };
    };
};

// When user clicks on one of the choices
$(document).on("click", ".choices", function() {
    //assign a value to data-value
    var answerChoice = $(this).attr("data-value");
    //convert the value into an integer
    answerChoice = parseInt(answerChoice);
        
        //if the answer chosen is the same as the answer integer, show next question,
        //increase correct or incorrect accordingly
        if (answerChoice === gameData[questionCounter].answer) {
            console.log("you picked right")
            stop();
            correct++;
            timeLimit = 11;
            runTimer();
            questionCounter++;
            destroy();
            nextQuestion(questionCounter);                           
        } else {
            console.log("you picked wrong")
            stop();
            incorrect++;   
            timeLimit = 11;
            runTimer(); 
            questionCounter++;
            destroy();
            nextQuestion(questionCounter);
        }
})

// function for starting the game
function startScreen() {
    $(".startScreen").html("<h1>Click to Start</h1>").on("click", function() {
        correct = 0;
        incorrect = 0;
        omitted = 0;
        questionCounter = 0;
        runTimer();
        nextQuestion(questionCounter);
        $(".startScreen").empty();
    })
}

//function for showing scores and ending game
function endScreen() {
    stop();
    destroy();
    $(".timer").empty();
        //display scores with append
    $(".startScreen").html("<h1>Correct: " + correct + "</h1>")
    $(".startScreen").append("<h1>Incorrect: " + incorrect + "</h1>")
    $(".startScreen").append("<h1>Omitted: " + omitted  + "</h1>")
    $(".startScreen").append("<div class='restart'><h1>Try Again</h1></div");
    
}

// BEGIN THE GAME!
startScreen();

// Show scores and end the game
// if (correct + incorrect + omitted === 3) {
    
// }