// All questions for Food and Drink quiz and their corresponding answers //
const questions = [
	{
		question: 'What is the official corporate logo for Guinness?',
		answers: [
			{choice: 'Banjo', correct: 'no'},
			{choice: 'Triangle', correct: 'no'},
			{choice: 'Harp', correct: 'yes'},
			{choice: 'Cello', correct: 'no'}
		]
	},
	{
		question: 'In which country are the self-proclaimed \'master chocolatiers\' Lindt based?',
		answers: [
			{choice: 'Switzerland', correct: 'yes'},
			{choice: 'Belgium', correct: 'no'},
			{choice: 'France', correct: 'no'},
			{choice: 'Sweden', correct: 'no'}
		]
	},
	{
		question: 'Which fast-food establishment\'s long-held slogan is "Eat Fresh"?',
		answers: [
			{choice: 'Popeye\'s', correct: 'no'},
			{choice: 'KFC', correct: 'no'},
			{choice: 'Taco Bell', correct: 'no'},
			{choice: 'Subway', correct: 'yes'}
		]
	},
	{
		question: 'Which country produces the most coffee in the world?',
		answers: [
			{choice: 'Mexico', correct: 'no'},
			{choice: 'Brazil', correct: 'yes'},
			{choice: 'Argentina', correct: 'no'},
			{choice: 'Colombia', correct: 'no'}
		]
	},
	{
		question: 'Which is the oldest soft drink to be served in America?',
		answers: [
			{choice: 'Coca Cola', correct: 'no'},
			{choice: 'Fanta', correct: 'no'},
			{choice: 'Dr Pepper', correct: 'yes'},
			{choice: 'Sprite', correct: 'no'}
		]
	}
]

// Shuffles the questions
function shuffle(array) {
	for (let original = array.length - 1; original > 0; original--) {
		const replace = Math.floor(Math.random() * (original + 1));
		[array[original], array[replace]] = [array[replace], array[original]];
	}
};
shuffle(questions);

// Placeholders to be updated
let questionIndex = 0;
let currentQuestion = questions[questionIndex];
let userScore = 0;
let correctAnswers = []
let submittedAnswers = []

const radioButtons = document.getElementsByTagName('input')
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

function showNextButton() {
	// Change button's visibility to displayed
	nextButton.hidden = false;
};

// Display current question on screen
function displayQuestion(){
	next.hidden = true;
	currentQuestion = questions[questionIndex];
	// Display current question in h1 tag
	document.getElementById("question").innerHTML = currentQuestion.question;
	console.log('You are at question index: ' + questionIndex);
	console.log('Your score is: ' + userScore)
	
	for (let index = 0; index < currentQuestion.answers.length; index++) {
		// Reset radio buttons from any previous input
		radioButtons[index].checked = false;
		// Display answers to current question in label tags
		document.getElementById(`ans${index + 1}`).innerHTML = currentQuestion.answers[index].choice;
		// Make clicking any radio button display the Next button
		radioButtons[index].addEventListener("click", showNextButton);
	}

	// Make clicking Next or Prev button call respective functions
	prevButton.addEventListener("click", goToPrev);
	nextButton.addEventListener("click", goToNext);

	// Hide prev button if we are on the very first question
	if (questionIndex == 0){
		prev.hidden = true;
	} else {
		prev.hidden = false;
	}
	
	// Have a submit button for final question
	if (questionIndex == 4){
		next.innerHTML = 'Submit &#9989;';
	}
}


// Move to next question
function goToNext() {
	console.log('Going to next question');

	// Loop through radio buttons
	for (let buttonIndex = 0; buttonIndex < radioButtons.length; buttonIndex++) {
		// Find radio index that is checked
		if (radioButtons[buttonIndex].checked == true) {
			// Extract answer from checked radio button
			const nearestLabel = radioButtons[buttonIndex].nextSibling;
			submittedAnswers.push(nearestLabel.nextSibling.innerHTML);
			console.log('You chose: ' + submittedAnswers[questionIndex]);
		}
		
		// Check if an answer in the array is correct
		if (currentQuestion.answers[buttonIndex].correct == 'yes'){
			// Add that answer to correctAnswers array
			correctAnswers.push(currentQuestion.answers[buttonIndex].choice)
		}
	}
	console.log('The correct answer is: ' + correctAnswers[questionIndex]);
	// If correct and chosen answers on current question match, increment score
	if (correctAnswers[questionIndex] == submittedAnswers[questionIndex]) {
		userScore++;
	}


	questionIndex++;
	if (questionIndex == 5){
		showResults();
	} else {
		displayQuestion();
	}
};

// Move to previous question
function goToPrev() {
	console.log('Going to previous question');
	// Decrease question index by 1
	questionIndex--;
	// If final index of answer arrays both match
	if (correctAnswers[questionIndex] == submittedAnswers[questionIndex]) {
		// Decrease user score by 1
		userScore--;
	}
	
	// Remove last index from both answer arrays
	correctAnswers.pop();
	submittedAnswers.pop();
	
	// Changing Submit button back to Next button in case going back from final question 
	if (questionIndex < 4) {
		next.removeEventListener("click", showResults);
		next.addEventListener("click", goToNext);
	}
	// FINAL: Call display question function
	displayQuestion();
	
	
}

// Move to post-quiz results screen
function showResults(){

	document.getElementById("quiz").style.display = "none";
	document.getElementById("results").style.display = "flex";
	document.getElementById("yourscore").innerHTML = `${userScore}`;
}

// Initialise quiz with first question
displayQuestion();