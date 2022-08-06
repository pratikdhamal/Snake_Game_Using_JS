// Declaration of constants and variables 
let inputDir ={x: 0, y: 0};

const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');

let speed=5;

let lastPaintTime=0;

let snakeArr =[

    {x: 13, y: 15}
]
food= {x:6, y:7};

let score =0;


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

// Function for snake collides
function isCollide(snake){
    // If snake collides into yourself 
    for(let i=1; i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // Condition for when snake crashes to screen 
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}


function gameEngine(){
    //Part 1 - Updating the Snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score=0;
    }


    // If you have eaten the food. Then Increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play();
        score += 1;
        if(score > highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score : " + highscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    }

   
    // Moving the Snake
    for(let i=snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2 - Displaying the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;  // Here y is row 
        snakeElement.style.gridColumnStart=e.x; // Here x is column
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


    // Part 3 - Displaying the Food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



    })
}


// Game Logic

let highscore =localStorage.getItem("highscore");
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(localStorage.getItem(highscore));
    highscoreBox.innerHTML = "High Score : " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y:1} //Start the game 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrroUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=  0;
            inputDir.y=  1;
            break;

        case "ArrowLeft":   
            console.log("ArrowLeft");
            inputDir.x=  -1;
            inputDir.y=  0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=  1;
            inputDir.y=  0;
            break;
    
        default:
            break;
    }
});


