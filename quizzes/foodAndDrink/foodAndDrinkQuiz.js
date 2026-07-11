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

// Shuffles the questions //
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};
shuffle(questions);

// Placeholders that will get updated as the quiz progresses //
let results = [];
let questionIndex = 0;
let correctAnswers = [];

// Move to next question //
function nextQuestion() {

	// Display current question //
	document.getElementById("question").innerHTML = questions[questionIndex].question;
	
	// Display answers of current question //
	let inputs = document.getElementsByTagName('input');
	for (let i = 0; i < 4; i++) {
		inputs[i].checked = false;
		document.getElementById(`ans${i + 1}`).innerHTML = questions[questionIndex].answers[i].answer;
	};

	// Store correct answer of current question //
	correctAnswers.push(questions[questionIndex].answers.find(answer => answer.correct == "yes"));

	//  //
	questionIndex++;
};

nextQuestion();

// Function that moves to the previous question and removes the last answer from correctAnswers array on line 64 //
// function prevQuestion() {

// }

if (questionIndex != 4) {
	// Move to next question (line 68 to 76) by clicking Next Question button //
	document.getElementById("submit").addEventListener("click", nextQuestion)
} else {
	document.getElementById("submit").innerHTML = "Submit &#9989;";
	document.getElementById("submit").addEventListener("click", /* Function to display final results will go here */)
}