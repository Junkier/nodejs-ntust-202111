$(function(){

    LEVEL_SIGNAL=0;

    init();

    getImages();

});


function uploadImageEvent(e){

    if(!$(this).hasClass("upload-image")) return;

    var $fileInput = $(this).find("input[type='file']")[0];
    $fileInput.click();
};

function changeImageEvent(e){

    var $this = $(this);
    var $parent = $this.parents("div.upload-image");
    var index    = $parent.attr("index");

    e.preventDefault();

    var formData = new FormData();

    formData.append("attachment", e.target.files[0]);

    axios({
        method : 'POST',
        url    : '/images?to_do_id='+$("input#to-do-id").val() + '&index='+index,
        data   : formData,
    })
    .then(function(res){
        
        var imgUrl  = res.data.fileName;


        $parent.html('<a data-fancybox="gallery" href="/images/'+imgUrl+'">\
            <img src="/images/'+imgUrl+'" class="img-thumbnail attach-images">\
         </a>\
        ');

        $parent.removeClass("upload-image");
        $parent.addClass("text-center");
        
    })
    .catch(function(err){
        console.log(err);
    });

};

function getImages(){

    // Create or update
    var updateMode = location.href.split("?").length === 2;
    if(!updateMode) return;

    var toDoId = $("#to-do-id").val() || location.href.split("=").slice(-1)[0];

    axios.get("/images?to_do_id="+toDoId)
         .then(function(response){
             var data = response.data.result.attachments;
             createImageBlock(data);
         })
         .catch(function(err){
             console.log.apply(err);
         });
};

function createImageBlock(data){

    var attachments_part1 = data.slice(0,3);
    var attachments_part2 = data.slice(3);


    var imagesBlock1 = attachments_part1.map(function(ele,index){
        return `<div class="form-group col-md-3 mx-3 ${ ele ? "text-center" : "upload-image"}" index=${index}>
                    ${
                        ele 
                            ? `<a data-fancybox="gallery" href="/images/${ele}">
                                <img src="/images/${ele}" class="img-thumbnail attach-images">
                              </a>`
                            : `<i class="fas fa-plus"></i><input type="file" class="d-none" accept="image/*">`
                    }
                </div>`;
    }).join("");

    var imagesBlock2 = attachments_part2.map(function(ele,index){
        return `<div class="form-group col-md-3 mx-3 ${ ele ? "text-center" : "upload-image"}" index=${index+3}>
                    ${
                        ele 
                            ? `<a data-fancybox="gallery" href="/images/${ele}">
                                <img src="/images/${ele}" class="img-thumbnail attach-images">
                              </a>`
                            : `<i class="fas fa-plus"></i><input type="file" class="d-none" accept="image/*">`
                    }
                </div>`;
    }).join("");



    var imageBlocks = `<div class="form-group col-md-12 mx-3 d-flex ml-5">
            ${imagesBlock1}
        </div>
        <div class="form-group col-md-12 mx-3 d-flex ml-5">
            ${imagesBlock2}
        </div>`;

    
    $("#attachments").append(imageBlocks);
    $("#attachments").removeClass("d-none");




    //// Customized fancybox
    $.fancybox.defaults.btnTpl.delete = '<button data-fancybox-delete class="fancybox-button fancybox-button--delete" title="title of the icon"><i class="fas fa-trash-alt"></i></button>';

    $.fancybox.defaults.buttons = [
        "zoom",
        "thumbs",
        "delete",
        "close"
    ];


    // Make button clickable using event delegation
    $('body').on('click', '[data-fancybox-delete]', function() {
        
        var ele       = $.fancybox.getInstance().current;
        var $img      = $(ele.$thumb[0]);
        var $parent   = $img.parents("div.text-center");
        var index     = $parent.attr("index");
        var to_do_id  = $("input#to-do-id").val();

        var src     = ele.src;

        
        axios({
            method : 'DELETE',
            url    : '/images',
            data   : {
                to_do_id : to_do_id , 
                src ,
                index , 
            },
        })
        .then(function(_){

            $parent.html('<i class="fas fa-plus"></i><input type="file"  style="display: none;">');

            $parent.removeClass("text-center");
            $parent.addClass("upload-image");

            $(".attachments div.upload-image").off("click");
            $(".attachments div.upload-image").click(uploadImageEvent);

            $(".attachments input[type='file']").off("change");
            $(".attachments input[type='file']").change(changeImageEvent);

            $.fancybox.close();
           
            
        })
        .catch(function(err){
            console.log(err);
        });
        
    });


    //// Attachments upload images
    $(".attachments div.upload-image").click(uploadImageEvent);

    
    // Displaying image
    $(".attachments input[type='file']").change(changeImageEvent);

    
};

function init(){

    //// Sidebar Sliding
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar, #content").toggleClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });


    //// Init datetime picker icon.
    $.fn.datetimepicker.Constructor.Default = $.extend({},
        $.fn.datetimepicker.Constructor.Default,
        { 
            icons: { 
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-arrow-circle-left',
                next: 'fas fa-arrow-circle-right',
                today: 'far fa-calendar-check-o',
                clear: 'fas fa-trash',
                close: 'far fa-times' 
            },
        }
        
    );

    $("#datetimepicker").datetimepicker({
        format: "YYYY-MM-DD HH:mm",
    });



    //// Level signal
    $("#level i").click(function(){

        $("#level i").css({"font-weight":400});

        var value = Number($(this).attr("index")) +1;

        if(LEVEL_SIGNAL === value) return;

        $("#level i").slice(0,value).css({"font-weight":600});
        LEVEL_SIGNAL = value;
    });

    // init level signal
    var initLevel = Number($("#level").attr("value"));
    $("#level i").slice(0,initLevel).css({"font-weight":600});
    LEVEL_SIGNAL = initLevel;


    //// Creating time 
    $("#de-created-time").text(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));


    //// Content
    $("#content").val($("#content").attr("data"));


    //// Author 
    $("#author").val($("#author").attr("value"));


    // Create or update
    var isCreatedMode = location.href.split("?").length === 1;
    if(isCreatedMode){
        // 取得最新的 to-do-id
        axios.get("/to-do-list/the-newest-id")
             .then(function(response){
                var newToDoId = response.data.result;

                $("#title-to-do-id").html(newToDoId+" 細項");
                $("#to-do-id").val(newToDoId);
             })
             .catch(function(err){
                console.log(err);
             });

        $("#delete-btn").prop({ disabled : true});

        $(".attachments").addClass("disabled");
        return;
    };



};
