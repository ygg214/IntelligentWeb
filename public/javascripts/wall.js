function initPostData() {
    loadData();
}

function loadData() {
    for(i=1;localStorage.getItem(i) !=null;i++){
        var value = JSON.parse(localStorage.getItem(i));
        if(value.userid==sessionStorage.getItem("USER_NAME")){
            var row = document.createElement('div');
            document.getElementById('results').appendChild(row);
            row.innerHTML =
                "user: " + value.userid +
                "<p>"+"text id:"+value.textid +
                "<p>"+"text: "+ value.text +
                "</div>";
        }
    }
}