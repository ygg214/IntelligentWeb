function checkLogin(){
    if(sessionStorage.getItem('USER_NAME')==null){
        var dialog = document.getElementById("logindialog");
        dialog.showModal();
    }else
        loadData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered');
            })
            .catch(function (err) {
                console.log("Fail to register",err);
            });
    }
    if ('indexedDB' in window) {
        initDatabase();
    }
    else {
        console.log('This browser doesn\'t support IndexedDB');
    }
}

function chooseUser(){
    if(document.getElementById("loginuser").value!=""){
        const value=document.getElementById("loginuser").value;
        sessionStorage.setItem('USER_NAME',value);
        var dialog = document.getElementById("logindialog");
        dialog.close();
        loadData();
    }else{
        alert("Username cannot be empty");
    }
}

function loadData() {
    for(i=1;localStorage.getItem(i) !=null;i++){
        var value = JSON.parse(localStorage.getItem(i));
        var row = document.createElement('div');
        document.getElementById('results').appendChild(row);
        if(value.picture!=null){
            row.innerHTML =
                "user: " + value.userid +
                "<p>"+"text id:"+value.textid +
                "<p>"+"text: "+ value.text +
                //"<p><img src='"+value.picture+"'></img>"+
                "<p></p><a href=\"javascript:;\" class=\"picCheck\"><img src=\"${"+value.picture+"}\"></a></p>"+
                "<p> <form id=\"form\" onsubmit=\"onSubmit()\">\n" +
                "  <p hidden><input  name=\"userid\" value="+sessionStorage.getItem("USER_NAME")+"></p>\n" +
                "  <p hidden><input  name=\"textid\" value="+value.textid+"></p>\n" +
                "     <p><select name=\"ratings\">\n" +
                "      <option value =\"4\">Very like</option>\n" +
                "      <option value =\"3\">like</option>\n" +
                "      <option value =\"2\">ok</option>\n" +
                "      <option value=\"1\">dislike</option>\n" +
                "      <option value=\"0\">hate</option>\n" +
                "    </select>" +
                "  <button id=\"send\">send</button></p>" +
                "</form></p>"+
                "</div>";
        }else{
            row.innerHTML =
                "user: " + value.userid +
                "<p>"+"text id:"+value.textid +
                "<p>"+"text: "+ value.text +
                "<p> <form id=\"#\" onsubmit=\"onSubmit()\">\n" +
                "  <p hidden><input  name=\"userid\" id='userid' value="+sessionStorage.getItem("USER_NAME")+"></p>\n" +
                "  <p hidden><input  name=\"textid\" value="+value.textid+"></p>\n" +
                "     <p><select name=\"ratings\">\n" +
                "      <option value =\"0\">hate</option>\n" +
                "      <option value =\"1\">dislike</option>\n" +
                "      <option value =\"2\">ok</option>\n" +
                "      <option value=\"3\">like</option>\n" +
                "      <option value=\"4\">Very like</option>\n" +
                "    </select>" +
                "  <button id=\"send\">send</button></p>" +
                "</form></p>"+
                "</div>";
        }

    }
}

function onSubmit() {
    const socket = io.connect("http://localhost:8081");
    $("#send").click(function () {
       let message = $("userid").val().trim();
       socket.emit("sendToServer",message);
    });

    socket.on("sendToClient",message=>{
        console.log(message);
    });
}

function uploadJSON() {
    //this method read JSON files contain story information and store its content to Local storage and database
    var inputElement = document.getElementById("JSONFile");
    inputElement.addEventListener("change",hanleFIles,false);
    function handleFiles() {
        var selectedFile = document.getElementById("JSONFile").files[0];
        var reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = function () {
            //let json = JSON.parse(this.result);
            localStorage.setItem(localStorage.length+1,this.result);
        }
    }
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
    if (document.getElementById('offlinelabel')!=null)
        document.getElementById('offlinelabel').style.display='block';
}

function hideOfflineWarning() {
    if (document.getElementById('offlinelabel')!=null)
        document.getElementById('offlinelabel').style.display='none';
}