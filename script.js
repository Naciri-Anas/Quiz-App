const questions = [
    {
        question: "select the best player in the world?",
        answers:[
            {
                text:"Hakimi",correct:true
            },
            {
                text:"Messi", correct:false
            },
            {
                text:"ronaldo l9r3",correct:false
            },
            {
                text:"hmido dib",correct:false
            }
        ]
    },
    {
        question:"what's the popular programming langage?",
        answers:[
            {text:"java",correct:false},
            {text:"javascript",correct:true},
            {text:"python",correct:false},
            {text:"c++",correct:false}
        ]
    },

    {
        question:"the first computer program is created by ?",
        answers:[
            {
                text:"Ada Lovelace",correct:true
            },
            {
                text:"Anas Naciri", correct:false
            },
            {
                text:"Bill gates",correct:false
            },
            {
                text:"Bjarne Stroustrup",correct:false
            }
           
        ]

    },
];
const questionElement  = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}
function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",()=>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
}else{
    startQuiz();
}
});
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} our of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
    showQuestion();
   }else{
    showScore();
   }
}
startQuiz();
