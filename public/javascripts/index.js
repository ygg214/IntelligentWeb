function checkForErrors(isLoginCorrect) {
    if (!isLoginCorrect) {
        alert('login or password is incorrect');
    }
}

function currentUser(){
    var myselect=document.getElementById("user");
    var index=myselect.selectedIndex ;
    var value = myselect.options[index].value;
    sessionStorage.setItem('USER_NAME',value);
}