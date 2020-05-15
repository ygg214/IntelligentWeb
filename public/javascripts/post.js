function sendAjaxQuery(url, data) {
    //getCachedData(data);
    var input = JSON.stringify(data);
    $.ajax({
        url: url,
        data: input,
        contentType: 'application/json',
        type: 'POST',
        success: function (dataR) {
            /*var ret = dataR;
            document.getElementById('results').innerHTML = JSON.stringify(ret);*/
            storeCachedData(dataR);
            addToResult(dataR);
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
    for (index in formArray){
        data[formArray[index].name]=formArray[index].value;
    }
    sendAjaxQuery('/post',data);
    event.preventDefault();
}

function storeCachedData(data) {
    localStorage.setItem(1,JSON.stringify(data));
}
