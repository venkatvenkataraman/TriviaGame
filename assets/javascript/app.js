var triviaQAArray = [{
    "qNumber": 1,
    "question": "What is the name of the actress who plays Hermione Granger in the Harry Potter series of films?",
    "ansChoice1": "Nicole Kidman",
    "ansChoice2": "Debra Messing",
    "ansChoice3": "Emma Watson",
    "ansChoice4": "Natalie Portman",
    "correctAns": 3,
    "explanation":"",
    "picture":"emmaWatson.jpg",
  },{
    "qNumber": 2,
    "question": "How many houses are at the Hogwarts School of Witchcraft and Wizardry?",
    "ansChoice1": "Three",
    "ansChoice2": "Four",
    "ansChoice3": "Eight",
    "ansChoice4": "Five",
    "correctAns": 2,
    "explanation": "Gryffindor, Ravenclaw, Hufflepuff, & Slytherin",
    "picture": "hogwartsHouses.jpg",
  },{
    "qNumber": 3,
    "question": "Which book was famously rejected by 12 publishers before finally being accepted by Bloomsbury?",
    "ansChoice1": "Harry Potter and The Philosopher's Stone",
    "ansChoice2": "Harry Potter and The Chamber of Secrets",
    "ansChoice3": "Harry Potter and The Goblet of Fire",
    "ansChoice4": "Harry Potter and The Deathly Hallows",
    "correctAns": 1,
    "explanation": "",
    "picture": "bookPicture.jpg",
  },{
    "qNumber": 4,
    "question": 'Who directed the movie "Harry Potter and the Prisoner of Azkaban"?',
    "ansChoice1": "David Yates",
    "ansChoice2": "Mike Newell",
    "ansChoice3": "Chris Columbus",
    "ansChoice4": "Alfonso Cuarón",
    "correctAns": 4,
    "explanation": "",
    "picture": "alfonsoCuaron.jpg",
  },{
    "qNumber": 5,
    "question": "In what year was the first Harry Potter movie released?",
    "ansChoice1": "1998",
    "ansChoice2": "2000",
    "ansChoice3": "2001",
    "ansChoice4": "2003",
    "correctAns": 3,
    "explanation": "November 14, 2001",
    "picture": "movieStill.jpg",
  },{
    "qNumber": 6,
    "question": "What school does Harry Potter attend?",
    "ansChoice1": "Durmstrang Institute for Magical Learning",
    "ansChoice2": "Hogwarts School of Witchcraft and Wizardry",
    "ansChoice3": "Ilvermorny School of Witchcraft and Wizardry",
    "ansChoice4": "Wizarding Academy of Dramatic Arts",
    "correctAns": 2,
    "explanation": "",
    "picture": "hogwartsSchool.jpg",
  }
];

var questionsOrder = [];

var currentQuestion;

var pickedAnswer = 0;

var correctAnswerCount = 0, incorrectAnswerCount = 0, unAnsweredCount = 0;

var correctAnswerChosen = false;

function buildRandomQuestionsList(){

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  for (var i = 0; (questionsOrder.length<6); i++) {
  var chosenQuestion = getRandomIntInclusive(1,6);
    if (questionsOrder.indexOf(chosenQuestion) == -1){
        //Question is not currently in list
        questionsOrder.push(chosenQuestion);
    }
  }
}

function displayANewTriviaQuestion(questionNumber){
  $("#timerDisplay").show();
  stopwatch.reset();
  stopwatch.start();
  $('#ansImage').hide();
  $('#ansChoice4').show();
  $("#triviaQuestion").text("Question: "+ triviaQAArray[questionNumber-1].question);
  $("#ansChoice1").text("1: "+triviaQAArray[questionNumber-1].ansChoice1);
  $("#ansChoice2").text("2: "+triviaQAArray[questionNumber-1].ansChoice2);
  $("#ansChoice3").text("3: "+triviaQAArray[questionNumber-1].ansChoice3);
  $("#ansChoice4").text("4: "+triviaQAArray[questionNumber-1].ansChoice4);
  $('#chk1').show();
  $('#chk2').show();
  $('#chk3').show();
  $('#chk4').show();
  $("#commit").show();
  $("#startOver").hide();
}

