$(function(){
  
    // 影集資料 查詢
    $("#drama-select-btn").click(function(){

        var type = $("#categories-select").val();

        // Ajax
        $.ajax({
            url  : "/dramas/list?type="+type,
            type : "GET",
            timeout: 10000 // 10 sec
        })
        .then(function(response){
            console.log(response);

            createTable(response["result"]);
        })
        .catch(function(err){
            if(err.status === 404){
                alert("找不到該 API !");
                return;
            };
            alert(err.responseText);
            console.log(err);
        });


    });


    // 影集資料 新增
    $("#drama-insert-btn").click(insertNewRecord);


    // 影集資料 修改
    $("#drama-update-btn").click(updateDramaDetail);


    // 影集資料 刪除
    $("#drama-delete-btn").click(function(){
        var dramaId = $("#id-delete").val();

        if(!dramaId || dramaId.length === 0){
            alert("請輸入影集ID ！");
            return;
        };

        var check = confirm("確定刪除影集編號 : " + dramaId + " 的資料?");

        if(check) deleteDramaDetail(dramaId);
    });

});

let createTable = (data)=>{
    data = data || [
        { category : "犯罪" , name : "絕命毒師" , score : 10 },
        { category : "殭屍" , name : "屍戰朝鮮" , score : 9 },
        { category : "愛情" , name : "想見你"   , score : 8.5 },
    ];
 

    let tableBody = data.map((ele,i)=>`
        <tr>
            <th scope="row">${ele.dramaId}</th>
            <td>${ele.category}</td>
            <td>${ele.name}</td>
            <td>${ele.score} / 10</td>
        </tr>
    `).join("");
    

    $("#drama-select-table tbody").html(tableBody);
};



let insertNewRecord = ()=> {
    let category  = $("#categories-insert option:selected").val(); 
    let name      = $("#name-insert").val();
    let score     = $("#score-insert").val();


    if(!name || name.length === 0){
        alert("請輸入劇名！");
        return;
    };

    if(!score || score.legnth === 0){
        alert("請輸入評價！");
        return;
    };


    $.ajax({
        url  : "/dramas/detail",
        type : "POST",
        data : {
            category,
            name,
            score
        }
    })
    .then(r=>{
        if(r.message === "ok.") alert("新增完成！");
        
    })
    .catch(err=>{
        console.log(err);

        if(err.status === 404){
            alert("找不到該 API !");
            return;
        };
        
        alert("系統有誤 , 請稍後再試！");
    });
};

let updateDramaDetail = function(){
    var dramaId   = $("#id-update").val();
    let name      = $("#name-update").val();
    let score     = $("#score-update").val();


    if(!dramaId || dramaId.length === 0){
        alert("請輸入影集ID ！");
        return;
    };


    if(!name || name.length === 0){
        alert("請輸入劇名！");
        return;
    };

    if(!score || score.legnth === 0){
        alert("請輸入評價！");
        return;
    };


    $.ajax({
        url  : "/dramas/detail/" + dramaId,
        type : "PUT",
        data : { name, score }
    })
    .then(r=>{
        if(r.message === "ok.") alert("修改完成！");
        
    })
    .catch(err=>{
        console.log(err);

        if(err.status === 404){
            alert("找不到該 API !");
            return;
        };
        
        alert("系統有誤 , 請稍後再試！");
    });

};


let deleteDramaDetail = function(dramaId){

    $.ajax({
        url  : "/dramas/detail/" + dramaId,
        type : "DELETE",
    })
    .then(r=>{
        if(r.message === "ok.") alert("刪除完成！");
        
    })
    .catch(err=>{
        console.log(err);

        if(err.status === 404){
            alert("找不到該 API !");
            return;
        };
        
        alert("系統有誤 , 請稍後再試！");
    });
};
