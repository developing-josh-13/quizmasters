const questions = [
	{ // Q1
		question: 'Which song has the most streams on Spotify with over 5 billion?',
		answers: [
			{answer: 'Shape of You by Ed Sheeran', correct: 'no'},
			{answer: 'As It Was by Harry Styles', correct: 'no'},
			{answer: 'Someone You Loved by Lewis Capaldi', correct: 'no'},
			{answer: 'Blinding Lights by The Weeknd', correct: 'yes'}
		]
	},
	{ // Q2
		question: 'Which artist holds the most number-one singles on the official UK chart?',
		answers: [
			{answer: 'Madonna', correct: 'no'},
			{answer: 'Whitney Houston', correct: 'no'},
			{answer: 'Elvis Presley', correct: 'yes'},
			{answer: 'The Beatles', correct: 'no'}
		]
	},
	{ // Q3
		question: 'Which member of the band Queen was born first?',
		answers: [
			{answer: 'Freddie Mercury', correct: 'yes'},
			{answer: 'Brian May', correct: 'no'},
			{answer: 'Roger Taylor', correct: 'no'},
			{answer: 'John Deacon', correct: 'no'}
		]
	},
	{ // Q4
		question: 'Which artist headlined at the most recent Super Bowl half-time show in 2026?',
		answers: [
			{answer: 'Bad Bunny', correct: 'yes'},
			{answer: 'Taylor Swift', correct: 'no'},
			{answer: 'Sabrina Carpenter', correct: 'no'},
			{answer: 'Kendrick Lamar', correct: 'no'}
		]
	},
	{ // Q5
		question: 'Which female R&B and pop artist has a hit associated with Christmas time every year?',
		answers: [
			{answer: 'Alicia Keys', correct: 'no'},
			{answer: 'Mariah Carey', correct: 'yes'},
			{answer: 'Mary J. Blige', correct: 'no'},
			{answer: 'Aaliyah', correct: 'no'}
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

	document.getElementById("quiz").hidden = true;
	document.getElementById("results").hidden = false;
	document.getElementById("yourscore").innerHTML = `${userScore}`;
}
// Initialise quiz with first question
displayQuestion();