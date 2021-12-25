var changeErrMsgState = function(msg){
    $("#err-message").text(msg);
};

$(function(){

    $(".login input").keyup(function(){
        changeErrMsgState("");
    });

    $("#login-btn").click(function(){
        var account = $("#account").val();
        var passwd  = $("#passwd").val();


        axios.post("/auth",{ account , passwd })
             .then(function(res){
                var message = res.data.message;
                changeErrMsgState(message);

                if(res.data.redirect) location.href= res.data.redirect;
             })
             .catch(function(err){
                 var message = err.response.data.message;
                 changeErrMsgState(message);
             });
    });
});