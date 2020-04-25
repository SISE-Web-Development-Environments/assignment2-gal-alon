function validateLogin(users, numOfUsers) {
    if ($('#userL').val() == '' || $('#passL').val() == '') {
        alert('Input can not be left blank');
        return null;
    }
    for (var i = 0; i < numOfUsers; i++) {
        if ($('#userL').val() == users[i][0] && $('#passL').val() == users[i][1]) {
            return users[i];
        }
    }
    alert('No such user');
    return null;
}

function validateRegistration(users, numOfUsers) {
    if ($('#userR').val() == '' || $('#passR').val() == '' || $('#nameR').val() == '') {
        alert('Input can not be left blank');
        return null;
    }
    var pass = $('#passR').val();
    if (checkIfContainNum(pass) == false) {
        alert('Password must contain numbers and letters.');
        return null;
    }

    if (checkIfContainLetters(pass) == false) {
        alert('Password must contain numbers and letters.');
        return null;
    }

    var dobday = $('#dob-day option:selected').text();
    var dobmonth = $('#dob-month option:selected').text();
    var dobyear = $('#dob-year option:selected').text();
    if(checkOnlyNumbers(dobday) == false || checkOnlyNumbers(dobmonth) == false || checkOnlyNumbers(dobyear) == false){
        alert('Please fill date of birth.');
        return null;
    }

    for (var i = 0; i < numOfUsers; i++) {
        if ($('#userR').val() == users[i][0]){
            alert('This user name has already been taken.');
            return null;
        }
    }
    users[numOfUsers] = new Array;
    users[numOfUsers][0] = $('#userR').val();
    users[numOfUsers][1] = $('#passR').val();
    alert('Registered successfully!');
    return users[numOfUsers];
}

function validateSettings(str){
    $("#keybind").attr("style", "border-color:yellow; height: 700px;");
    $("#balls").attr("style", "border-color:yellow;");
    $("#general").attr("style", "border-color:yellow; height: 700px;");
    if ($("#time").val() < 60) {
        $("#general").attr("style", "border-color:red; height: 700px;");
        alert("The time must be at least 60 seconds.");
        return false;
    }
    if ($("#ball1p").val() == "" || $("#ball2p").val() == "" || $("#ball3p").val() == "") {
        $("#balls").attr("style", "border-color:red;");
        alert("Please enter the balls points.");
        return false;
    }
    if ($("#leftK").val() == "" || $("#rightK").val() == "" || $("#upK").val() == "" || $("#downK").val() == "") {
        $("#keybind").attr("style", "border-color:red; height: 700px;");
        alert("Please bind all keys.");
        return false;
    }
    return true;
}


function checkIfContainNum(str) {
    for (var i = 0; i < str.length; i++) {
        if (isNaN(str[i]) == false)
            return true;
    }
    return false;
}

function checkIfContainLetters(str) {
    for (var i = 0; i < str.length; i++) {
        if (isNaN(str[i]) == true && (str[i].toUpperCase() != str[i].toLowerCase()))
            return true;
    }
    return false;
}

function checkOnlyNumbers(str){
    debugger;
    for (var i = 0; i < str.length; i++) {
        if (isNaN(str[i]) == true)
            return false;
    }
    return true;
}



