function checkForErrors(isLoginCorrect) {
    if (!isLoginCorrect) {
        alert('login or password is incorrect');
    }
}

function currentUser(){
    const myselect=document.getElementById("user");
    const index=myselect.selectedIndex ;
    const value = myselect.options[index].value;
    sessionStorage.setItem('USER_NAME',value);
}