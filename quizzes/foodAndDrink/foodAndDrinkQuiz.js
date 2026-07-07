

const questions = [
	{ // Q1
		question: 'What is the official corporate logo for Guinness?',
		answers: [
			{answer: 'Banjo', correct: 'no'},
			{answer: 'Triangle', correct: 'no'},
			{answer: 'Harp', correct: 'yes'},
			{answer: 'Cello', correct: 'no'}
		]
	},
	{ // Q2
		question: 'In which country are the self-proclaimed \'master chocolatiers\' Lindt based?',
		answers: [
			{answer: 'Switzerland', correct: 'yes'},
			{answer: 'Belgium', correct: 'no'},
			{answer: 'France', correct: 'no'},
			{answer: 'Sweden', correct: 'no'}
		]
	},
	{ // Q3
		question: 'Which fast-food establishment\'s long-held slogan is "Eat Fresh"?',
		answers: [
			{answer: 'Popeye\'s', correct: 'no'},
			{answer: 'KFC', correct: 'no'},
			{answer: 'Taco Bell', correct: 'no'},
			{answer: 'Subway', correct: 'yes'}
		]
	},
	{ // Q4
		question: 'Which country produces the most coffee in the world?',
		answers: [
			{answer: 'Mexico', correct: 'no'},
			{answer: 'Brazil', correct: 'yes'},
			{answer: 'Argentina', correct: 'no'},
			{answer: 'Colombia', correct: 'no'}
		]
	},
	{ // Q5
		question: 'Which is the oldest soft drink to be served in America?',
		answers: [
			{answer: 'Coca Cola', correct: 'no'},
			{answer: 'Fanta', correct: 'no'},
			{answer: 'Dr Pepper', correct: 'yes'},
			{answer: 'Sprite', correct: 'no'}
		]
	}
]

const randomNum = Math.floor((Math.random() * 5)) + 1;
console.log(randomNum);

document.getElementById("question").innerHTML = questions[randomNum - 1].question;

const testElement = document.getElementById(`q${randomNum}`);
console.log(testElement);

// const testText = questions[randomNum].question;
// console.log(testText);


const correctAnswers = [];

questions.forEach(questionObj => {
	const correctAnswer = questionObj.answers.find(answer => answer.correct == "yes");
	correctAnswers.push(correctAnswer);
});

// console.log(correctAnswers);

// const ans1 = document.getElementById("ans1");
// const ans2 = document.getElementById("ans2");
// const ans3 = document.getElementById("ans3");
// const ans4 = document.getElementById("ans4");