let canvas = document.getElementById("snake"); //pega o canvas do html
let context = canvas.getContext("2d");//renderizar tudo do canvas
let box = 32; //pixels cada quadrado
let snake = []; //crianção da Snake
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; //direção padrão

//criando comida em modo aleatório
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//inicia o canvas
function criarBG(){
    context.fillStyle = "lightgray";//cor do fundo(estilos)
    context.fillRect(0, 0, 16 * box, 16 * box); //usa X e Y e altura e largura
}
//criando snake
function criarSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "grey";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//criando a comida da Snake
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//configurando a direção para não sair da tela
document.addEventListener('keydown', update); //usa a tecla do teclado ou mouse
function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    
}

//iniciando jogo
function iniciarJogo(){
    
    //sai da tela e aparece do outro lado
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; 
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; 
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    

    //loop pra saber se vai encontar no corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo) //para o jogo
            alert('Game Over! :( ');
        }
    }


    criarBG();
    criarSnake();
    drawFood();

    //posição de início da snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //condições para andar
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        //remover último elemento do array
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
    }

    //acrescenta um elemento a frente
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100); //iniciar e cada 100milisegundos atualizar
