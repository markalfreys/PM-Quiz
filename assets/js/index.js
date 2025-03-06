const qaData = {
    male: [
        {
            q: 'Do you think hours of cardio is beneficial for fat loss?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: 'Yes',
                    value: 'Yes'
                },{
                    text: 'No',
                    value: 'No'
                },{
                    text: 'Not Sure',
                    value: 'Not Sure'
                }
            ]
        },{
            q: 'What time of day is best to work out?',
            subq: '(Many people think doing cardio every day is the answer.)', 
            a: [
                {
                    text: 'Morning',
                    value: 'Morning'
                },{
                    text: 'Afternoon',
                    value: 'Afternoon'
                },{
                    text: 'Evening',
                    value: 'Evening'
                }
            ]
        },{
            q: 'If there was a 7-minute routine to get you fit, would you want to add it to your daily routine?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: 'Definitely',
                    value: 'Definitely'
                },{
                    text: 'Maybe',
                    value: 'Maybe'
                },{
                    text: 'Not Sure',
                    value: 'Not Sure'
                }
            ]
        },{
            q: 'Did you do strength training, cardio or both?',
            subq: '(Many people think doing cardio every day is the answer.)', 
            a: [
                {
                    text: 'Cardio Only',
                    value: 'Cardio Only'
                },{
                    text: 'Both',
                    value: 'Both'
                },{
                    text: 'Never tried',
                    value: 'Never tried'
                }
            ]
        },{
            q: 'How would you rate this website?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: '10/10',
                    value: '10/10'
                },{
                    text: '9/10',
                    value: '9/10'
                },{
                    text: '8/10',
                    value: '8/10'
                }
            ]
        }
    ],
    female: [
        {
            q: 'What time of day is best to work out?',
            subq: '(Many people think doing cardio every day is the answer.)', 
            a: [
                {
                    text: 'Morning',
                    value: 'Morning'
                },{
                    text: 'Afternoon',
                    value: 'Afternoon'
                },{
                    text: 'Evening',
                    value: 'Evening'
                }
            ]
        },{
            q: 'Do you think hours of cardio is beneficial for fat loss?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: 'Yes',
                    value: 'Yes'
                },{
                    text: 'No',
                    value: 'No'
                },{
                    text: 'Not Sure',
                    value: 'Not Sure'
                }
            ]
        },{
            q: 'How would you rate this website?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: '10/10',
                    value: '10/10'
                },{
                    text: '9/10',
                    value: '9/10'
                },{
                    text: '8/10',
                    value: '8/10'
                }
            ]
        },{
            q: 'Did you do strength training, cardio or both?',
            subq: '(Many people think doing cardio every day is the answer.)', 
            a: [
                {
                    text: 'Cardio Only',
                    value: 'Cardio Only'
                },{
                    text: 'Both',
                    value: 'Both'
                },{
                    text: 'Never tried',
                    value: 'Never tried'
                }
            ]
        },{
            q: 'If there was a 7-minute routine to get you fit, would you want to add it to your daily routine?',
            subq: '(Certain exercise routines can help ignite your metabolism for faster fat burn).', 
            a: [
                {
                    text: 'Definitely',
                    value: 'Definitely'
                },{
                    text: 'Maybe',
                    value: 'Maybe'
                },{
                    text: 'Not Sure',
                    value: 'Not Sure'
                }
            ]
        }
    ]
}

const femalegender = document.getElementById('femalegender')
const malegender = document.getElementById('malegender')
const qacont = document.getElementById('qa-cont')
const qa = document.getElementById('qa')
qa.remove()

var quizPrimeQuestion, quizSubQuestion, quizAnswer, quizProgress, quizNumber, qprev, qnext, qsubmit, progressText, progressCircle;

femalegender.addEventListener('change', (e) => toggleG(e))
malegender.addEventListener('change', (e) => toggleG(e))


var selectedG = null;
let currentQuestionIndex = 0;

var answers = []

// toggle the value of currently selected gender
function toggleG(e) {

    displayQA()
    
    let selectedGTemp = selectedG;
    if(e.target.value === 'female'){
        selectedG = 'female'
    }else{
        selectedG = 'male'   
    }
    
    if(e.target.value !== selectedGTemp) {
        currentQuestionIndex = 0
        answers = []
        progressText.innerHTML = '0<span>%</span>';
        progressCircle.style.strokeDasharray = `${2 * Math.PI * 100}`;

        loadQuestion(currentQuestionIndex) 
    }

}