$('.ansCheck').click(function() {
  $('.ansCheck').not(this).prop('checked', false);

  if ($('#chk1').prop('checked')){
      pickedAnswer = 1;
  console.log("pickedAnswer: "+pickedAnswer);
  }
  if ($('#chk2').prop('checked')){
      pickedAnswer = 2;
  console.log("pickedAnswer: "+pickedAnswer);
  }
  if ($('#chk3').prop('checked')){
      pickedAnswer = 3;
  console.log("pickedAnswer: "+pickedAnswer);
  }
  if ($('#chk4').prop('checked')){
      pickedAnswer = 4;
  console.log("pickedAnswer: "+pickedAnswer);
  }

});


function displayFinalScore(correctAnswerCount, incorrectAnswerCount, unAnsweredCount){
   // window.open('finalScore.html','_self');

   stopwatch.stop();
   stopwatch.reset();
   $("#timerDisplay").hide();
   console.log(correctAnswerCount);
   console.log(incorrectAnswerCount);
   console.log(unAnsweredCount);
   $('#triviaQuestion').text("YOUR RESULTS SUMMARY");
   $('#ansChoice1').text("Correct Answers: " + correctAnswerCount);
   $('#ansChoice2').text("Incorrect Answers: " + incorrectAnswerCount);
   $('#ansChoice3').text("Unanswered: " + unAnsweredCount);
   $('#ansChoice4').text("");
   $('#chk1').hide();
   $('#chk2').hide();
   $('#chk3').hide();
   $('#chk4').hide();
   // $("#commit").prop('value', 'Start Over?');
   $("#commit").hide();
   $("#startOver").show();
   // $("#correctAnswers").text("Correct Answers: " + correctAnswerCount);
   // $("#incorrectAnswers").text("Incorrect Answers: " + incorrectAnswerCount);
   // $("#unAnswered").text("Unanswered: "+ unAnsweredCount);
}

