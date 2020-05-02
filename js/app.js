var context;
var shape = new Object();
var monster1 = new Object();
var monster2 = new Object();
var monster3 = new Object();
var monster4 = new Object();
var move_Candy = new Object();
var move_Candy_alive;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var live_remain;
var monster_Number;
var monster_time;
var direct;
var totalGameTime;
var ballColor1;
var ballColor2;
var ballColor3;
var totalFood;
var leftkey;
var rightkey;
var downkey;
var upkey;
var left;
var right;
var down;
var up;
var eated;

$(document).ready(function () {
	context = canvas.getContext("2d");
});

function Start() {
	//debugger;
	eated=0;
	totalFood = $("#myRange").val();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_5remain = totalFood * 0.6;
	var food_15remain = totalFood * 0.3;
	var food_25remain = totalFood * 0.1;
	var pacman_remain = 1;
	monster_Number =$("#enemies").val();
	live_remain = 5;
	monster_time = 5;
	move_Candy_alive = true;
	direct = "right";
	totalGameTime = $("#time").val() * 1000;
	ballColor1 = $("#ball1c").val();
	ballColor2 = $("#ball2c").val();
	ballColor3 = $("#ball3c").val();
	ball1Point = parseInt($("#ball1p").val());
	ball2Point = parseInt($("#ball2p").val());
	ball3Point = parseInt($("#ball3p").val());
	leftkey = $("#leftK").val();
	rightkey = $("#rightK").val();
	upkey = $("#upK").val();
	downkey = $("#downK").val();
	$("#intro").prop("volume", 0.1);
	$('audio#intro')[0].play();
	$("#bgm").prop("volume", 0.1);
	$('audio#bgm')[0].play();

	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (monster_Number > 0 && i == 0 && j == 0) {
				board[i][j] = 3;
				monster1.i = i;
				monster1.j = j;
				monster1.hasFood = true;
				monster1.candy = 11;
				food_5remain--;
			}
			else if (monster_Number > 1 && i == 0 && j == 9) {
				board[i][j] = 3;
				monster2.i = i;
				monster2.j = j;
				monster2.hasFood = true;
				monster2.candy = 11;
				food_5remain--;
			}
			else if (monster_Number > 2 && i == 9 && j == 0) {
				board[i][j] = 3;
				monster3.i = i;
				monster3.j = j;
				monster3.hasFood = true;
				monster3.candy = 11;
				food_5remain--;
			}
			else if (monster_Number > 3 && i == 9 && j == 9) {
				board[i][j] = 3;
				monster4.i = i;
				monster4.j = j;
				monster4.hasFood = true;
				monster4.candy = 11;
				food_5remain--;
			}
			else if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_5remain) / cnt) {
					food_5remain--;
					board[i][j] = 11;
				}
				else if (randomNum <= (1.0 * (food_15remain + food_5remain)) / cnt) {
					food_15remain--;
					board[i][j] = 12;
				}
				else if (randomNum <= (1.0 * food_25remain + food_5remain + food_15remain) / cnt) {
					food_25remain--;
					board[i][j] = 13;
				}
				else if (randomNum < (1.0 * (pacman_remain + food_25remain + food_5remain + food_15remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_5remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11;
		food_5remain--;
	}
	while (food_15remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 12;
		food_15remain--;
	}
	while (food_25remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 13;
		food_25remain--;
	}

	for (i = 0; i < 2; i++) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
	}
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 5;
	move_Candy.i = emptyCell[0];
	move_Candy.j = emptyCell[1];
	move_Candy.hasFood = false;
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			if (e.key == leftkey){
				left = true;
				$("#contollers").attr("src","./resources/images/controllersLeft.png");
			}
			else if (e.key == rightkey) {
				right = true;
				$("#contollers").attr("src","./resources/images/controllersRight.png");
			}
			else if (e.key == downkey) {
				down = true;
				$("#contollers").attr("src","./resources/images/controllersDown.png");
			}
			else if (e.key == upkey) {
				up = true;
				$("#contollers").attr("src","./resources/images/controllersUp.png");
			}
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			if (e.key == leftkey)
				left = false;
			else if (e.key == rightkey) {
				right = false;
			}
			else if (e.key == downkey) {
				down = false;
			}
			else if (e.key == upkey) {
				up = false;
			}
			$("#contollers").attr("src","./resources/images/controllersNormal.png");
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (up) {
		return 1;
	}
	if (down) {
		return 2;
	}
	if (left) {
		return 3;
	}
	if (right) {
		return 4;
	}
}

