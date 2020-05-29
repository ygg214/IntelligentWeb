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
            "<p> <form id=\"form\" onsubmit=\"onSubmit()\">\n" +
            "  <p hidden><input  name=\"userid\" id=\"userid\" value=\""+sessionStorage.getItem("USER_NAME")+"\"></p>\n" +
            "  <p hidden><input  name=\"textid\" id=\"textid\" value=\""+value.textid+"\"></p>\n" +
            "     <p><select name=\"ratings\">\n" +
            "      <option value =\"0\">hate</option>\n" +
            "      <option value =\"1\">dislike</option>\n" +
            "      <option value =\"2\">ok</option>\n" +
            "      <option value=\"3\">like</option>\n" +
            "      <option value=\"4\">Very like</option>\n" +
            "    </select>" +
            "  <input type=\"submit\" value=\"Submit\"></p>" +
            "</form></p>"+
            "</div>";
    }
}

function onSubmit() {
    var formArray = $("form").serializeArray();
    var data = {};
    for (index in formArray){
        data[formArray[index].name]=formArray[index].value;
    }
    sendAjaxQuery('/mainpage_rating',data);
    event.preventDefault();
}
function sendAjaxQuery(url, data) {
    //getCachedData(data);
    var input = JSON.stringify(data);
    $.ajax({
        url: url,
        data: input,
        contentType: 'application/json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            storeCachedData(dataR);
            //addToResult(dataR);
        },
        error: function (xhr, status, error) {
            alert('Error' + error.message);
        }
    });
}
function storeCachedData(data) {
    localStorage.setItem(data.userid +"."+ data.textid,JSON.stringify(data));
}

window.addEventListener('offline',function (e) {
    console.log("You are offline");
    showOfflineWarning();
},false);

window.addEventListener('online',function (e) {
    console.log("You are online");
    hideOfflineWarning();
    loadData();
},false);

function showOfflineWarning() {

}

function hideOfflineWarning() {

}