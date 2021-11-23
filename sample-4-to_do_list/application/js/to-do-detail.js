$(function(){

    $("#save-btn").click(updateToDoItem);


    $("#delete-btn").click(function(){
        var to_do_id  = $("#to-do-id").val();
        var doubleCheck = confirm("您確定刪除 "+ to_do_id +" 待辦細項 ?");

        if(doubleCheck) deleteToDoItem(to_do_id);
    });

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



function updateToDoItem(){
    var payload = getPayload();

    var toDoId = location.href.split("/").slice(-1)[0] ;

    var mode = toDoId === "create" ? "create" : "edit";


    if(mode === "create") payload["attachments"] = [ 
        null, null, null, null, null, null
    ];


    var isValid = checkPayloadFormat(payload);

    if(!isValid) return;

    axios.put("/to-do-list/detail/"+payload["to_do_id"] + "?mode="+mode , payload)
         .then(function(response){
             if(response.data.message === "ok."){
                 alert("更新完成！");
                 location.href = "/to-do-list/page";
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
                 location.href = "/to-do-list/page";
             };
         })
         .catch(function(err){
            if(err.response && err.response.status === 404){
                alert("找不到該 API !");
                return;
            };
         });
};



