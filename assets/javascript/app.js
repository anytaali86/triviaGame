var triviaQuestions = [{
	question: "What is Peter Parker's middle name?",
	answerList: ["William", "Benjamin ", "Steven", "Jones"],
	answer: 1 
	// no:1
},{
	question: "Which Marel villian possessed the infinity Gems?",
	answerList: ["Thanos", "Galactus", "Loki", "Ultron"],
	answer: 0
	// no:2
},{
	question: "What s Black window's real name?",
	answerList: ["Natalia Ravenova", "Natalia Romanova", "Natasha Ravenova", "Natasha Romano"],
	answer: 1
	// no:3
},{
	question: "Where did Iron Man first face off agaisnt Whiplash?",
	answerList: ["Paris", "Monaco", "NewYork", "Daytona"],
	answer: 1
	// no:4
},{
	question: "Who played Gamora in Guardians of the Galaxy?",
	answerList: ["Jaimie Alexander", "Zoe Saldana", "Karen Gillan", "Kat Dennings"],
	answer: 1
	// no:5
},{
	question: "Who directed \'The Avengers \'?",
	answerList: ["Jose Wheldon", "James Cameron", "James Gunn ", "David S. Goyer"],
	answer: 0
	// no:6
},{
	question: "How many infinity Stones are said to exist in the Marvel Cinematic Universe?",
	answerList: ["20", "2", "12", "6"],
	answer: 3
	// no:7
},{
	question: "What race is Ronan the Accuser?",
	answerList: ["Kree", "Skrull", "Xandarian", "Enigma"],
	answer: 1
	// no:8
},{
	question: "What was Red Skull's real name'?",
	answerList: ["Arnim Zola", "Johann Schmidt", "Joseph Goebbels", "Johannes Wagners"],
	answer: 1
	// no:9
},{
	question: "Name the actress who plays Maria Hill?",
	answerList: ["Cobie", "Kat", "Hayley", "Emily"],
	answer: 3
	// no:10
},{
	question: "Captain America's shield made of?",
	answerList: ["Titanium Alloy", "Mithril", "Adamantium", "Vibranium"],
	answer: 3
	// no:11
},{
	question: "Who is Loki's biological father?",
	answerList: ["Volstagg", "Jotunn", "Odin", "Laufey"],
	answer: 3
	// no:12

},{
	question: "Who was Bruce Banner's ove interest in \'The Incredible Hulk\'?",
	answerList: ["Eleanor Ross", "", "June Carter", "Peggy"],
	answer: 3
	// no:13
},{
	question: "Forged in the heart of a dying star, what is Thor's hammaer's name?",
	answerList: ["Mjolnir", "Thunder Bringer", "Fjordir", "Anduril"],
	answer: 0
	// no:14
},{
	question: "'what did Peggy Carter Promise to steve Rogers/ Captain America before he crashed Red Skull\' bomer?",
	answerList: ["A dance ", "A Kiss ", "A higher Clearance Level", "Nothing"],
	answer: 2
	// no:15
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, You got it right!",
	incorrect: "Nah , that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
currentQuestion = 0;
correctAnswer = 0;
incorrectAnswer = 0;
unanswered = 0;
newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
countdown();
	//clicking an answer will pause the time and setup answerPage
		$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
