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

// Display current question on screen
function displayQuestion(){
	// Fill in h1 tag with current question
	document.getElementById("question").innerHTML = questions[questionIndex].question;
	
	// Fill in label tags with answers to current question
	for (let i = 0; i < 4; i++) {
	document.getElementById(`ans${i + 1}`).innerHTML = questions[questionIndex].answers[i].answer;
	}

	if (questionIndex === 4) {
		// Nullify Next Question button
		document.getElementById("next").removeEventListener("click", nextQuestion);
		// Change Next Question button to say Submit
		document.getElementById("next").innerHTML = "Submit &#9989;";
		// Display final results screen by clicking Submit button
		document.getElementById("next").addEventListener("click", finalResults)
	} else {
		// Move to next question by clicking Next Question button
		document.getElementById("next").addEventListener("click", nextQuestion);
	}
}

// Move to next question
function nextQuestion() {

	// Create variable containing all possible answers
	let inputs = document.getElementsByTagName('input');
	console.log(inputs);

	// Check which answer is selected and add it to chosenAnswers array
	for (let i = 0; i < 4; i++) {
		if (inputs[i].checked == true) {
			chosenAnswers.push(questions[questionIndex].answers[i].answer)
		}
		inputs[i].checked = false;
	};
	console.log(chosenAnswers);

	// Add correct answer to correctAnswers array
	correctAnswers.push(questions[questionIndex].answers.find(answer => answer.correct == "yes").answer);
	console.log(correctAnswers);

	questionIndex++;
	displayQuestion();
	console.log(questionIndex);
};

// Move to previous question
function prevQuestion() {
	// Reduce index by 1 to fulfill the rest of this function
	questionIndex--;
	console.log(questionIndex);

	// Display current question on the page
	document.getElementById("question").innerHTML = questions[questionIndex].question;

	// Display answers of current question on the page
	let inputs = document.getElementsByTagName('input');
	for (let i = 0; i < 4; i++) {
		inputs[i].checked = false;
		document.getElementById(`ans${i + 1}`).innerHTML = questions[questionIndex].answers[i].answer;
	};

	// Remove last correct answer from array
	correctAnswers.pop();

	if (questionIndex == 0) {
		document.getElementById('previous').hidden = true;
	} else {
		document.getElementById('previous').hidden = false;
		document.getElementById('previous').addEventListener("click", prevQuestion);
	}
}

function finalResults(){
	console.log("You scored: 5/5!")
}

// Initialise quiz with first question
displayQuestion();