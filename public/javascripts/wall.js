function initPostData() {
    loadData();
}

function loadData() {
    for(i=1;localStorage.getItem(i) !=null;i++){
        var value = JSON.parse(localStorage.getItem(i));
        var row = document.createElement('div');
        document.getElementById('results').appendChild(row);
        row.innerHTML =
            "user: " + value.user +
            "<p>"+"text id:"+value.textid +
            "<p>"+"text: "+ value.text +
            "</div>";
    }
}