let gameArray = [];
let row = 20;
let col = 10;
let h = 0;
let width = 10;//arrayda bir setir yuxari qalxmaq 
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
function callFunctionWithDelay(func, times, delay) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            func();
        }, i * delay);
    }
}
function keyDownHandler(e) {
    if (e.keyCode == 38) {
        upPressed = true;
    }
    if (e.keyCode == 40) {
        downPressed = true;
    }
    if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 39) {
        rightPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 38) {
        upPressed = false;
    }
    if (e.keyCode == 40) {
        downPressed = false;
    }
    if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 39) {
        rightPressed = false;
    }
}
function Controls() {
    if (leftPressed && !isLeftFinish()) {
        moveLeft();
    }
    if (rightPressed && !isRightFinish()) {
        moveRight();
    }
    if (upPressed) {
        rotate();
    }
    if (downPressed) {
        let start = parseInt(currentPosition) % 10;
        //    for (let i =start; i <row; i++) {
        //     fall();
        //    }
        callFunctionWithDelay(fall, 10, 10);
    }
}
for (let i = 0; i < row; i++) {
    gameArray[i] = [];
    for (let j = 0; j < col; j++) {
        gameArray[i][j] = 0;
    }
}
let tetromino_L = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
];
let tetromino_O = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];
let tetromino_S = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
];
let tetromino_I = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
];
let tetromino_T = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let currentPosition = 4;
let allTetrominos = [tetromino_I, tetromino_L, tetromino_O, tetromino_S, tetromino_T];
var randomTetromino;
let rotation;
let currentTetromino;
function draw() {
    for (let i = 0; i < row; i++) {
        for (let k = 0; k < col; k++) {
            if (currentTetromino[rotation].some(index => index == i * 10 + k - currentPosition)) {
                if (randomTetromino == 0) {
                    gameArray[i][k] = 91;
                }
                else if (randomTetromino == 1) {
                    gameArray[i][k] = 92;
                }
                else if (randomTetromino == 2) {
                    gameArray[i][k] = 93;
                }
                else if (randomTetromino == 3) {
                    gameArray[i][k] = 94;
                }
                else if (randomTetromino == 4) {
                    gameArray[i][k] = 95;
                }

            }
        }
    }
    startMainGrid();

}
function unDraw(size) {
    for (let i = 0; i < row; i++) {
        for (let k = 0; k < col; k++) {
            if (currentTetromino[rotation].some(index => index - size == i * 10 + k - currentPosition)) {
                gameArray[i][k] = 0;
            }
        }
    }

    startMainGrid();
}
function isFilled(newPosition) {
    let max = Math.max(...currentTetromino[rotation]);
    let rowIndex;
    let colIndex;
    let result = currentTetromino[rotation].some(index => {
        if (!currentTetromino[rotation].some(element => element == index + 10)) {
            rowIndex = parseInt((index + newPosition + 10) / 10);
            colIndex = parseInt((index + newPosition + 10) % 10);
        }
        else {
            rowIndex = parseInt((max + newPosition + 10) / 10);
            colIndex = parseInt((max + newPosition + 10) % 10);
        }
        //console.log(rowIndex)
        if (rowIndex == 20) {
            rowIndex--;
        }
        return gameArray[rowIndex][colIndex] != 0;

    });

    return result;
}
function isBottomFinish() {
    let max = Math.max(...currentTetromino[rotation]);
    let str = max.toString()[0];
    if (parseInt(currentPosition / 10) == 19 - parseInt(str) && max.toString().length != 1) {
        return true;
    }
    else if (max.toString().length == 1 && parseInt(currentPosition / 10) == 19) {
        return true;
    }
    return false;
}
function isRightFinish() {
    let array = [];
    currentTetromino[rotation].forEach(element => {
        array.push(parseInt(element % 10));
    });
    let max = Math.max(...array);
    if (parseInt(currentPosition % 10) == 9 - max) {
        return true;
    }
    return false;
}
function isLeftFinish() {
    let array = [];
    currentTetromino[rotation].forEach(element => {
        array.push(parseInt(element % 10));
    });
    const isAtLeftEdge = currentTetromino[rotation].some(index => (currentPosition + index) % width === 0)
    return isAtLeftEdge;
}
function fall() {
    if (!isBottomFinish() && !isFilled(currentPosition)) {
        currentPosition += width;
        unDraw(10);
        draw();
    }
    else {
        clearInterval(fallInterval);
        start();
    }
}
function moveRight() {
    // unDraw(1);
    let array = [];
    let size = 1;
    currentTetromino[rotation].some(index => array.push(parseInt(index % 10)));
    let max = Math.max(...array);
    if (randomTetromino == 2 || randomTetromino == 1) {
        size = 3;
        //  alert();
    }
    if (currentTetromino[rotation].some(index => {
        if (!currentTetromino[rotation].some(element => element == index + size)) {
            rowIndex = parseInt((index + currentPosition + size) / 10);
            colIndex = parseInt((index + currentPosition + size) % 10);
        }
        else {
            rowIndex = parseInt((max + currentPosition + size) / 10);
            colIndex = parseInt((max + currentPosition + size) % 10);
        }
        //console.log(gameArray[rowIndex][colIndex])
        return gameArray[rowIndex][colIndex] != 0;
    })) {
        //let ok=index+ currentPosition + size;
        console.log("taken " + colIndex + " max " + max);
    }
    else {
        unDraw(0);
        currentPosition++;
        draw();
    }
}
function moveLeft() {
    //unDraw(-1);
    let array = [];
    currentTetromino[rotation].some(index => array.push(parseInt(index % 10)));
    let min = Math.min(...array);
    if (currentTetromino[rotation].some(index => {
        if (!currentTetromino[rotation].some(element => element == index - 1)) {
            rowIndex = parseInt((index + currentPosition - 1) / 10);
            colIndex = parseInt((index + currentPosition - 1) % 10);
        }
        else {
            rowIndex = parseInt((min + currentPosition - 1) / 10);
            colIndex = parseInt((min + currentPosition - 1) % 10);
        }
        //console.log(gameArray[rowIndex][colIndex])
        return gameArray[rowIndex][colIndex] != 0;
    })) {
        console.log("taken");
    }
    else {
        unDraw(0);
        currentPosition--;
        draw();
    }
}
function rotate() {
    unDraw(0);
    if (rotation == 3) {
        console.log("axrincidi")
        rotation = 0;
    }
    if (!isLeftFinish() && !isRightFinish()) {
        rotation++;
    }
    else if (isLeftFinish()) {
        rotation++;
        currentPosition += 2;
    }
    else if (isRightFinish()) {
        rotation++;
        currentPosition -= 2;
    }
    draw();
}
function isfinishGame() {
    let max = Math.max(...currentTetromino[rotation]);
    for (let i = 0; i < parseInt(max / 10); i++) {
        for (let j = 0; j < col; j++) {
            if (gameArray[i][j] != 0) {
                return true;
            }
        }
    }
    return false;
}
let filledRow;
function hasRowFilled() {
    filledRow = -1;
    for (let i = row - 1; i >= 0; i--) {
        for (let k = 0; k < col; k++) {
            if (gameArray[i][k] != 0) {
                filledRow = i;
            }
            else {
                filledRow = -1;
                break;
            }
        }
        if (filledRow != -1) {
            console.log("filled row" + filledRow);
            return true;
        }
    }
    return false;
}
let lines = 0;
let myLine = document.getElementById("line");
let score = -1;
let myScore = document.getElementById("score");
function clearFilledRow() {
    if (hasRowFilled()) {
        let rowIndex = 19;
        let array = [];
        for (let i = 0; i < 20; i++) {
            array[i] = [];
            for (let j = 0; j < 10; j++) {
                array[i][j] = 0;
            }
        }
        for (let i = 19; i > filledRow; i--) {
            for (let k = 0; k < 10; k++) {
                array[rowIndex][k] = gameArray[i][k];
            }
            rowIndex--;
        }
        for (let i = filledRow - 1; i > -1; i--) {
            for (let k = 0; k < col; k++) {
                array[rowIndex][k] = gameArray[i][k];
            }
            rowIndex--;
        }
        gameArray = array;
        filledRow = -1;
        lines += 1;
        myLine.innerHTML = lines;
        score += 10;
        myScore.innerHTML = score;
    }
}
function startMainGrid() {
    var content = "";
    var myGrid = document.getElementById("grid");
    for (let i = 0; i < row; i++) {
        for (let k = 0; k < col; k++) {
            let id = `main_${i}_${k}`;
            if (gameArray[i][k] == 91) {
                content += `<div id="${id}" style="background-color:indianred;"></div>`
            }
            else if (gameArray[i][k] == 92) {
                content += `<div id="${id}" style="background-color:deepskyblue;"></div>`
            }
            else if (gameArray[i][k] == 93) {
                content += `<div id="${id}" style="background-color:springgreen;"></div>`
            }
            else if (gameArray[i][k] == 94) {
                content += `<div id="${id}" style="background-color:orange;"></div>`
            }
            else if (gameArray[i][k] == 95) {
                content += `<div id="${id}" style="background-color:#7469B6";"></div>`
            }

            else {
                content += `<div id="${id}" style="background-color:gray;"></div>`
            }
        }
    }
    myGrid.innerHTML = content;
}
let nextRandom;
function start() {
    const audio = document.getElementById('audioPlayer');
    audio.play();
    if (isfinishGame() == false) {
        randomTetromino = nextRandom;
        console.log(randomTetromino);
        currentTetromino = allTetrominos[randomTetromino];
        nextRandom = getRndInteger(0, 5);
        //console.log("next will be"+nextRandom);
        displayShape();
        gameInfo.style.display = "inline-block";
        score += 1;
        myScore.innerHTML = score;
        myLine.innerHTML = lines;
        clearFilledRow();
        currentPosition = 4;
        rotation = 0;
        //console.log("next shape");
        draw();
        fallInterval = setInterval(fall, 500);
    }
    else {
        console.log("GAME OVER");
        gameOver = true;
        clearInterval(fallInterval);
        Swal.fire({
            title: `GAME OVER \n Your score : ${myScore.innerText}`,
            showCancelButton: true,
            confirmButtonText: "Play again",
        }).then((result) => {
            if (result.isConfirmed) {
                lines = 0;
                score = 0;
                fallInterval = null;
                for (let i = 0; i < row; i++) {
                    gameArray[i] = [];
                    for (let j = 0; j < col; j++) {
                        gameArray[i][j] = 0;
                    }
                }
                start();
            }
        });
        return;
    }
}
const displaySquares = document.querySelectorAll('.mini-grid div');
let gameInfo = document.getElementById('gameInfo');
const displayWidth = 4
const displayIndex = 0

