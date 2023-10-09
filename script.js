const key = document.querySelectorAll(".key");
const deleteKey = document.querySelector(".deleteKey");
const enterKey = document.querySelector(".enterKey");

const firstWord = document.querySelectorAll(".firstWord div");
const secondWord = document.querySelectorAll(".secondWord div");
const thirdWord = document.querySelectorAll(".thirdWord div");
const fourthWord = document.querySelectorAll(".fourthWord div");
const fifthWord = document.querySelectorAll(".fifthWord div");

const alertDiv = document.querySelector(".alertDiv")
const resetGameButton = document.querySelector(".resetGameButton")

const wordRowList = [firstWord ,secondWord ,thirdWord ,fourthWord , fifthWord];

let currentLetter;
let currentLetterIndex = 0;
let currentWordRow = 0;

let wordToCheck = "";
let word = "TUNAY";


// let options = {
//     method: 'GET',
//     headers: { 'x-api-key': 'Mf2ty5UHkIb+6hN8kzYcQw==pGQqf1hZdY28ZtXG' }
//   }
  
//   let url = 'https://api.api-ninjas.com/v1/randomword'
  
  
//   fetch(url,options)
//         .then(res => res.json()) //
//         .then(data => {
//           word = data.word
//           console.log(word)
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         }); 
       


key.forEach((key)=>{
    key.addEventListener("click", ()=>{
        currentLetter = key.textContent;
        wordRowList[currentWordRow][currentLetterIndex].textContent = currentLetter;
        currentLetterIndex < 5 ? currentLetterIndex ++ : currentLetterIndex = 4;
    })
})
 
function deleteLetter(){
    currentLetterIndex > 0 ? currentLetterIndex-- : currentLetterIndex = 0;
    wordRowList[currentWordRow][currentLetterIndex].textContent = "";
}

function checkWordLength(){
    for(let i=0; i<wordRowList[currentWordRow].length; i++){
        wordToCheck += wordRowList[currentWordRow][i].textContent;
    }
    if(wordToCheck.length < wordRowList[currentWordRow].length){
        console.log("5 harf yazacan");
        wordToCheck = "";
    }

    else{

        if(word == wordToCheck){
            checkLetterProperties();
            winGame();
            console.log("kazandın");
        }
        else{
            checkLetterProperties()
        }
        currentWordRow < wordRowList.length ? currentWordRow++ :  gameOver();

        currentLetterIndex = 0
    };
    wordToCheck = ""
}

function wrongLetterProperty(){
    for(let i=0; i<wordToCheck.length; i++){
        const charToCheck = wordToCheck[i]
        if(word.indexOf(charToCheck) === -1){
            document.querySelector(`.key${wordToCheck[i]}`).classList.add("wrongLetter");
            // document.querySelector(`key${wordToCheck[i]}`).removeEventListener()
            wordRowList[currentWordRow][i].classList.add("wrongBox");
        }
    }
}

function rightLetterProperty(){
    for(let i=0; i<wordToCheck.length; i++){
        if(word[i] == wordToCheck[i]){
            document.querySelector(`.key${wordToCheck[i]}`).classList.add("rightLetter");
            wordRowList[currentWordRow][i].classList.add("rightBox");
        }
    }
}

function wrongPlaceProperty(){
    for(let i=0; i<wordToCheck.length; i++){
        if(word.includes(wordToCheck[i]) && word[i] != wordToCheck[i]){
            document.querySelector(`.key${wordToCheck[i]}`).classList.add("wrongPlace");
            wordRowList[currentWordRow][i].classList.add("wrongPlaceBox");
        }
    }
}

function checkLetterProperties(){
    wrongLetterProperty();
    wrongPlaceProperty();
    rightLetterProperty()
}

function gameOver(){
    console.log("game over");
}

function winGame(){
    alertDiv.style.animation = "winAnimation 5s";
    resetGameButton.style.display = "block";
}

function resetGame(){
    for(let i=0; i<wordRowList.length; i++){
        for(let j=0; j<firstWord.length; j++){
            wordRowList[i][j].textContent = "";
            wordRowList[i][j].classList.remove("rightBox");
            wordRowList[i][j].classList.remove("wrongPlaceBox");
            wordRowList[i][j].classList.remove("wrongBox");
        }
    }

    for(let k=0; k<key.length; k++){
        key[k].classList.remove("rightLetter");
        key[k].classList.remove("wrongLetter");
        key[k].classList.remove("wrongPlace");
    }

    currentLetter = 0;
    currentWordRow = 0;

    resetGameButton.style.display = "none";
}

resetGameButton.addEventListener("click", resetGame)
deleteKey.addEventListener("click", deleteLetter)
enterKey.addEventListener("click",checkWordLength)
