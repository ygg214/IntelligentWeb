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
    }
    sendAjaxQuery('/post',data);
    event.preventDefault();
}

function storeCachedData(data) {
    localStorage.setItem(data.textid,JSON.stringify(data));
}

function uploadPicture(){
    var formData=new FormData();
    //将文件信息追加到其中
    formData.append('file',file.files[0]);
    //利用split切割，拿到上传文件的格式
    var src=file.files[0].name, formart=src.split(".")[1];
    //使用if判断上传文件格式是否符合
    if(formart=="jpg"||formart=="png"){
        //只有满足以上格式时，才会触发ajax请求
        $.ajax({
            url: '/post',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //上传成功之后，返回对象data
                if (data.code > 0) {
                    var src = data.data;
                    //利用返回值src 网络路径，来实现上传文档的下载
                    //所有的图片格式
                    msg = `<a href="javascript:;" class="picCheck"><img src="${src}"></a>`;
                    // 这里将msg 追加到你要显示的区域
                    document.getElementById('picture').value = JSON.stringify(src);
                }
            }
        })
        //不满足上传格式时
    }else{
        alert("incorrect type of file")
    }
}