// display the cards, result and the watch section if user selecte what gender.
function displayQA() {
    if(!selectedG){
        qacont.appendChild(qa);
        qa.style.display = 'block';
        quizPrimeQuestion= document.getElementById('quiz-question-main')
        quizSubQuestion = document.getElementById('quiz-question-sub')
        quizAnswer = document.querySelector('.quiz-answer')
        quizProgress = document.querySelector('.quiz-progress div')
        quizNumber = document.querySelector('.quiz-q-num')
        qprev = document.querySelector(".quiz-btn-ctrl.prev").addEventListener("click", () => handleNextPrevQ(-1));
        qnext = document.querySelector(".quiz-btn-ctrl.next").addEventListener("click", () => handleNextPrevQ(1));
        qsubmit = document.querySelector('.quiz-submit-btn')
        progressText = document.querySelector('.progress-text p');
        progressCircle = document.querySelector(".circular-progress .fg");
    } 
}


let qaDataTemp;

// function that will replace the content of the card,
// this will change the question, sub question, answers and progress bar...
function loadQuestion(n = 0) {
    
    qaDataTemp = (selectedG === 'female') ? qaData.female : qaData.male
    
    quizProgress.style.width = (n+1)*(100/qaDataTemp.length)+'%'
    
    selectedQAData = qaDataTemp[n]

    quizPrimeQuestion.innerHTML = selectedQAData.q
    quizSubQuestion.innerHTML = selectedQAData.subq
    
    quizAnswer.innerHTML = "";
    selectedQAData.a.forEach(answer => {
        quizAnswer.appendChild(generateInputEl(answer, n));
    })
    
    quizNumber.innerHTML = (n+1)+'/'+qaDataTemp.length

    // add change listener to answer, and update the variable that holds the answers
    document.querySelectorAll('.answer').forEach(input => {
        input.addEventListener('change', (e) => {
            answers[currentQuestionIndex] = e.target.value;
            if(currentQuestionIndex+1 === qaDataTemp.length){
                updateButtonState()
            }
        });
    });

    updateButtonState()
}

function generateInputEl(answer, n) {
    let label = document.createElement("label");
    label.className = "quiz-button";

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.className = "answer";
    input.value = answer.value;
    if (answers[n] === answer.value) {
        input.setAttribute("checked", "checked");
    }

    let span = document.createElement("span");
    span.className = "quiz-btn-text";
    span.textContent = answer.text;

    label.appendChild(input);
    label.appendChild(span);

    return label;
}

// Function the handles the Next and Prev question button
function handleNextPrevQ(direction) {
    if (!qaDataTemp) return;

    let newIndex = currentQuestionIndex + direction;
    
    // if (direction === 1 && answers[currentQuestionIndex] === undefined) {
    //     alert("Please answer this question before proceeding.");
    //     return;
    // }

    if (newIndex >= 0 && newIndex < qaDataTemp.length) {
        currentQuestionIndex = newIndex;
        loadQuestion(currentQuestionIndex);
    }
}

// Function that replace the next button if it is the last question 
// and show the submit button 
function updateButtonState() {
    const nextBtn = document.querySelector(".quiz-btn-ctrl.next");
    const prevBtn = document.querySelector(".quiz-btn-ctrl.prev");
    const submitBtn = document.querySelector(".quiz-submit-btn");


    // If it's the first question, disable and reduce opacity of Prev button
    if (currentQuestionIndex === 0) {
        prevBtn.style.opacity = "0.5"; 
        prevBtn.style.pointerEvents = "none"; 
    } else {
        prevBtn.style.opacity = "1"; 
        prevBtn.style.pointerEvents = "auto"; 
    }


    // if last question, remove the Next and replace submit
    if (currentQuestionIndex === qaDataTemp.length - 1) {
        nextBtn.style.display = "none"; // Hide Next button
        submitBtn.style.display = "block"; // Show Submit button

        if (allQuestionsAnswered()) {
            submitBtn.onclick = () => scrollToResultSection(animateProgressText);; // Attach event if all questions are answered
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        } else {
            submitBtn.onclick = null;
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.6";
        }
    } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
    }
}

// check if all question is answered
function allQuestionsAnswered() {
    return answers.filter(a => a !== undefined).length === qaDataTemp.length;
}

// change the number inside the result circle
function animateProgressText() {

    let startTime = Date.now();
    let duration = 3000; 
    let finalValue = Math.floor(Math.random() * (100 - 85) + 85); 
    

    let circumference = 2 * Math.PI * 90; 


    function updateProgress() {
        let elapsedTime = Date.now() - startTime;

        let progress = Math.min(elapsedTime / duration, 1);
        let currentValue = Math.floor(progress * finalValue);
        let dashValue = (currentValue / 100) * circumference;

        progressText.innerHTML = `${currentValue}<span>%</span>`;

        progressCircle.style.strokeDasharray = `${dashValue} ${circumference}`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            progressText.innerHTML = `${finalValue}<span>%</span>`; 
        }
    }

    updateProgress();
}

// Call this function when the user finishes answering all questions
function onQuizComplete() {
    animateProgressText();
}

// If user submit the button, the screen will scroll to result section
function scrollToResultSection(callback) {
    const resultSection = document.querySelector(".result .text-section");
    if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(callback, 500); 
    } else {
        callback(); 
    }
}
