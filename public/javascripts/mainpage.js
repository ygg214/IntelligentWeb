function initPostData() {
    loadData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
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
            "<p><img src="+value.picture+"/>"
            "</div>";
    }
}