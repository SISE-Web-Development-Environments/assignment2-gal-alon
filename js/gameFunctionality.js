		//disable scrolling with keys
		window.addEventListener("keydown", function (e) {
			if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
		}, false);

        function showGame() {
            d1 = document.getElementById("welcome");
            d2 = document.getElementById("login");
            d3 = document.getElementById("register");
            d4 = document.getElementById("settings");
            d5 = document.getElementById("game");
            d1.style.display = "none";
            d2.style.display = "none";
            d3.style.display = "none";
            d4.style.display = "none";
            d5.style.display = "block";
            Start();
        }
        
        function stopGame() {
            $('audio#bgm')[0].pause();
            $('audio#bgm')[0].currentTime = 0;
            window.clearInterval(interval);
        }
        
        function fillLables(leftkey, rightkey, upkey, downkey, ball1color, ball1point, ball2color, ball2point, ball3color, ball3point, time, numberOfEnemies, numberOfBalls) {
            $("#userId").html("User: <b>" + currentUser.userName + "</b>");
        
            $("#leftks").html(leftkey);
            $("#rightks").html(rightkey);
            $("#upks").html(upkey);
            $("#downks").html(downkey);
        
            $("#ballscs").html(numberOfBalls);
        
            $("#ball1lbl").attr("style", "color: " + ball1color);
            $("#ball1cs").html(ball1color);
            $("#ball1cs").attr("style", "color: " + ball1color);
            $("#ball1cscr").html(ball1point);
            $("#ball1cscr").attr("style", "color: " + ball1color);
        
            $("#ball2lbl").attr("style", "color: " + ball2color);
            $("#ball2cs").html(ball2color);
            $("#ball2cs").attr("style", "color: " + ball2color);
            $("#ball2cscr").html(ball2point);
            $("#ball2cscr").attr("style", "color: " + ball2color);
        
            $("#ball3lbl").attr("style", "color: " + ball3color);
            $("#ball3cs").html(ball3color);
            $("#ball3cs").attr("style", "color: " + ball3color);
            $("#ball3cscr").html(ball3point);
            $("#ball3cscr").attr("style", "color: " + ball3color);
        
            $("#timercs").html(time + " Seconds");
        
            $("#noecs").html(numberOfEnemies);
        
        }