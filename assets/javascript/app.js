// Making the timer
var timeLimit = 30;
var intervalId;

// creating functions for timer
// Start the timer
function runTimer() {
    timeLimit = 30;
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

        // GO TO NEXT QUESTION
    } else {
        omitted++;
    }
}

// data vars
var correct = 0;
var incorrect = 0;
var omitted = 0;

//arrays with questions, answers, and right answers
var questions = ["What is my name?", "What is your name?"]
var answers = {
    question1: ["Mel", "David", "Chris", "Nick"],
    question2: ["Marcella", "Marisa", "Jontue", "Janet"]
}
var rightanswers = ["Nick", "Marcella"]

// correct answer function
function correctChoice() {
    correct++;
}

// wrong answer function
function incorrectChoice() {
    incorrect++;
}

// function that prints questions to the screen
function showQuestions() {
    $(".questionArea").html(questions[0])
}

// functino that prints answers to the screen
function showAnswers() {
    $(".answerArea").html(  "<p>A. " + answers.question1[0] + "</p>" +
                            "<p>B. " + answers.question1[1] + "</p>" +
                            "<p>C. " + answers.question1[2] + "</p>" +
                            "<p>D. " + answers.question1[3] + "</p>")
}

// function that will run forloop and show answers
function loopAnswers() {
    for (var i=0; i < answers.question1.length; i++) {
    
}
}