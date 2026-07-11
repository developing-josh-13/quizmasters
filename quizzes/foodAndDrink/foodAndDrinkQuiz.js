// Array of questions to be answered //
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

// Declared variable to hold results of answers given, to be updated in later function //
const results = [];

// Function to shuffle the array (line 2 to 48) into a random order on each page visit //
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};
shuffle(questions);
console.log(questions);

// Declared variables for index of current question in the array (line 2 to line 48) and its corresponding correct answer, to be updated as questions are cycled through //
let selected = 0;
let correctAnswers = [];

// Function that moves to the next question and adds the current answer to correctAnswers array on line 65 //
function generateQuestion() {
	document.getElementById("question").innerHTML = questions[selected].question;
	correctAnswers.push(questions[selected].answers.find(answer => answer.correct == "yes"));
	console.log(correctAnswers);
	for (let i = 0; i < 4; i++){
		document.getElementById(`ans${i+1}`).innerHTML = questions[selected].answers[i].answer;
	}
	selected++;
}

// Function that moves to the previous question and removes the last answer from correctAnswers array on line 65 //

// generateQuestion();

if (selected < 4) {
	// Generate first question by invoking the function (line 68 to 76) //
	generateQuestion();
	// Move to next question (line 68 to 76) by clicking Next Question button //
	document.getElementById("submit").addEventListener("click", generateQuestion)
// Display results after final question using Complete button //
} else {
	document.getElementById("submit").addEventListener("click", /* Function to display final results will go here */)
}