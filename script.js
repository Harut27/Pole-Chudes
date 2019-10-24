
let attempt = 0;
let intervalId;
let questionLevel;
let seconds = 60;

let questions = {
    easyQuestions: [
        {
            question: 'Ova exe amenaeritasard Ashxarhakal@',
            answer: 'Alexandr',
        },
        {
            question: 'Vortexa texi unece Avarayri chakatamart@?  Vor Geti apin',
            answer: 'Txmut',
        },
        {
            question: 'It Parck i naxkin anun@',
            answer: 'algoritm',
        },
        {
            question: 'hayastani araji naxagah@',
            answer: 'Levon',
        },
        {
            question: 'hacheli qaxaq erevanic voch heru',
            answer: 'Hoktemberyan',
        },
        {
            question: 'Sasunci Davti Dzin',
            answer: 'Qurkikjalali',
        },
        {
            question: 'Siro astvacuhin',
            answer: 'Astxik',
        },
        {
            question: 'Chermak anurjner@ filmi haytni axavnu anun@',
            answer: 'Adrine',
        }
    ],
    hardQuestions:[
        {
            question: 'Iraqi  mayraqaxaq@',
            answer: 'Baxdad',
        },
        {
            question: 'Amenabardzr sar@ ',
            answer: 'Jomolungma',
        },
        {
            question: 'Siro mayraqaxaq@',
            answer: 'France',
        },
        {
            question: 'Ov e Samvel vepi hexinak@',
            answer: 'Raffi',
        },
        {
            question: 'amenaeritasard fransiakan PSG timi hardzakvox',
            answer: 'Mbappe',
        },
        {
            question: 'Amenaerkar get@',
            answer: 'Nexos',
        },
        {
            question: 'Amenaxor@ Lich@',
            answer: 'baykal',
        },
    ]
};



function getRandomQuestion() {
    let questionsObj = questions[questionLevel];
    let randomNumber = Math.floor(Math.random() * questionsObj.length);
    let randomQuestion = questionsObj[randomNumber];
    return randomQuestion;
}

function getQuestionPlace() {
    let questionElementFromDOM = document.getElementById('question');
    return questionElementFromDOM;
}

function getAnswerPlace() {
    let answerElemntFromDOM = document.getElementById('answer');
    return answerElemntFromDOM;
}

function getKeyboardLettersPlace(){
    let keyboardElementFromDOM = document.getElementById('keyboard');
    return keyboardElementFromDOM;
}

function getRefreshBtn(){
    let refreshBtn = document.getElementById('refresh');
    return refreshBtn;
}

function getAttemptPlace(){
    let attemptElementFromDOM = document.getElementsByClassName('attempt_text')[0];
    return attemptElementFromDOM;
}

function getTimerPlace(){
    let timer = document.getElementById('timer');
    return timer;
}

function setRandomQuestion() {
    let questionElementFromDOM = getQuestionPlace();
    let randomQuestion = getRandomQuestion();
    questionElementFromDOM.innerText = randomQuestion.question;
    setRandomAnswer(randomQuestion.answer)
}


function setRandomAnswer(randomAnswer) {
    let answerElemnetFromDOM = getAnswerPlace();
    createLetterBox(answerElemnetFromDOM, randomAnswer)
}

function start(){
        let startBox = document.createElement('div');
        let startQuestion = document.createElement('p');
        let startBtn = document.createElement('span');
        let startBtnHardGame = document.createElement('span');
        startBox.setAttribute('id','startBox');
        startQuestion.setAttribute('id','startQuestion');
        startBtn.setAttribute('id','startBtn');
        startBtnHardGame.setAttribute('id','startBtnHardGame');
        startBtn.setAttribute('data-hardness', 'easyQuestions');
        startBtnHardGame.setAttribute('data-hardness', 'hardQuestions');
        startQuestion.innerText = 'Can You Start ?'
        startBtn.innerText = 'Ease Game'
        startBtnHardGame.innerText = 'Hard Game'
        document.body.appendChild(startBox);
        startBox.appendChild(startQuestion);
        startBox.appendChild(startBtn);
        startBox.appendChild(startBtnHardGame);
        startBtn.addEventListener('click', startGame);
        startBtnHardGame.addEventListener('click', startGame)
}

function startGame(e){
    questionLevel = e.target.dataset.hardness;
    let startBox = document.getElementById('startBox');
    startBox.remove()
    refreshBtn()
    setKeyboard()
    setRandomQuestion()
    startTimer()
}

