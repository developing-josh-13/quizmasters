// All questions for Food and Drink quiz and their corresponding answers //
const questions = [
	{
		question: 'What is the official corporate logo for Guinness?',
		answers: [
			{answer: 'Banjo', correct: 'no'},
			{answer: 'Triangle', correct: 'no'},
			{answer: 'Harp', correct: 'yes'},
			{answer: 'Cello', correct: 'no'}
		]
	},
	{
		question: 'In which country are the self-proclaimed \'master chocolatiers\' Lindt based?',
		answers: [
			{answer: 'Switzerland', correct: 'yes'},
			{answer: 'Belgium', correct: 'no'},
			{answer: 'France', correct: 'no'},
			{answer: 'Sweden', correct: 'no'}
		]
	},
	{
		question: 'Which fast-food establishment\'s long-held slogan is "Eat Fresh"?',
		answers: [
			{answer: 'Popeye\'s', correct: 'no'},
			{answer: 'KFC', correct: 'no'},
			{answer: 'Taco Bell', correct: 'no'},
			{answer: 'Subway', correct: 'yes'}
		]
	},
	{
		question: 'Which country produces the most coffee in the world?',
		answers: [
			{answer: 'Mexico', correct: 'no'},
			{answer: 'Brazil', correct: 'yes'},
			{answer: 'Argentina', correct: 'no'},
			{answer: 'Colombia', correct: 'no'}
		]
	},
	{
		question: 'Which is the oldest soft drink to be served in America?',
		answers: [
			{answer: 'Coca Cola', correct: 'no'},
			{answer: 'Fanta', correct: 'no'},
			{answer: 'Dr Pepper', correct: 'yes'},
			{answer: 'Sprite', correct: 'no'}
		]
	}
]

// Shuffles the questions
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};
shuffle(questions);

// Placeholders that will get updated as the quiz progresses
let questionIndex = 0;
let correctAnswers = [];
let chosenAnswers = [];
let radiosChecked = [];
let userScore = 0;
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let inputs = document.getElementsByTagName('input');

function toggleButtons() {
	next.hidden = false;
	if (questionIndex == 4){
		next.innerHTML = "Submit &#9989;"
		next.removeEventListener("click", nextQuestion);
		next.addEventListener("click", finalResults);
	}
};

// Display current question on screen
function displayQuestion(){
	// Fill in h1 tag with current question
	document.getElementById("question").innerHTML = questions[questionIndex].question;
	
	// Fill in label tags with answers to current question
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
		document.getElementById(`ans${i + 1}`).innerHTML = questions[questionIndex].answers[i].answer;
		inputs[i].addEventListener("click", toggleButtons)
	}

	next.addEventListener("click", nextQuestion);
	prev.addEventListener("click", prevQuestion);

	if (questionIndex == 0){
		prev.hidden = true;
	} else {
		prev.hidden = false;
	}
}


// Move to next question
function nextQuestion() {
	// Check which answer is selected and add it to chosenAnswers array
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
		if (inputs[i].checked == true) {
			chosenAnswers.splice(questionIndex, 1, questions[questionIndex].answers[i].answer);
			radiosChecked.splice(questionIndex, 1, i);
		}
		// Reset radio buttons post-answer-check
		inputs[i].checked = false;
	};

	// Add correct answer to correctAnswers array
	correctAnswers.splice(questionIndex, 1, questions[questionIndex].answers.find(answer => answer.correct == "yes").answer);
	

	next.hidden = true;
	questionIndex++;
	displayQuestion();
};

// Move to previous question
function prevQuestion() {

	// Remove last chosen and correct answers from their arrays
	// chosenAnswers.pop(); // Old Method
	// correctAnswers.pop(); // Old Method
	
	inputs[radiosChecked[radiosChecked.length - 1]].checked = true;
	// radiosChecked.pop(); // Old Method

	next.hidden = false;
	next.innerHTML = "Next Question &#9193;"
	next.removeEventListener("click", finalResults);
	next.addEventListener("click", nextQuestion);

	userScore--;
	questionIndex--;
	displayQuestion();
}

// Move to post-quiz results screen
function finalResults(){

	// Check which answer is selected and add it to chosenAnswers array
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
		if (inputs[i].checked == true) {
			chosenAnswers.splice(questionIndex, 1, questions[questionIndex].answers[i].answer)
		}
		// Reset radio buttons post-answer-check
		inputs[i].checked = false;
	};

	// Add correct answer to correctAnswers array
	correctAnswers.splice(questionIndex, 1, questions[questionIndex].answers.find(answer => answer.correct == "yes").answer);

	// If each answer matches, increment user score by 1
	for (let i = 0; i < questions.length; i++) {
		console.log(chosenAnswers[i]);
		console.log(correctAnswers[i]);
		if (chosenAnswers[i] === correctAnswers[i]) {
		userScore++;
		
		}
	}

	document.getElementById("quiz").style.display = "none";
	document.getElementById("results").style.display = "flex";
	document.getElementById("yourscore").innerHTML = `${userScore}`;
}

// Initialise quiz with first question
displayQuestion();