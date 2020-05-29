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
            alert('Error' + error.message);
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

/*function changeImg() {
    var form = $("#img_form");
    var options = {
        url:domain + '/upload/img',
        type:'post',
        success:function (data) {
            data = JSON.parse(data);
            if(data.code==0){
                imgUrl = data.data.url;
            }else{
                alert('No photo uploaded');
            }
        }
    };
    form.ajaxSubmit(options);

    var file = $('.photo').find('input')[0].files[0];
    var reader = new FileReader();
    reader.onload = function (ev) {
        var imgFile = ev.target.result;
        $('.photo-img').attr('src',imgFile);
        $('.photo-img').attr('style','display:block');
    }
    reader.readAsDataURL(file);
}*/


function onSubmit() {
    var formArray = $("form").serializeArray();
    var data = {};
    var id = localStorage.length;
    for (index in formArray){
        data[formArray[index].name]=formArray[index].value;
        data.textid = id + 1;
        data.userid = sessionStorage.getItem("USER_NAME");
    }
    sendAjaxQuery('/post',data);
    event.preventDefault();
}

function storeCachedData(data) {
    localStorage.setItem(data.textid,JSON.stringify(data));
}

function uploadPicture(){
    var formData=new FormData();
    //read information
    formData.append('file',file.files[0]);
    var src=file.files[0].name, formart=src.split(".")[1];
    //judge file format
    if(formart=="jpg"||formart=="png"){
        $.ajax({
            url: '/post_pic',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //return data after uploading
                if (data.code > 0) {
                    var src = data.data;
                    //msg = `<a href="javascript:;" class="picCheck"><img src="${src}"></a>`;
                    //
                    document.getElementById('picture').value = JSON.stringify(src);
                }
            }
        })
        //不满足上传格式时
    }else{
        alert("incorrect type of file")
    }
}

