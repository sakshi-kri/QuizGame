const quizData = [
    {
        question: "What does the acronym 'AWS' stand for in the context of cloud computing?",
        choices: ["Amazon Web Services", "Advanced Web Solutions", "Agile Web Servers", " Application Workflow Services"],
        correct: "Amazon Web Services"
    },
    {
        question: "Which of the following categorized under Saas?",
        choices: ["Google Apps for work or Gsuite","CRM Package","Slack channel","All of the above"],
        correct: "All of the above"
    },
    {
        question: "What is Google Cloud Platform (GCP)?",
        choices: ["A social media platform", "A cloud computing platform and services suite by Google", "A web hosting service", "An e-commerce platform"],
        correct: "A cloud computing platform and services suite by Google"
    },
    {
        question: 'What does the term "serverless" mean in the context of cloud computing?',
        choices: ["The absence of servers in a cloud environment", "Running applications without the need to manage server infrastructure",
         "Using servers without any security measures", "A type of cloud-based gaming server"],
        correct: "Running applications without the need to manage server infrastructure"
    },
    {
        question: "What is AWS EFS?",
        choices: ["Amazon Elastic File System", "Amazon Elastic File Storage", 
        "Amazon Elastic Firestore System", "Amazon Elastic File Service"],
        correct: "Amazon Elastic File System"
    },
    {
        question: "Which cloud deployment model provides dedicated infrastructure for a single organization?",
        choices: ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Community Cloud"],
        correct: "Private Cloud"
    },
    {
        question: "Which of the following is NOT a cloud service model?",
        choices: ["Infrastructure as a Service (IaaS)","Platform as a Service (PaaS)","On-Premise as a Service (OPaaS)","Software as a Service (SaaS)"],
        correct: "On-Premise as a Service (OPaaS)"
    },
    

];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;
let userChoice = null;

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    choicesElement.innerHTML = "";
    currentQuizData.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add('choice'); // Add the 'choice' class to style the choice buttons
        choicesElement.appendChild(choiceButton);
        
        choiceButton.addEventListener('click', () => {
            if (userChoice === null) {
                userChoice = choice;
                choiceButton.classList.add('selected'); // Add the 'selected' class to highlight the selected choice
            }
        });
    });
}

function checkAnswer() {
    if (userChoice === null) {
        return; // Don't proceed if the user hasn't made a choice
    }

    const correctChoice = quizData[currentQuestion].correct;

    if (userChoice === correctChoice) {
        score++;
    }

    // Remove the 'selected' class from all choice buttons
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => button.classList.remove('selected'));

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        userChoice = null; // Reset user choice for the next question
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const totalQuestions = quizData.length;
    questionElement.textContent = `Your Score: ${score} out of ${totalQuestions}`;
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";

    if (score === totalQuestions) {
        // If the user's score is equal to the total number of questions, show a congratulatory message
        const congratulatoryMessage = document.createElement("p");
        congratulatoryMessage.textContent = "Congratulations! You got all the questions right!";
        questionElement.appendChild(congratulatoryMessage);
    }
}

loadQuestion();

submitButton.addEventListener("click", checkAnswer);