var clockRunning = false;
var intervalId;
var stopwatch = {
  time: 10,
  reset: function() {
    stopwatch.time = 10;
      // DONE: Change the "display" div to "00:00."
    $("#timerDisplay").text("Countdown: "+"10" +"Secs");
  },
  start: function() {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  count: function() {
    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    if (stopwatch.time == 0){
      // alert("TIME UP ON THIS QUESTION! CORRECT ANSWER DISPLAYED AND MOVING ON");
      unAnsweredCount++;
      correctAnswerChosen = false;
      displayCorrectAnswer(correctAnswerChosen,currentQuestion);
      if (questionsOrder.length != 0) {
          currentQuestion = questionsOrder.pop();
          // setTimeout (displayANewTriviaQuestion(currentQuestion), 2000);
          setTimeout (function(){displayANewTriviaQuestion(currentQuestion);}, 2000);
          // displayANewTriviaQuestion(currentQuestion);
      }
      else //Questions over; Wrap up with score
      {
        displayFinalScore(correctAnswerCount, incorrectAnswerCount, unAnsweredCount);
      }
    }
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#timerDisplay").text("Countdown: "+ converted + " Secs");
  },
  stop: function() {
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
      },
  timeConverter: function(t){
    // var minutes = Math.floor(t / 60);
    var seconds = t;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return seconds;
 }
};

function displayCorrectAnswer(correctAnswerChosen, currentQuestion){
  $("#timerDisplay").hide();
  stopwatch.stop();
  stopwatch.reset();
  if (correctAnswerChosen) {
    $('#triviaQuestion').html("YOU ARE CORRECT!");
  }
  else {
    $('#triviaQuestion').html("YOU ARE WRONG!");
  }
  $('#ansChoice1').html("The Correct Answers is: ");
  $('#ansChoice2').html("Answer #: " + triviaQAArray[currentQuestion-1].correctAns);
  if (triviaQAArray[currentQuestion-1].correctAns == 1){
    $('#ansChoice3').html(triviaQAArray[currentQuestion-1].ansChoice1);
  }
  else if (triviaQAArray[currentQuestion-1].correctAns == 2){
    $('#ansChoice3').html(triviaQAArray[currentQuestion-1].ansChoice2);
  }
  else if (triviaQAArray[currentQuestion-1].correctAns == 3){
    $('#ansChoice3').html(triviaQAArray[currentQuestion-1].ansChoice3);
  }
  else if (triviaQAArray[currentQuestion-1].correctAns == 4){
    $('#ansChoice3').html(triviaQAArray[currentQuestion-1].ansChoice4);
  }
  // var tempString = "ansChoice" + pickedAnswer;
  // console.log(tempString);
  // console.log(currentQuestion);
  // console.log(triviaQAArray[currentQuestion-1].tempString);
  // $('#ansChoice3').html(triviaQAArray[currentQuestion-1].tempString);

  var imagePath = "assets/images/"+triviaQAArray[currentQuestion-1].picture;
  console.log(imagePath);
  // $('#ansImage').prepend('<img src=""+imagePath/>');
  $('#imageDiv').prepend($('<img>',{id:'ansImage',src:imagePath}));
  $('#ansImage').show();
  // $('#ansImage').html('<img src="assets/images/"+triviaQAArray[currentQuestion-1].picture/>');
  $('#ansChoice4').hide();
  $('#chk1').hide();
  $('#chk2').hide();
  $('#chk3').hide();
  $('#chk4').hide();
  $("#commit").hide();
  $("#startOver").hide();

  // var audio = new Audio("PHIL_COLLINSClip.mp3");
  // audio.loop = false;
  // audio.play();
}

$('#commit').on('click', function() {

     console.log("Commit Current Q: "+currentQuestion);
     console.log("Commit Current Q correctAns: "+triviaQAArray[currentQuestion-1].correctAns);
     if (pickedAnswer == triviaQAArray[currentQuestion-1].correctAns) {
          // alert("CORRECT ANSWER");
          correctAnswerCount++;
          correctAnswerChosen = true;
          displayCorrectAnswer(correctAnswerChosen,currentQuestion);
     }
     else {
          // alert("WRONG ANSWER");
          incorrectAnswerCount++;
          correctAnswerChosen = false;
          displayCorrectAnswer(correctAnswerChosen, currentQuestion);
     }
     console.log(questionsOrder);

     if (questionsOrder.length != 0) {
     // window.open('started.html','_self');
     currentQuestion = questionsOrder.pop();
     setTimeout (function(){displayANewTriviaQuestion(currentQuestion);}, 2000);
     // displayANewTriviaQuestion(currentQuestion);
     }
     else //Questions over; Wrap up with score
     {
       console.log("List is now empty. All questions exhausted");
       stopwatch.stop();
       displayFinalScore(correctAnswerCount, incorrectAnswerCount, unAnsweredCount);
     }
});

$('#startButton').on('click', function(){
  // window.open('started.html','_self');
  $("#startOver").hide();
  buildRandomQuestionsList();
  console.log(questionsOrder);
  currentQuestion = questionsOrder.pop();
  console.log("startButton Current Q: "+currentQuestion);
  console.log("startButton Current Q correctAns: "+triviaQAArray[currentQuestion].correctAns);
  displayANewTriviaQuestion(currentQuestion);
  console.log(questionsOrder);
});

window.onload = function(){
  $("#startOver").hide();
  buildRandomQuestionsList();
  console.log(questionsOrder);
  currentQuestion = questionsOrder.pop();
  console.log("windows.onload Current Q: "+currentQuestion);
  console.log("windows.onload Current Q correctAns: "+triviaQAArray[currentQuestion].correctAns);
  displayANewTriviaQuestion(currentQuestion);
  console.log(questionsOrder);
};

$('#startOver').on('click', function(){
  window.open('started.html','_self');
  $("#startOver").hide();
  buildRandomQuestionsList();
  console.log(questionsOrder);
  currentQuestion = questionsOrder.pop();
  console.log("startOver Current Q: "+currentQuestion);
  console.log("startOver Current Q correctAns: "+triviaQAArray[currentQuestion].correctAns);
  displayANewTriviaQuestion(currentQuestion);
  console.log(questionsOrder);
});
