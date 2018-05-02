var timeLimit = 30;
var intervalId;

function runTimer() {
    intervalId = setInterval(decrement, 1000);
    timeLimit = 30;
}

function stop() {
    clearInterval(intervalId);
}

function decrement() {
    timeLimit--;
    $(".timer").html("Time Left: " + timeLimit);

    if (timeLimit === 0) {
        stop();

        // GO TO NEXT QUESTION
    }
}