function setTimer(){
    let timer = getTimerPlace();
    checkTime()
    
    let _minutes = Math.floor(seconds / 60);
    let _seconds = seconds % 60;

    if(_seconds < 10){
        _seconds = '0' + _seconds 
    }
    if(_minutes < 10){
        _minutes = '0' + _minutes
    }
    timer.innerText = _minutes + ':' +  _seconds
    seconds--;

}

function checkTime(){
    timerColorChange();
    calculateTime()
}

function calculateTime() {

    if(seconds == 0){
        clearInterval(intervalId);
        gameOvere();
    }
}

function timerColorChange(){
    let timer = getTimerPlace();
    if(seconds < 60){
        timer.style.backgroundColor = 'rgb(177, 236, 37)';
    }
    else if(seconds < 40 && seconds > 20){
        timer.style.backgroundColor = '#ffcc00';
    }
    else if(seconds < 20){
        timer.style.backgroundColor = '#ff3300';
    }
}

function startTimer(){
    intervalId = setInterval(setTimer,1000)
}

function setKeyboard() {
    let keyboardElementFromDOM = getKeyboardLettersPlace()
    let keyboardLetterBox;
    let letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    for (let i = 0; i < letters.length; i++) {
        keyboardLetterBox = document.createElement('span');
        keyboardLetterBox.className = 'keyboardBox';
        keyboardLetterBox.innerText = letters[i];
        keyboardLetterBox.addEventListener('click', onKeyClick)
        keyboardElementFromDOM.appendChild(keyboardLetterBox);
    }
}

function createLetterBox(answerElemnetFromDOM, randomAnswer) {
    let letterBox;
    let letterLength = randomAnswer.length;
    for (var i = 0; i < letterLength; i++) {
        letterBox = document.createElement('span');
        letterBox.className = `answer_letter answer_letter_${randomAnswer[i].toLowerCase()}`;
        letterBox.innerText = '-';
        answerElemnetFromDOM.appendChild(letterBox);
    }
}

function onKeyClick(e){
    let letter = e.target
    isAnswerLetterRight(letter);
    e.target.removeEventListener('click', onKeyClick);

    setTimer();
}

function isAnswerLetterRight(letter){

    let list = document.getElementsByClassName(`answer_letter_${letter.innerText}`)
    let allBlock = document.getElementsByClassName(`answer_letter`);    
    let allOpened = true; 

    if(list.length){

        for (let i = 0; i < list.length; i++) {
            list[i].innerText = letter.innerText;
console.log(list.length)

        }
        for (let i = 0; i < allBlock.length; i++) {
            if (allBlock[i].innerText == "-") {
                allOpened = false;
            }
        }
        seconds += 3*(list.length);
        letter.style.backgroundColor = '#00ff00'

        if(allOpened){
            youWin()
        }
    }
    else{
        attempt++
        seconds -= 5;
        falseAnswerAttempt()
        letter.style.backgroundColor = '#ff0000'
    }
}

function youWin(){

    let modal = document.createElement('div');
    let modalText = document.createElement('span');
    document.body.appendChild(modal);
    modal.appendChild(modalText);
    modal.setAttribute('id','modal');
    modalText.className = 'modalText';
    modalText.innerText = 'You Win';
    modalText.addEventListener('click', setRefresh)
}

function falseAnswerAttempt(){
    let attemptElementFromDOM = getAttemptPlace();
    if (attempt === 3){
        gameOvere()
    }else{
        attemptElementFromDOM.innerText = `you have ${ 3 - attempt} attempts`;
    }
}

function refreshBtn(){
    let refreshBtn = getRefreshBtn();
    refreshBtn.addEventListener('click', setRefresh)
}

function setRefresh(){
    window.location.reload()
}

function gameOvere(){

    let container= document.createElement('div');
    let text = document.createElement('span');
    let newGameBtn = document.createElement('span');
    container.setAttribute('id','container');
    text.setAttribute('id','text');
    newGameBtn.setAttribute('id','newGameBtn');
    text.innerText = 'GAME OVERE';
    newGameBtn.innerText = 'New Game';
    document.body.appendChild(container);
    container.appendChild(text);
    container.appendChild(newGameBtn);
    newGameBtn.addEventListener('click',setRefresh);
}


start()
















