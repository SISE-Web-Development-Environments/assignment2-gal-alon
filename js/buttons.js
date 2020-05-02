$("#loginb").click(function () {

    clicklogin();
});

$("#loginbig").click(function () {
    clicklogin();
});

$("#registerb").click(function () {
    clickregister();
});


$("#registerbig").click(function () {
    clickregister();
});

$("#settingsb").click(function () {
    if (currentUser != null) {
        clicksettings();
    } else {
        clicklogin();
    }
});

$("#aboutb").click(function () {
    var modal = document.getElementById("aboutModal");
    modal.style.display = "block";
});


$("#playb").click(function () {
    if (currentUser != null) {
        showGame();
    }
    else {
        clicklogin();
    }
});

$(".close").click(function () {
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("aboutModal");
    modal.style.display = "none";
});

window.onclick = function (event) {
    var modal = document.getElementById("aboutModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(".applySettings").click(function () {
    if (validateSettings() == true) {
        //apply vars
        stopGame();
        fillLables($("#leftK").val(), $("#rightK").val(), $("#upK").val(), $("#downK").val(), $("#ball1c").val(), $("#ball1p").val(), $("#ball2c").val(), $("#ball2p").val(), $("#ball3c").val(), $("#ball3p").val(), $("#time").val(), $("#enemies").val(), $("#myRange").val());
        showGame();
        $(window).scrollTop($('#content').offset().top);
    }
});

$("#logo").click(function () {
    d1 = document.getElementById("welcome");
    d2 = document.getElementById("login");
    d3 = document.getElementById("register");
    d4 = document.getElementById("settings");
    d5 = document.getElementById("game");
    d1.style.display = "block";
    d2.style.display = "none";
    d3.style.display = "none";
    d4.style.display = "none";
    d5.style.display = "none";
});

function clicklogin() {
    stopGame();
    d1 = document.getElementById("welcome");
    d2 = document.getElementById("login");
    d3 = document.getElementById("register");
    d4 = document.getElementById("settings");
    d5 = document.getElementById("game");
    d1.style.display = "none";
    d2.style.display = "block";
    d3.style.display = "none";
    d4.style.display = "none";
    d5.style.display = "none";
}

function clickregister() {
    stopGame();
    d1 = document.getElementById("welcome");
    d2 = document.getElementById("login");
    d3 = document.getElementById("register");
    d4 = document.getElementById("settings");
    d5 = document.getElementById("game");
    d1.style.display = "none";
    d2.style.display = "none";
    d3.style.display = "block";
    d4.style.display = "none";
    d5.style.display = "none";
}

function clicksettings() {
    stopGame();
    d1 = document.getElementById("welcome");
    d2 = document.getElementById("login");
    d3 = document.getElementById("register");
    d4 = document.getElementById("settings");
    d5 = document.getElementById("game");
    d1.style.display = "none";
    d2.style.display = "none";
    d3.style.display = "none";
    d4.style.display = "block";
    d5.style.display = "none";
}

$("#loginsubmit").click(function () {
    currentUser = validateLogin(users, numOfUsers);
    if (currentUser != null) {
        clicksettings();
    }
});

$("#registersubmit").click(function () {
    currentUser = validateRegistration(users, numOfUsers);
    if (currentUser != null) {
        numOfUsers++;
        //alert("Welcome " + currentUser[0]);
        clicksettings();
    }
});


$(document).keyup(function (e) {
    if (e.keyCode === 27) {
        var modal = document.getElementById("aboutModal");
        modal.style.display = "none";
    }
});
