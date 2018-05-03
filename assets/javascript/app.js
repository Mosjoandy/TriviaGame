$(document).ready(function() {

// Making the timer
    var timeLimit = 11;
    var intervalId;

    
    //////////////////////////////////////////////////
    // THIS FUNCTION ALSO RUNS THE OMITTED SCREEN!! //
    //////////////////////////////////////////////////
    // fucntion that runs timer
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
            console.log("you omitted")
                stop();
                omitted++;
                $(".timer").empty();
                destroy();
                omittedScreen();
                setTimeout(function() {
                    timeLimit = 11;
                    destroy();
                    runTimer();
                    questionCounter++;
                    nextQuestion(questionCounter);
                }, 5000);     
    
        } 
    }

// data vars
var correct = 0;
var incorrect = 0;
var omitted = 0;

// question bank with answers
var gameData = [
    {
        question: "What was the first Marvel Cinematic Universe movie?",
        choices: ["The Incredible Hulk", "Iron Man", "Captain America", "Spiderman"],
        answer: 1
    },
    {
        question: "Which MCU movie has the highest worldwide box office gross?",
        choices: ["Black Panther", "Avenger: Age of Ultron", "Marvel's The Avengers", "Captain America: Civil War"],
        answer: 2
    },
    {
        question: "Which MCU movie had the lowest production budget?",
        choices: ["Spiderman: Homecoming", "Thor", "Doctor Strange", "Captain America: The First Avenger"],
        answer: 3
    },
    {
        question: "Which of these MCU heroes can wield Mjolnir?",
        choices: ["The Hulk", "Heimdall", "Spiderman", "Vision"],
        answer: 3
    },
    {
        question: "In Black Panther, Shuri wields what weapon?",
        choices: ["Vibranium Gauntlets", "Vibranium Claws", "Vibranium Arms", "Vibranium Battle Stave"],
        answer: 0
    },
    {
        question: "In Guardians of the Galaxy, what did Star-Lord call Rocket?",
        choices: ["Rabbit", "Panda", "Teddy Bear", "Rat"],
        answer: 1
    },
    {
        question: "In Doctor Strange, what car was Stephen Strange driving before he crashed?",
        choices: ["Ferarri 488 Spider", "Agera RS", "Lamborghini Huracan", "McLaren 720S"],
        answer: 2
    },
    {
        question: "In Thor: Ragnarok, what name was given to the last Valkyrie by the Grandmaster?",
        choices: ["My Favorite", "Angry Girl", "Scrapper 142", "Brunhilde"],
        answer: 2
    },
    {
        question: "In Spiderman: Homecoming, how long was Spiderman trapped in the Damage Control Vault?",
        choices: ["37 minutes", "19 minutes", "12 minutes", "43 minutes"],
        answer: 0
    },
    {
        question: "In Ant-Man, who did Ant-Man face off with at the New Avenger's Facility?",
        choices: ["Black Widow", "Hawkeye", "War Machine", "Falcon"],
        answer: 3
    },
    {
        question: "In the MCU, what does S.H.I.E.L.D. stand for?",
        choices: ["Supreme Headquarters International Espionage Law-Enforcement Division", "Strategic Homeland Intervention Enforcement Logistics Division", "Strategic Hazard Intervention Espionage Logistics Directorate", "Strategic Homeland International Espionage Logitics Division"],
        answer: 1
    }
]

// function that clears the choice and question areas
function destroy() {
    $(".choiceArea").empty();
    $(".questionArea").empty();
    $(".startScreen").empty();
}

function deploy() {
    $(".startScreen").append("<h1>Correct: " + correct + "</h1>");
    $(".startScreen").append("<h1>Incorrect: " + incorrect + "</h1>");
    $(".startScreen").append("<h1>Omitted: " + omitted  + "</h1>");
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


//////////////////////////////////////////////////
// On click function that ALSO has if/else to   //
// move onto the next question                  //
//////////////////////////////////////////////////

// When user clicks on one of the choices
$(document).on("click", ".choices", function() {
    //assign a value to data-value
    var answerChoice = $(this).attr("data-value");
    //convert the value into an integer
    answerChoice = parseInt(answerChoice);
        
        //if the answer chosen is the same as the answer integer, show next question,
        //increase correct or incorrect accordingly
        if (answerChoice === gameData[questionCounter].answer) {
            console.log("you picked right");
            stop();
            correct++;
            $(".timer").empty();
            destroy();
            correctScreen();
            setTimeout(function() {
                destroy();
                timeLimit = 11;
                runTimer();
                questionCounter++;
                nextQuestion(questionCounter);
            }, 5000);
        } else {
            console.log("you picked wrong")
            stop();
            incorrect++;
            $(".timer").empty();
            destroy();
            incorrectScreen();
            setTimeout(function() {
                destroy();  
                timeLimit = 11;
                runTimer();
                questionCounter++;
                nextQuestion(questionCounter);
            }, 5000);
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
    deploy();
    $(".startScreen").append("<div class='restart'><h1>Click Anywhere to try again!</h1></div");
    
}

// Correct answer screen
function correctScreen() {
    $(".startScreen").html("<h1>You chose correctly!</h1>")
    $(".startScreen").append("<img src='assets/images/rightimage.gif' width='500px' />");
    deploy();
}

// incorrect answer screen
function incorrectScreen() {
    $(".startScreen").html("<h1>You chose incorrectly!</h1>")
    $(".startScreen").append("<img src='assets/images/incorrectimage.gif' width='500px' />");
    deploy();
}

// omitted answer screen
function omittedScreen() {
    $(".startScreen").html("<h1>You were AFK!</h1>")
    $(".startScreen").append("<img src='assets/images/wakeup.gif' width='500px' />");
    deploy();
}

// BEGIN THE GAME!
startScreen();

    
})