function Draw() {
	var ghostImg = new Image;
	ghostImg.src = "./resources/images/ghost.png";

	var blockImg = new Image;
	blockImg.src = "./resources/images/block.png";
	
	var candyImg = new Image;
	candyImg.src = "./resources/images/candy.png";

	var fruitImg = new Image;
	fruitImg.src = "./resources/images/fruit.png";

	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLife.value = live_remain;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				if (direct == "right") {
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle right
				}
				else if (direct == "down") {
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle down
				}
				else if (direct == "left") {
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); //left
				}
				else if (direct == "up") {
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); //up
				}
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if (direct == "right") {
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
				}
				else if (direct == "down") {
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI);
				}
				else if (direct == "left") {
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
				}
				else if (direct == "up") {
					context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI);
				}
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 11) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor1; //color
				context.fill();
			}
			else if (board[i][j] == 12) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor2; //color
				context.fill();
			}
			else if (board[i][j] == 13) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor3; //color
				context.fill();
			}
			else if (board[i][j] == 4) {
				context.beginPath();
				context.drawImage(blockImg,center.x - 30, center.y - 30, 60, 60 * blockImg.height / blockImg.width);
			}
			else if (board[i][j] == 3) {
				context.beginPath();
				context.drawImage(ghostImg,center.x - 30, center.y - 30, 60, 60 * ghostImg.height / ghostImg.width);
			}
			else if (board[i][j] == 5) {
				context.beginPath();
				context.drawImage(candyImg,center.x - 30, center.y - 30, 60, 60 * candyImg.height / candyImg.width);
			}
			else if (board[i][j] == 6) {
				context.beginPath();
				context.drawImage(fruitImg,center.x - 30, center.y - 30, 60, 60 * fruitImg.height / fruitImg.width);
			}
		}
	}
	debugger;
}

function updateMonster(monster) {
	var direction = getDirection(monster);
	if (direction != 0) {
		if (monster.hasFood == true) {
			board[monster.i][monster.j] = monster.candy;
		}
		else {
			board[monster.i][monster.j] = 0;
		}
		if (direction == 1) {
			monster.i = monster.i + 1;
		}
		else if (direction == 2) {
			monster.j = monster.j + 1;
		}
		else if (direction == 3) {
			monster.i = monster.i - 1;
		}
		else if (direction == 4) {
			monster.j = monster.j - 1;
		}
		if (board[monster.i][monster.j] == 2) {
			return false;
		}
		else if (board[monster.i][monster.j] == 0) {
			monster.hasFood = false;
		}
		else if (board[monster.i][monster.j] == 11 || board[monster.i][monster.j] == 12 || board[monster.i][monster.j] == 13) {
			monster.hasFood = true;
			monster.candy = board[monster.i][monster.j];
		}

		board[monster.i][monster.j] = 3;
	}
	return true;

}

function getDirection(monster) {
	if (shape.i >= monster.i && shape.j >= monster.j) {
		if (shape.i - monster.i >= shape.j - monster.j) {
			if (monster.i < 10 && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 3 && board[monster.i + 1][monster.j] != 5 && board[monster.i + 1][monster.j] != 6) {
				return 1;
			}
			else if (monster.j < 10 && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 3 && board[monster.i][monster.j + 1] != 5 && board[monster.i][monster.j + 1] != 6) {
				return 2;
			}
		}
		else if (monster.j < 10 && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 3 && board[monster.i][monster.j + 1] != 5 && board[monster.i][monster.j + 1] != 6) {
			return 2;
		}
		else if (monster.i < 10 && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 3 && board[monster.i + 1][monster.j] != 5 && board[monster.i + 1][monster.j] != 6) {
			return 1;
		}
		return 0;
	}
	else if (shape.i >= monster.i && shape.j < monster.j) {
		if (shape.i - monster.i <= monster.j - shape.j) {
			if (monster.j > 0 && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 3 && board[monster.i][monster.j - 1] != 5 && board[monster.i][monster.j - 1] != 6) {
				return 4;
			}
			else if (monster.i < 10 && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 3 && board[monster.i + 1][monster.j] != 5 && board[monster.i + 1][monster.j] != 6) {
				return 1;
			}
		}
		else if (monster.i < 10 && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 3 && board[monster.i + 1][monster.j] != 5 && board[monster.i + 1][monster.j] != 6) {
			return 1;
		}
		else if (monster.j > 0 && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 3 && board[monster.i][monster.j - 1] != 5 && board[monster.i][monster.j - 1] != 6) {
			return 4;
		}
		return 0;
	}
	else if (shape.i < monster.i && shape.j >= monster.j) {
		if (monster.i - shape.i >= shape.j - monster.j) {
			if (monster.i > 0 && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 3 && board[monster.i - 1][monster.j] != 5 && board[monster.i - 1][monster.j] != 6) {
				return 3;
			}
			else if (monster.j < 10 && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 3 && board[monster.i][monster.j + 1] != 5 && board[monster.i][monster.j + 1] != 6) {
				return 2;
			}
		}
		else if (monster.j < 10 && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 3 && board[monster.i][monster.j + 1] != 5 && board[monster.i][monster.j + 1] != 6) {
			return 2;
		}
		else if (monster.i > 0 && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 3 && board[monster.i - 1][monster.j] != 5 && board[monster.i - 1][monster.j] != 6) {
			return 3;
		}
		return 0;
	}
	else {
		if (monster.i - shape.i >= monster.j - shape.j) {
			if (monster.i > 0 && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 3 && board[monster.i - 1][monster.j] != 5 && board[monster.i - 1][monster.j] != 6) {
				return 3;
			}
			else if (monster.j > 0 && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 3 && board[monster.i][monster.j - 1] != 5 && board[monster.i][monster.j - 1] != 6) {
				return 4;
			}
		}
		else if (monster.j > 0 && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 3 && board[monster.i][monster.j - 1] != 5 && board[monster.i][monster.j - 1] != 6) {
			return 4;
		}
		else if (monster.i > 0 && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 3 && board[monster.i - 1][monster.j] != 5 && board[monster.i - 1][monster.j] != 6) {
			return 3;
		}
		return 0;
	}
}

