
function setup() {
    // создаем канвас
    createCanvas(800, 500);
}
function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
let barrierStatusClear= false;
let x = 0;
let y = 50;
let gravity = 0.1;
let yV = 0;
let xMax = 800, yMax = 500;
let j = 0, count = 8;
// переменная статуса игры
let gameStatus = 1;
// счетчик очков
let score=0;
// Array - массив случайныйх, arrayX - массив препятствий
let array = [randomInteger(30, 400)], arrayX = [0];
// высота отверстия прохода
const massHeight = 100;
// ширина препятствия
const massWidth = 10;

function draw() {
    if (gameStatus) {
        checkScreen();
        checkBird();
        background(100, 200, 255);
        drawBird();
        // добавляем в массивы препятствие и данные для отверстия
        if (x % 100 == 0) {
            arrayX.push(x - 100 * arrayX.length);
            array.push(randomInteger(30, 400));
        }
        for (let i = 0; i < arrayX.length; i++) {
             drawRect(arrayX[i], array[i]);
        }
    } 
    else {
        stroke(255, 255, 255  );
        fill(255  , 255 , 255);
        textSize(50);
        text("Game over! Press R to restart.",70, yMax/2);
    }
    
        viewScore();
   
}
function viewScore(){
    if (score)
    {stroke(50, 50, 50);
    fill(50, 50, 50);
    textSize(25);
    text("Your score is: "+score,30,100);}
}
// создание препятствий
function drawRect(xX, xR) {
    rectMode(CORNERS);
    stroke(250, 100, 0);
    strokeWeight(0);
    fill(200, 200, 0);
// проверочная ось обьекта
    rect(200, y, 400, y);
    rect(400, 0, 400, 800);
    rect(xMax-massWidth-xX, 0, xMax - xX, xR);
    rect(xMax-massWidth-xX, xR + massHeight, xMax - xX, yMax);

// проверочная линия
    for(let i = 0; i < arrayX.length; i++)
    {

    rectMode(CORNERS);
    stroke(250, 100, 0);
    strokeWeight(0);
    fill(0, 255, 0);
    rect(xMax - arrayX[i], 0, xMax - arrayX[i], yMax);

    rect(xMax - arrayX[i]-massWidth, 0, xMax - arrayX[i]-massWidth, yMax);}
}
function drawBird() {
    stroke(0, 0, 255);
    strokeWeight(0);
    fill(0, 0, 255);
    ellipse(xMax / 2, y, 10 * 2);



    for (let i = 0; i < arrayX.length; i++) {
        arrayX[i] += 1;
    }
    x++;
    if (yV < 0) yV += gravity * 10;
    else yV += gravity;
    y += yV;
}
function keyPressed() {
    // работа по нажатию Space only
    if (event.keyCode == 32) yV = -10;
    // перезагрузка страницы по  "r" в случае проигрыша
    if (!gameStatus)
        if (event.keyCode == 82) window.location.reload();;

}
function checkScreen() {
    // контроль выхода обьекта за границы канваса по вертикали
    if ((y > 490) || (y-10 < 0))
        gameStatus = 0;
}
function checkBird() {
   
    for(let i = 0; i < arrayX.length; i++)
    {
        if ( arrayX[i] >= 380 && arrayX[i] <= 410) 
        {
            if (y-10 <= array[i]) 
                gameStatus = 0; 

            if (y+10 >= array[i]+massHeight) 
                gameStatus = 0; 

            if (barrierStatusClear == false) barrierStatusClear = true;
        }  
        // подсчет счета
        if (arrayX[i]%400 == 11 && barrierStatusClear == true)   {barrierStatusClear=false;
             score++;}
        
    }
    
}