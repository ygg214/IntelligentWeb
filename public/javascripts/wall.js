function initPostData() {
    loadData();
}

function loadData() {
    if(localStorage.getItem(1) !=null){
        var value = JSON.parse(localStorage.getItem(1));
        var row = document.createElement('div');
        document.getElementById('results').appendChild(row);
        row.innerHTML =
            "user: " + value.user +
            "<p>"+"text: "+ value.text +
            "</div>";
    }
}
