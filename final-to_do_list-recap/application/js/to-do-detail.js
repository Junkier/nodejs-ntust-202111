$(function(){

    $("#save-btn").click(updateToDoItem);


    $("#delete-btn").click(function(){
        var to_do_id  = $("#to-do-id").val();
        var doubleCheck = confirm("您確定刪除 "+ to_do_id +" 待辦細項 ?");

        if(doubleCheck) deleteToDoItem(to_do_id);
    });


    var updateMode = location.href.split("?").length === 2;

    if(updateMode) getToDoDetail();

});


function getPayload(){
    var subject         = $("#subject").val();
    var reserved_time   = $("#reservation-time").val();
    var modified_time   = $("#de-created-time").text();
    var brief           = $("#brief").val();

    var level = $("#level").find("i")
                .get()
                .map(function(ele){  return $(ele).css("font-weight" ) })
                .filter(function(w){ return Number(w) === 600; })
                .length;

    var author    = $("#author").val();
    var content   = $("#content").val();
    var to_do_id  = $("#to-do-id").val();

    return {
        to_do_id,
        subject,
        reserved_time,
        modified_time,
        brief,
        level,
        author,
        content,
    };
};

function checkPayloadFormat(payload){


    var errMsg = "";

    if(payload.subject.length===0)                   errMsg += "* 請輸入主題 !\n";
    if(payload.reserved_time.length===0)             errMsg += "* 請選擇預定時間 !\n";
    if(payload.brief.length===0)                     errMsg += "* 請輸入簡介 !\n";
    if(payload.level === 0)                          errMsg += "* 重要程度 請至少選 1 !\n";
    if(!payload.author || payload.author.length===0) errMsg += "* 請選擇撰寫者 !\n";

    if(errMsg.length >0){
        alert(errMsg);
        return;
    };


    return true;

     
};


function getToDoDetail(){

    var to_do_id  = location.href.split("=")[1];
    
    // 設定上 DOM 資料
    $("#title-to-do-id").text(`${to_do_id} 細項`);
    $("#to-do-id").val(to_do_id);

    axios.get("/to-do-list/detail/"+to_do_id)
         .then(function(response){
             var data = response.data.result;
             if(!data) return;

             $("#subject").val(data["subject"]);
             $("#reservation-time").val(data["reserved_time"]);
             $("#brief").val(data["brief"]);

             $("#level i").slice(0,data["level"]).css({"font-weight":600});
             LEVEL_SIGNAL = data["level"];
            
             $("#author").val(data["author"]);
             $("#content").val(data["content"]);
         })
         .catch(function(err){
            if(err.response && err.response.status === 404){
                alert("找不到該 API !");
                return;
            };
         });
};



function updateToDoItem(){
    var payload = getPayload();

    var isCreatedMode = location.href.split("?").length === 1;
    var mode = isCreatedMode ? "create" : "edit";

    var isValid = checkPayloadFormat(payload);

    if(!isValid) return;

    if(isCreatedMode) payload["attachments"] = [ 
        null, null, null, null, null, null
    ];

    axios.post("/to-do-list/detail/"+payload["to_do_id"], payload)
         .then(function(response){
             if(response.data.message === "ok."){
                 alert("更新完成！");
                 location.href = "/to-do-list/page/list";
             };
         })
         .catch(function(err){
            if(err.response && err.response.status === 404){
                alert("找不到該 API !");
                return;
            };
         });
};



function deleteToDoItem(to_do_id){

    axios.delete("/to-do-list/detail/"+to_do_id)
         .then(function(response){
             if(response.data.message === "ok."){
                 alert("刪除完成！");
                 location.href = "/to-do-list/page/list";
             };
         })
         .catch(function(err){
            if(err.response && err.response.status === 404){
                alert("找不到該 API !");
                return;
            };
         });
};



