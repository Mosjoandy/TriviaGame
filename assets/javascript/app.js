$(document).ready(function() {

// Making the timer
    var timeLimit = 16;
    var intervalId;

    //////////////////////////////////////////////////
    // THIS FUNCTION ALSO RUNS THE OMITTED SCREEN!! //
    //////////////////////////////////////////////////
    // function that runs timer
    function runTimer() {
        timeLimit = 16;
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
                    timeLimit = 16;
                    destroy();
                    runTimer();
                    questionCounter++;
                    nextQuestion(questionCounter);
                }, 4000);     
    
        } 
    }

// data vars
var correct = 0;
var incorrect = 0;
var omitted = 0;

// question bank with answers
var gameData = [
    {
        question: "In Doctor Strange, what dimension did the Ancient One push Stephen's astral form into?",
        choices: ["Mystic Dimension", "Astral Dimension", "Quantum Realm", "Dark Dimension"],
        answer: 1
    },
    {
        question: "In Guardians of the Galaxy Vol 2, who was the one led the mutiny against Yondu?",
        choices: ["Kraglin Obfonteri", "Razerface", "Taserface", "Vorker"],
        answer: 2
    },
    {
        question: "In Iron Man 3, what was War Machine renamed to?",
        choices: ["Patriot Protector", "Iron Protector", "Warmonger", "Iron Patriot"],
        answer: 3
    },
    {
        question: "In Black Panther, which tribe in Wakanda raise Rhinos and use them in combat?",
        choices: ["The Border Tribe", "The River Tribe", "The Jabari Tribe", "The Yoruba Tribe"],
        answer: 0
    },
    {
        question: "In Guardians of the Galaxy, what did Star-Lord call Rocket?",
        choices: ["Rabbit", "Panda", "Teddy Bear", "Rat"],
        answer: 1
    },
    {
        question: "In Thor: The Dark World, what did Jane touch that caused her to require medical attention in Asgard?",
        choices: ["Eye of Agamotto", "The Tesseract", "The Aether", "The Soul Stone"],
        answer: 2
    },
    {
        question: "In Thor: Ragnarok, what weapon did the Grandmaster use to end his cousin's life?",
        choices: ["Disintegrator", "Topaz", "Melt Stick", "Evaporator"],
        answer: 2
    },
    {
        question: "In Spiderman: Homecoming, how long was Spiderman trapped in the Damage Control Vault?",
        choices: ["37 minutes", "19 minutes", "12 minutes", "43 minutes"],
        answer: 0
    },
    {
        question: "In Age of Ultron, which MCU hero was hypnotized first by Wanda?",
        choices: ["Black Widow", "Thor", "Captain America", "Iron Man"],
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
    $(".questionArea").append("<h3>Correct: " + correct + "</h3>");
    $(".questionArea").append("<h3>Incorrect: " + incorrect + "</h3>");
    $(".questionArea").append("<h3>Omitted: " + omitted  + "</h3>");
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
          //Make a new container
          var container = $("<div>");
          //give that container a class="choices"
          container.attr("class", "choices");
            // forloop for questionCounter increments
            for (var i=0; i < gameData[questionCounter].choices.length; i++) {
                // Make divs for each possible answer
                    var answerAreas = $("<div>");
                // give the divs a class
                    answerAreas.attr("class", "clickableAnswer");
                // give the divs a data value of i
                    answerAreas.attr("data-value", i);
                // print out text of the answers (all four of them)
                    answerAreas.text(gameData[questionCounter].choices[i]);
                // append the answer divs to the parent container
                    container.append(answerAreas);

                
            };

        // hook for choiceArea and append the container just made
        $(".choiceArea").html(container);
    };
};


//////////////////////////////////////////////////
// On click function that ALSO has if/else to   //
// move onto the next question                  //
//////////////////////////////////////////////////

// When user clicks on one of the choices
$(document).on("click", ".clickableAnswer", function() {
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
                timeLimit = 16;
                runTimer();
                questionCounter++;
                nextQuestion(questionCounter);
            }, 4000);
        } else {
            console.log("you picked wrong")
            stop();
            incorrect++;
            $(".timer").empty();
            destroy();
            incorrectScreen();
            setTimeout(function() {
                destroy();  
                timeLimit = 16;
                runTimer();
                questionCounter++;
                nextQuestion(questionCounter);
            }, 4000);
        }
})

// function for starting the game
function startScreen() {
    $(".startScreen").html("<h1 class='clickStartScreen'>Click here to Start</h1>").on("click", function() {
        correct = 0;
        incorrect = 0;
        omitted = 0;
        questionCounter = 0;
        destroy();
        $(".questionArea").append("<img src='assets/images/introimage.gif' width='630' />");
        setTimeout(function() {
            destroy();
            nextQuestion(questionCounter);
            runTimer();
        }, 6000);
    })
}

//function for showing scores and ending game
function endScreen() {
    stop();
    destroy();
    $(".timer").empty();
        //display scores with append
    deploy();
    
    $(".startScreen").append("<div class='restart clickStartScreen'><h1>Click here to try again!</h1></div");
    $(".questionArea").append("<img src='assets/images/endimage.gif' />");
    
}

// Correct answer screen
function correctScreen() {
    $(".questionArea").html("<h1>Correct!</h1>")
    $(".questionArea").append("<img src='assets/images/rightimage.gif' width='500px' />");
    deploy();
}

// incorrect answer screen
function incorrectScreen() {
    $(".questionArea").html("<h1>Incorrect!</h1>")
    $(".questionArea").append("<img src='assets/images/incorrectimage.gif' height='283px' />");
    deploy();
}

// omitted answer screen
function omittedScreen() {
    $(".questionArea").html("<h1>You were AFK!</h1>")
    $(".questionArea").append("<img src='assets/images/wakeup.gif' width='500px' />");
    deploy();
}

// BEGIN THE GAME!
startScreen();

    
})
