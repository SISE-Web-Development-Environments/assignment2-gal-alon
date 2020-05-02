var users;
		var numOfUsers = 0;
		var contextBall1;
		var currentUser;
		var imageUrl = new Array();

		$(document).ready(function () {
			users = new Array;
			users[0] = { userName: "p", password: "p", fullName: "pp", email: "p@mail.com", dayb: "1", monthb: "1", yearb: "1900" }
			numOfUsers++;


			var str = $("#myRange").val();
			$("#f").html(str);

			var str = $("#enemies").val();
			$("#en").html(str);


			//settings

			defaultKeys();

			imageUrl[0] = "./resources/images/ghost1.png";
			imageUrl[1] = "./resources/images/ghost2.png";
			imageUrl[2] = "./resources/images/ghost3.png";
			imageUrl[3] = "./resources/images/ghost4.png";


			var slider = document.getElementById("myRange");
			var output = document.getElementById("f");

			output.innerHTML = slider.value;
			slider.oninput = function () {
				output.innerHTML = this.value;
			}

			var slider2 = document.getElementById("enemies");
			var output2 = document.getElementById("en");
			output2.innerHTML = slider2.value;
			$("#ghost").prop("src", imageUrl[slider2.value - 1]);
			slider2.oninput = function () {
				output2.innerHTML = this.value;
				$("#ghost").prop("src", imageUrl[this.value - 1]);
			}

			var colorStr = $("#ball1c").val();
			$("#ball1").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");

			var colorStr = $("#ball2c").val();
			$("#ball2").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");

			var colorStr = $("#ball3c").val();
			$("#ball3").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");


		});


		$("#randomSettings").click(function () {

			defaultKeys();

			//random balls

			var ballsR = Math.floor((Math.random() * 41) + 50);
			$("#myRange").val(ballsR);
			$("#f").html(ballsR);

			var $options = $('#ball1c').find('option'),
				random = ~~(Math.random() * $options.length);
			$options.eq(random).prop('selected', true);
			var colorStr = $("#ball1c").val();
			$("#ball1").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");

			var $options = $('#ball2c').find('option'),
				random = ~~(Math.random() * $options.length);
			$options.eq(random).prop('selected', true);
			while ($("#ball2c").val() == $("#ball1c").val()) {
				var $options = $('#ball2c').find('option'),
					random = ~~(Math.random() * $options.length);
				$options.eq(random).prop('selected', true);
			}
			var colorStr = $("#ball2c").val();
			$("#ball2").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");

			var $options = $('#ball3c').find('option'),
				random = ~~(Math.random() * $options.length);
			$options.eq(random).prop('selected', true);
			while ($("#ball3c").val() == $("#ball1c").val() || $("#ball3c").val() == $("#ball2c").val()) {
				var $options = $('#ball3c').find('option'),
					random = ~~(Math.random() * $options.length);
				$options.eq(random).prop('selected', true);
			}
			var colorStr = $("#ball3c").val();
			$("#ball3").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");

			var points1 = Math.floor((Math.random() * 5) + 1);
			var points2 = Math.floor((Math.random() * 10) + 6);
			var points3 = Math.floor((Math.random() * 11) + 15);
			$("#ball1p").val(points1);
			$("#ball2p").val(points2);
			$("#ball3p").val(points3);

			//random general
			var timeR = Math.floor((Math.random() * 120) + 60);
			$("#time").val(timeR);

			var enemiesR = Math.floor((Math.random() * 4) + 1);
			$("#enemies").val(enemiesR);
			$("#en").val(enemiesR);
			var enO = document.getElementById("en");
			enO.innerHTML = enemiesR;
			$("#ghost").prop("src", imageUrl[enemiesR - 1]);

		});

		var prevkey;

		function defaultKeys() {
			$("#leftK").val("ArrowLeft");
			$("#rightK").val("ArrowRight");
			$("#upK").val("ArrowUp");
			$("#downK").val("ArrowDown");
		}

		$(".keybindL").click(function () {
			prevkey = $(this).val();
			$(this).val("Please select a key...");
		});

		$(".keybindL")
			.focusout(function () {
				if ($(this).val() == "Please select a key...") {
					$(this).val(prevkey);
				}
			})


		$(".keybindL").bind('keydown', function (e) {
			var keypressed = e.key;
			if (keypressed == " ") {
				keypressed = "Space";
			}
			if (checkSimilarKeys(keypressed) == true) {

				$(this).val(keypressed);
			}
			else {
				alert("This key is already Taken. Please choose another key.")
			}
		});


		//color1
		(function () {
			var previous;
			$("#ball1c").on('focus', function () {
				previous = this.value;
			}).change(function () {
				if ($("#ball2c").val() == $("#ball1c").val() || $("#ball3c").val() == $("#ball1c").val()) {
					$("#ball1c").val(previous);
					alert("Color is already taken");
				}
				else {
					var colorStr = $("#ball1c").val();
					$("#ball1").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");
					previous = this.value;
				}
			});
		})();

		//color2
		(function () {
			var previous;
			$("#ball2c").on('focus', function () {
				previous = this.value;
			}).change(function () {
				if ($("#ball2c").val() == $("#ball1c").val() || $("#ball2c").val() == $("#ball3c").val()) {
					$("#ball2c").val(previous);
					alert("Color is already taken");
				}
				else {
					var colorStr = $("#ball2c").val();
					$("#ball2").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");
					previous = this.value;
				}
			});
		})();

		//color3
		(function () {
			var previous;
			$("#ball3c").on('focus', function () {
				previous = this.value;
			}).change(function () {
				if ($("#ball2c").val() == $("#ball3c").val() || $("#ball1c").val() == $("#ball3c").val()) {
					$("#ball3c").val(previous);
					alert("Color is already taken");
				}
				else {
					var colorStr = $("#ball3c").val();
					$("#ball3").attr("style", "border-color:" + colorStr + "; color:" + colorStr + "; width:95%");
					previous = this.value;
				}
			});
		})();