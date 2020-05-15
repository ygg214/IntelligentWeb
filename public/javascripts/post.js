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
            document.getElementById('results').innerHTML = JSON.stringify(ret);
            storeCachedData(dataR);
            //addToResult(dataR);
        },
        error: function (xhr, status, error) {
            //alert('Error' + error.message);
            addToResult(getCachedData(data));
        }
    });
}

function addToResult(data){
    var row = document.createElement('div');
    document.getElementById('results').appendChild(row);
    row.innerHTML =
        "user: " + data.user +
        "<p>"+"text: "+ data.text +
        "</div>";
}

function onSubmit() {
    var formArray = $("form").serializeArray();
    var data = {};
    var id = localStorage.length;
    for (index in formArray){
        data[formArray[index].name]=formArray[index].value;
        data.textid = id + 1;
    }
    sendAjaxQuery('/post',data);
    event.preventDefault();
}

function storeCachedData(data) {
    localStorage.setItem(data.textid,JSON.stringify(data));
}