function afterMonsterCatch() {
	$("#death").prop("volume", 0.1);
	$('audio#death')[0].play();
	live_remain--;
	score = score - 10;
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 2;
	board[shape.i][shape.j] = 0;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	if (monster_Number > 0) {
		if (monster1.hasFood) {
			board[monster1.i][monster1.j] = monster1.candy;
		}
		else {
			board[monster1.i][monster1.j] = 0;
		}
		board[0][0] = 3;
		monster1.i = 0;
		monster1.j = 0;
		monster1.hasFood = false;
	}
	if (monster_Number > 1) {
		if (monster2.hasFood) {
			board[monster2.i][monster2.j] = monster2.candy;
		}
		else {
			board[monster2.i][monster2.j] = 0;
		}
		board[0][9] = 3;
		monster2.i = 0;
		monster2.j = 9;
		monster2.hasFood = false;
	}
	if (monster_Number > 2) {
		if (monster3.hasFood) {
			board[monster3.i][monster3.j] = monster3.candy;
		}
		else {
			board[monster3.i][monster3.j] = 0;
		}
		board[9][0] = 3;
		monster3.i = 9;
		monster3.j = 0;
		monster3.hasFood = false;
	}
	if (monster_Number > 3) {
		if (monster4.hasFood) {
			board[monster4.i][monster4.j] = monster4.candy;
		}
		else {
			board[monster4.i][monster4.j] = 0;
		}
		board[9][9] = 3;
		monster4.i = 9;
		monster4.j = 9;
		monster4.hasFood = false;
	}
}

function monstresMove() {
	if (board[shape.i][shape.j] == 3) {
		afterMonsterCatch();
	}
	else {
		if (monster_Number == 1) {
			if (updateMonster(monster1) == false) {
				afterMonsterCatch();
			}
		}
		else if (monster_Number == 2) {
			if (updateMonster(monster1) == false || updateMonster(monster2) == false) {
				afterMonsterCatch();
			}
		}
		else if (monster_Number == 3) {
			if (updateMonster(monster1) == false || updateMonster(monster2) == false || updateMonster(monster3) == false) {
				afterMonsterCatch();
			}
		}
		else if (monster_Number == 4) {
			if (updateMonster(monster1) == false || updateMonster(monster2) == false || updateMonster(monster3) == false || updateMonster(monster4) == false) {
				afterMonsterCatch();
			}
		}
	}
}

