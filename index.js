const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['dance','frontend','javascript','developer'];
let selectWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord(){
    wordEl.innerHTML = `
     ${selectWord
        .split('')
        .map(letter =>`
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>    
            `
        )
        .join('')
    }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');
    //console.log(wordEl.innerText,innerWord);
    
    if(innerWord === selectWord){
        finalMessage.innerText = '정답입니다 :)';
        popup.style.display = 'flex';
    }
}

// update the wrong letters
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        console.log(part, index);
        if(index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = '꽝 다음기회에 ㅠㅠ';
        setTimeout(()=>{
            popup.style.display = 'flex';
        },500);
    }
}

// show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}


// keydown letter press
window.addEventListener('keydown', e => {
if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }
}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Make empthy arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();

/*
fetch('http://puzzle.mead.io/puzzle', {}).then((response) => {
  if (response.status === 200) {
    return response.json() //.json() method takes the response body and parse it as JSON
  } else {
    throw new Error('Unable to fetch puzzle') //if we manually throw error, catch() is fired
  }
}).then((data) => { //.then() is going to access to the data, and then we can do something with parced JSON, for example console.log()
  console.log(data.puzzle)
}).catch((error) => {
  console.log(error)
})*/