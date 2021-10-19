// alert("js");

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBotton = new Image();

bird.src = "image/flappy_bird_bird.png";
bg.src = "image/flappy_bird_bg.png";
fg.src = "image/flappy_bird_fg.png";
pipeUp.src = "image/flappy_bird_pipeUp.png";
pipeBotton.src = "image/flappy_bird_pipeBottom.png";

//Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

gap = 90;

// При нажатии на кнопку
document.addEventListener("keyup", moveUp);

function moveUp() {
    yPos -=25;
    fly.play();
}

// Создание блоков
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;


// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBotton, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        
        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        
        //Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width  
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); //Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();

        }
    }

    // ctx.drawImage(pipeUp, 100, 0);
        // ctx.drawImage(pipeBotton, 100, 0 + pipeUp.height + gap);

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos , yPos);

    yPos += grav;

    ctx.fillstyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBotton.onload = draw;