gameInfo.style.display = "none";
const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2] //tTetromino
]

function displayShape() {
    displaySquares.forEach(square => {
        square.style.backgroundColor = ''
    })
    //console.log(nextRandom);
    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].style.backgroundColor = "yellow";
    })
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    controlsInterval = setInterval(Controls, 250);
});
let button = document.getElementById("startBtn");
function StartBtn() {
    nextRandom = getRndInteger(0, 5);
    console.log("next will be" + nextRandom);
    button.style.display = "none";
    displayShape()
    start();
}
let gameOver = false;
var controlsInterval;
var fallInterval;
currentPosition = 4;
randomTetromino = getRndInteger(0, 5);
currentTetromino = allTetrominos[randomTetromino];
rotation = 0;
document.addEventListener('DOMContentLoaded', () => {
    const weatherDiv = document.getElementById('weather');
    const city = 'Baku';
    const apiKey = '948e0919793b1952b930e0ff750833b8'; // Replace with your OpenWeatherMap API key

    // Fetch weather data using OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let weather = data.weather[0];
            let main = data.main;
            weatherDiv.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${main.temp} °C</p>
                <p>Weather: ${weather.description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${main.humidity} %</p>
            `;
            
            if (weather.main.toLowerCase() === 'clear') {
                document.body.style.backgroundImage = 'url("images/sunny.jpg")';
            } else if (weather.main.toLowerCase() === 'clouds') {
                document.body.style.backgroundImage = 'url("images/cloudy4.jpg")';
            } else {
                document.body.style.backgroundImage = 'url("images/other.jpg")';
            }
            document.body.style.backgroundSize = 'cover'; // Optional: make the image cover the whole background
            document.body.style.backgroundRepeat = 'no-repeat'; // Optional: prevent the image from repeating
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDiv.innerHTML = 'Error fetching weather data.';
        });
});

