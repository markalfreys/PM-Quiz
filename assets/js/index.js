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
const heroSection = document.getElementsByClassName('hero')[0]
const quizSection = document.getElementsByClassName('quiz')[0]
const resultSection = document.getElementsByClassName('result')[0]
const watchSection = document.getElementsByClassName('watch')[0]
const main = document.getElementsByClassName('main')[0]
quizSection.remove()
resultSection.remove()
watchSection.remove()

var quizPrimeQuestion, quizSubQuestion, quizAnswer, quizProgress, quizNumber, qprev, qnext, qsubmit, progressText, progressCircle;

femalegender.addEventListener('click', () => start('female'));
malegender.addEventListener('click', () => start('male'));


function start(g){ 
    showNextSection('120vh')
    toggleG(g)
}

const sections = [heroSection, quizSection, resultSection, watchSection]

var current = 0
function showNextSection(h = '110vh') {
    var currentTemp = current+1

    if(currentTemp >= sections.length) return;

    main.appendChild(sections[currentTemp]);
    sections[current].style.minHeight = h
    sections[current].style.marginTop = '-'+sections[current].style.minHeight
    setTimeout(() => {
        sections[current].remove()
        current = currentTemp
    }, 1000);
}




var selectedG = null;
let currentQuestionIndex = 0;

var answers = []

// toggle the value of currently selected gender
function toggleG(e) {

    displayQA()
    selectedG = e === 'female' ? 'female' : 'male' ;
    
    loadQuestion(currentQuestionIndex) 

}

// display the cards, result and the watch section if user selecte what gender.
function displayQA() {
    if(!selectedG){
        quizPrimeQuestion= document.getElementById('quiz-question-main')
        quizSubQuestion = document.getElementById('quiz-question-sub')
        quizAnswer = document.querySelector('.quiz-answer')
        quizProgress = document.querySelector('.quiz-progress div')
        quizNumber = document.querySelector('.quiz-q-num')
        qprev = document.querySelector(".quiz-btn-ctrl.prev").addEventListener("click", () => handleNextPrevQ(-1));
        qnext = document.querySelector(".quiz-btn-ctrl.next").addEventListener("click", () => handleNextPrevQ(1));
        qsubmit = document.querySelector('.quiz-submit-btn')
        
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
            }else{
                handleNextPrevQ(1)
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
       // nextBtn.style.display = "none"; // Hide Next button
        //submitBtn.style.display = "block"; // Show Submit button

        if (allQuestionsAnswered()) {
            //submitBtn.onclick = () => scrollToResultSection(); // Attach event if all questions are answered
            //submitBtn.disabled = false;
            //submitBtn.style.opacity = "1";
            scrollToResultSection()

        } else {
            submitBtn.onclick = null;
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.6";
        }
    } else {
        nextBtn.style.display = "block";
        //submitBtn.style.display = "none";
    }
}

// check if all question is answered
function allQuestionsAnswered() {
    return answers.filter(a => a !== undefined).length === qaDataTemp.length;
}

// change the number inside the result circle
function animateProgressText() {
    progressText = document.querySelector('.progress-text p');
    progressCircle = document.querySelector(".circleblue");

    let startTime = Date.now();
    let duration = 3000; 
    let finalValue = Math.floor(Math.random() * (100 - 85) + 85); 
    



    function updateProgress() {
        let elapsedTime = Date.now() - startTime;

        let progress = Math.min(elapsedTime / duration, 1);
        let currentValue = Math.floor(progress * finalValue);

        progressText.innerHTML = `${currentValue}<span>%</span>`;
        progressCircle.classList.add('animateRotate')

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            progressText.innerHTML = `${finalValue}<span>%</span>`; 
            setTimeout(() => {
                showNextSection()
            }, 500)

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
    showNextSection()
    animateProgressText()
}
