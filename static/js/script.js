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
    copyAllButtons.push(all_buttons[i]);
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
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}