function candyMove() {
	var random = Math.random();
	if (random < 0.25 && move_Candy.i < 10 && (board[move_Candy.i + 1][move_Candy.j] == 0 || board[move_Candy.i + 1][move_Candy.j] == 11 || board[move_Candy.i + 1][move_Candy.j] == 12 || board[move_Candy.i + 1][move_Candy.j] == 13)) {
		if (move_Candy.hasFood) {
			board[move_Candy.i][move_Candy.j] = move_Candy.food;
		}
		else {
			board[move_Candy.i][move_Candy.j] = 0;
		}
		move_Candy.i = move_Candy.i + 1;
		if (board[move_Candy.i][move_Candy.j] == 11 || board[move_Candy.i][move_Candy.j] == 12 || board[move_Candy.i][move_Candy.j] == 13) {
			move_Candy.hasFood = true;
			move_Candy.food = board[move_Candy.i][move_Candy.j];
		}
		else {
			move_Candy.hasFood = false;
		}
		board[move_Candy.i][move_Candy.j] = 5;

	}
	else if (random < 0.50 && move_Candy.i > 0 && (board[move_Candy.i - 1][move_Candy.j] == 0 || board[move_Candy.i - 1][move_Candy.j] == 11 || board[move_Candy.i - 1][move_Candy.j] == 12 || board[move_Candy.i - 1][move_Candy.j] == 13)) {
		if (move_Candy.hasFood) {
			board[move_Candy.i][move_Candy.j] = move_Candy.food;
		}
		else {
			board[move_Candy.i][move_Candy.j] = 0;
		}
		move_Candy.i = move_Candy.i - 1;
		if (board[move_Candy.i][move_Candy.j] == 11 || board[move_Candy.i][move_Candy.j] == 12 || board[move_Candy.i][move_Candy.j] == 13) {
			move_Candy.hasFood = true;
			move_Candy.food = board[move_Candy.i][move_Candy.j];
		}
		else {
			move_Candy.hasFood = false;
		}
		board[move_Candy.i][move_Candy.j] = 5;

	}
	else if (random < 0.75 && move_Candy.j < 10 && (board[move_Candy.i][move_Candy.j + 1] == 0 || board[move_Candy.i][move_Candy.j + 1] == 11 || board[move_Candy.i][move_Candy.j + 1] == 12 || board[move_Candy.i][move_Candy.j + 1] == 13)) {
		if (move_Candy.hasFood) {
			board[move_Candy.i][move_Candy.j] = move_Candy.food;
		}
		else {
			board[move_Candy.i][move_Candy.j] = 0;
		}
		move_Candy.j = move_Candy.j + 1;
		if (board[move_Candy.i][move_Candy.j] == 11 || board[move_Candy.i][move_Candy.j] == 12 || board[move_Candy.i][move_Candy.j] == 13) {
			move_Candy.hasFood = true;
			move_Candy.food = board[move_Candy.i][move_Candy.j];
		}
		else {
			move_Candy.hasFood = false;
		}
		board[move_Candy.i][move_Candy.j] = 5;

	}
	else if (move_Candy.j > 0 && (board[move_Candy.i][move_Candy.j - 1] == 0 || board[move_Candy.i][move_Candy.j - 1] == 11 || board[move_Candy.i][move_Candy.j - 1] == 12 || board[move_Candy.i][move_Candy.j - 1] == 13)) {
		if (move_Candy.hasFood) {
			board[move_Candy.i][move_Candy.j] = move_Candy.food;
		}
		else {
			board[move_Candy.i][move_Candy.j] = 0;
		}
		move_Candy.j = move_Candy.j - 1;
		if (board[move_Candy.i][move_Candy.j] == 11 || board[move_Candy.i][move_Candy.j] == 12 || board[move_Candy.i][move_Candy.j] == 13) {
			move_Candy.hasFood = true;
			move_Candy.food = board[move_Candy.i][move_Candy.j];
		}
		else {
			move_Candy.hasFood = false;
		}
		board[move_Candy.i][move_Candy.j] = 5;

	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			direct = "up";
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			direct = "down";
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			direct = "left";
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			direct = "right";
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
		eated++;
		$("#chomp").prop("volume", 0.1);
			$('audio#chomp')[0].play();
	}
	if (board[shape.i][shape.j] == 11) {
		score = score + ball1Point;
		eated++;
		$("#chomp").prop("volume", 0.1);
			$('audio#chomp')[0].play();
	}
	if (board[shape.i][shape.j] == 12) {
		score = score + ball2Point;
		eated++;
		$("#chomp").prop("volume", 0.1);
			$('audio#chomp')[0].play();
	}
	if (board[shape.i][shape.j] == 13) {
		score = score + ball3Point;
		eated++;
		$("#chomp").prop("volume", 0.1);
			$('audio#chomp')[0].play();
	}
	if (board[shape.i][shape.j] == 5) {
		score = score + 50;
		move_Candy_alive = false;
		$("#fruit").prop("volume", 0.1);
			$('audio#fruit')[0].play();
	}
	if (board[shape.i][shape.j] == 6) {
		$("#fruit").prop("volume", 0.1);
		$('audio#fruit')[0].play();
		live_remain++;
	}

	board[shape.i][shape.j] = 2;
	if (monster_time % 4 == 0) {
		monster_time = 1;
		monstresMove();
		if (move_Candy_alive) {
			candyMove();
		}
	}
	else {
		if (monster_time % 2 == 0 && updateMonster(monster1) == false) {
			afterMonsterCatch();
		}
		monster_time++;
	}
	var currentTime = new Date();
	time_elapsed = (totalGameTime - (currentTime - start_time)) / 1000;
	if (score < 100 && time_elapsed <= 0) {
		window.clearInterval(interval);
		window.alert("You are better than " + score + " points!");
	}
	else if (score >= 100 && time_elapsed <= 0) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
	}
	else if (live_remain == 0) {
		window.clearInterval(interval);
		window.alert("loser!");
	}
	else if (eated == totalFood) {
		window.clearInterval(interval);
		window.alert("Winner!");
	}
	else {
		Draw();
	}
}
