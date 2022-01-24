// Challenge 1: Your Age in Days

function ageInDays() {
    var year = prompt('What year were you born?');
    var days = (2021 - year) * 365;
    var h1 = document.createElement('h1');
    var answer = document.createTextNode('You are ' + days + ' days old.');
    h1.setAttribute('id', 'days');
    h1.appendChild(answer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset () {
    document.getElementById('days').remove();
}

// Challenge 2: Cat Generator

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors
// Rock beats Scissors
// Paper beats Rock
// Scissors beats Paper

function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    console.log('Computer choice: ', botChoice);
    result = decideWinner(humanChoice, botChoice);   // [0, 1] human lost : bot won 
    console.log(result);
    message = finalMessage(result);  // {'message': 'You won', 'color': 'green'}
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function decideWinner(human, bot) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    };

    var humanScore = rpsDatabase[human][bot];
    var botScore = rpsDatabase[bot][human];

    return [humanScore, botScore];
}

function finalMessage([yourScore, botChoice]) {
    if (yourScore == 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore == 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(yourChoice, botChoice, message) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    //  lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[yourChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + message['color']  + "; font-size: 60px; padding: 30px; '>" + message['message'] + "</h1>"
    botDiv.innerHTML = "<img src=" + imagesDatabase[botChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons!
var all_buttons = document.getElementsByTagName('button');
//console.log(all_buttons);

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if(buttonThingy.value == "red") {
        buttonsRed();
    }
    else if (buttonThingy.value == "green") {
        buttonsGreen();
    }
    else if (buttonThingy.value == "reset") {
        buttonsColorReset();
    }
    else if (buttonThingy.value == "random") {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}

function buttonsColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const HIT_SOUND = new Audio('static/sounds/swish.m4a');
const WIN_SOUND = new Audio('static/sounds/cash.mp3');
const LOSS_SOUND = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HIT_SOUND.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] == true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i= 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i= 0; i < yourImages.length; i++) {
            dealerImages[i].remove();
        }

        HIT_SOUND.play();

        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if (card == 'A') {
        // If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + 11 <= 21) {
            activePlayer['score'] += 11;
        } else {
            activePlayer['score'] += 1;
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// compute winner and return who just won
// update the wins, draws, and losses
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealers busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        // condition when user busts but dealer doesn't
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        // condition when user and the dealer bust
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner == YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            WIN_SOUND.play();
        } else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            LOSS_SOUND.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageCollor;
    }
}

// Challenge 6: AJAX & API's with Javascript
// const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users
// fetch(url)
//     .then(resp => resp.json())
//     .then(data => {
//         let authors = data.results;
//         console.log(authors);
//         for (let i = 0; i < authors.length; i++) {
//             let div = document.createElement('div');
//             let image = document.createElement('img');
//             let p = document.createElement('p');
//             p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
//             image.src = authors[i].picture.large;
//             div.appendChild(image);
//             div.appendChild(p);
//             document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
//         }
//     });

// let title = str => str[0].toUpperCase() + str.slice(1);