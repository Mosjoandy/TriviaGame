# TriviaGame


## Overview

This project shows improved usage of jQuery and Javascript. Used more jQuery methods to complete Javascript tasks. Players answer a multiple choice question, which is then replaced with a new question, for a total of 10 questions. There are transitions and a start/end screen.
* * *
![The Marvel Cinema Universe Quiz](https://cdn.discordapp.com/attachments/276798661256806410/441842604095700994/unknown.png)

## Process

- When the page has been loaded, the user is presented with a start screen, prompting a click to begin.
- Users begins the quiz, selecting from four different options.
- There is a set time limit on each question.
- If the user does not select an option, chooses the correct option, or incorrect option, an appropriate transition screen will display.
- Once all the questions have been either answered or omitted, an end screen displays the final score. Included is a reset option.

## Logic

### functions:

- nextQuestion - function that uses a forloop to increase a counter which displays the corresponding question and answer choices.
- Creates a container that appends to a hook in the index.html, creates 4 new containers with answers.

```function nextQuestion(questionCounter) {
    if (questionCounter === gameData.length) {
        endScreen();
        stop();
    }
    else {
        $(".questionArea").append(gameData[questionCounter].question);
          var container = $("<div>");
          container.attr("class", "choices");
            for (var i=0; i < gameData[questionCounter].choices.length; i++) {
                    var answerAreas = $("<div>");
                    answerAreas.attr("class", "clickableAnswer");
                    answerAreas.attr("data-value", i);
                    answerAreas.text(gameData[questionCounter].choices[i]);
                    container.append(answerAreas);           
            };
        $(".choiceArea").html(container);
    };
};
```
- click function that converts the choice of user into useable data using parseInt. Answer data is an integar, so used a 
- if user choice is correct or not. Shows transition screens for 4 seconds, displaying correct, incorrect, and omitted.
```
$(document).on("click", ".clickableAnswer", function() {
    var answerChoice = $(this).attr("data-value");
    answerChoice = parseInt(answerChoice);
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
```
- Timer function that displays a countdown for the user when invoked. Decrement function used to decrease the timer and house omit logic.
```
var timeLimit = 16;
var intervalId;

function runTimer() {
    timeLimit = 16;
    intervalId = setInterval(decrement, 1000);
}
function stop() {
    clearInterval(intervalId);
}
function decrement() {
    timeLimit--;
    $(".timer").html("Time Left: " + timeLimit);
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
```

## CDN's Used

- Bootstrap v4.1.0 - [getbootstrap](https://getbootstrap.com/)
- jQuery v3.3.1 (uncompressed) - [jQuery core](https://code.jquery.com/)
- Reset CSS by meyerweb - [meyerweb CSS reset](https://meyerweb.com/eric/tools/css/reset/)