const questions = [
	{ // Q1
		question: 'What is the name of an angle between 180 and 360 degrees?',
		answers: [
			{answer: 'Tangent', correct: 'no'},
			{answer: 'Acute', correct: 'no'},
			{answer: 'Obtuse', correct: 'no'},
			{answer: 'Reflex', correct: 'yes'}
		]
	},
	{ // Q2
		question: 'How many lines are needed to sketch a cube?',
		answers: [
			{answer: '7', correct: 'no'},
			{answer: '8', correct: 'no'},
			{answer: '9', correct: 'yes'},
			{answer: '10', correct: 'no'}
		]
	},
	{ // Q3
		question: 'What is the formula for Pythagoras\'s theorem to calculate the longest side of a right-angled triangle?',
		answers: [
			{answer: 'a + b = c^2', correct: 'no'},
			{answer: 'a^2 + b^2 = c^2', correct: 'yes'},
			{answer: '(a+b)^2 = c^2', correct: 'no'},
			{answer: 'a^3 + b^3 = c^3', correct: 'no'}
		]
	},
	{ // Q4
		question: 'How many millimetres are in a kilometre?',
		answers: [
			{answer: '10 thousand', correct: 'no'},
			{answer: '100 thousand', correct: 'no'},
			{answer: '1 million', correct: 'yes'},
			{answer: '10 million', correct: 'no'}
		]
	},
	{ // Q5
		question: 'Which of the following is a prime number?',
		answers: [
			{answer: '57', correct: 'no'},
			{answer: '67', correct: 'yes'},
			{answer: '77', correct: 'no'},
			{answer: '87', correct: 'no'}
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
let userScore = 0;

// Contains all possible answers to current question
let inputs = document.getElementsByTagName('input');
console.log(inputs);

// Display current question on screen
function displayQuestion(){
	// Fill in h1 tag with current question
	document.getElementById("question").innerHTML = questions[questionIndex].question;
	
	// Fill in label tags with answers to current question
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
	document.getElementById(`ans${i + 1}`).innerHTML = questions[questionIndex].answers[i].answer;
	}

	let next = document.getElementById("next");
	let prev = document.getElementById("prev");

	// Modify behaviour of Next Question button based on the current question
	if (questionIndex == 4) {
		next.removeEventListener("click", nextQuestion);
		next.innerHTML = "Submit &#9989;";
		next.addEventListener("click", finalResults);
	} else {
		next.removeEventListener("click", finalResults);
		next.innerHTML = "Next Question &#9193;";
		next.addEventListener("click", nextQuestion);
	}

	// Modify behaviour of Previous Question button based on the current question
	if (questionIndex != 0 ) {
		prev.hidden = false;
		prev.innerHTML = "Previous Question &#9194;"
		prev.addEventListener("click", prevQuestion);
	} else {
		prev.hidden = true;
		prev.removeEventListener("click", prevQuestion);
	}
}

// Move to next question
function nextQuestion() {
	// Check which answer is selected and add it to chosenAnswers array
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
		if (inputs[i].checked == true) {
			chosenAnswers.push(questions[questionIndex].answers[i].answer)
		}
		// Reset radio buttons post-answer-check
		inputs[i].checked = false;
	};

	// Add correct answer to correctAnswers array
	correctAnswers.push(questions[questionIndex].answers.find(answer => answer.correct == "yes").answer);

	questionIndex++;
	displayQuestion();
};

// Move to previous question
function prevQuestion() {

	// Remove last chosen and correct answers from their arrays
	chosenAnswers.pop();
	correctAnswers.pop();
	console.log(chosenAnswers);
	console.log(correctAnswers);

	// Reset radio buttons
	for (let i = 0; i < 4; i++) {
		inputs[i].checked = false;
	}

	userScore--;
	questionIndex--;
	displayQuestion();
	console.log(questionIndex);
}

function finalResults(){

	// Check which answer is selected and add it to chosenAnswers array
	for (let i = 0; i < questions[questionIndex].answers.length; i++) {
		if (inputs[i].checked == true) {
			chosenAnswers.push(questions[questionIndex].answers[i].answer)
		}
		// Reset radio buttons post-answer-check
		inputs[i].checked = false;
	};

	// Add correct answer to correctAnswers array
	correctAnswers.push(questions[questionIndex].answers.find(answer => answer.correct == "yes").answer);

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