var youngjae_ig = "333cyj333";
var jayb_ig = "jaybnow.hr";
var coco_ig = "b_ftaq";
var h1ghr_ig = "h1ghrmusic";
var sublime_ig = "sublimeartist";
var jinyoung_ig = "jinyoung_0922jy";
var mark_ig = "marktuan";
var markjin_ig = "markjin";

$(document).ready(function () {
    $('.carousel').carousel({
        interval: 60000
    })
    $(".select2").select2({
        tags: true
    });
    $('.loading').css("display", "none");
    //Set height
    var post = $('#card-post').height();
    var story = $('#card-story').height();
    var arr_card_0 = [post, story];
    var max_height_0 = Math.max.apply(Math, arr_card_0);
    $('#card-post').height(max_height_0);
    $('#card-story').height(max_height_0);


    var special = $('#card-special').height();
    var reel = $('#card-reel').height();
    var arr_card = [special, reel];
    var max_height = Math.max.apply(Math, arr_card);
    $('#card-special').height(max_height);
    $('#card-reel').height(max_height);



    //Post
    $('.btn-post').on('click', function () {
        var numpost = $(this).attr("num-post") - 1;
        var username = $(this).attr("username");
        var linkUrl = `/getJson/${username}/${numpost}`;

        var datatype = "post";
        checkDataExist(datatype, username, numpost, linkUrl);

    });

});

//Post Other
$('.btn-post-other').on('click', function () {
    var numpost = $(this).attr("num-post") - 1;
    numpost = parseInt(numpost);
    var fromusername = $('#post-other-from-username').val();
    if (fromusername == null || fromusername.length <= 0) {
        alert("เลือกไอจี username ที่ต้องการ");
        $('#post-other-from-username').focus();
        return;
    }
    //check rdo btn
    var youngjae = $('#rdoNamePost1:checked').val();
    var jayb = $('#rdoNamePost2:checked').val();
    var coco = $('#rdoNamePost3:checked').val();
    var h1ghr = $('#rdoNamePost4:checked').val();
    var sublime = $('#rdoNamePost5:checked').val();
    var jinyoung = $('#rdoNamePost6:checked').val();
    var mark = $('#rdoNamePost7:checked').val();
    var markjin = $('#rdoNamePost8:checked').val();

    if (youngjae == "on") {
        var linkUrl = `/getJsonOther/${youngjae_ig}/${fromusername}/${numpost}`;
        //PostAjax(linkUrl);
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (jayb == "on") {
        var linkUrl = `/getJsonOther/${jayb_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
        // PostAjax(linkUrl);
    } else if (coco == "on") {
        var linkUrl = `/getJsonOther/${coco_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (h1ghr == "on") {
        var linkUrl = `/getJsonOther/${h1ghr_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (sublime == "on") {
        var linkUrl = `/getJsonOther/${sublime_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (jinyoung == "on") {
        var linkUrl = `/getJsonOther/${jinyoung_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (mark == "on") {
        var linkUrl = `/getJsonOther/${mark_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);
    } else if (markjin == "on") {
        var linkUrl = `/getJsonOther/${markjin_ig}/${fromusername}/${numpost}`;
        var datatype = "post";
        checkDataExist(datatype, fromusername, numpost, linkUrl);

    } else {
        alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
        $('input[name="customRadioInline1"]').focus();
        return;
    }

});


//Story
$('.btn-story').on('click', function () {
    var username = $(this).attr("username");
    var numpost = $('.input-story-num[username="' + username + '"]').val();
    console.log(username, numpost);
    if (numpost != null || numpost.length > 0) {
        var linkUrl = `/p/getstory/${username}/${numpost}`;
        var datatype = "story";
        checkDataExist(datatype, youngjae_ig, numpost, linkUrl);
    } else {
        alert("เลือกสตอรี่");
        $('.input-story-num[username="' + username + '"]').focus();
        return;
    }
});


//Story Other
$('#btn-story-other').on('click', function () {
    // if (confirm('ต้องการโพสต์สตอรี่ใช่หรือไม่?')) {
    var fromusername = $('#story-other-username').val();
    var numpost = $('#story-other-numpost').val() - 1;
    if (numpost != null) {
        //check rdo btn
        numpost = parseInt(numpost);
        var youngjae = $('#rdoNameStory1:checked').val();
        var jayb = $('#rdoNameStory2:checked').val();
        var coco = $('#rdoNameStory3:checked').val();
        var jinyoung = $('#rdoNameStory4:checked').val();
        var mark = $('#rdoNameStory5:checked').val();
        var markjin = $('#rdoNameStory6:checked').val();
        if (youngjae == "on") {
            var linkUrl = `/getStoryOther/${youngjae_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (jayb == "on") {
            var linkUrl = `/getStoryOther/${jayb_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (coco == "on") {
            var linkUrl = `/getStoryOther/${coco_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (jinyoung == "on") {
            var linkUrl = `/getStoryOther/${jinyoung_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (mark == "on") {
            var linkUrl = `/getStoryOther/${mark_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (markjin == "on") {
            var linkUrl = `/getStoryOther/${markjin_ig}/${fromusername}/${numpost}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else {
            alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
            $('input[name="rdoInlineStory"]').focus();
            return;
        }
    } else {
        alert("เลือกสตอรี่");
        $('#story-other-numpost').focus();
        return;
    }
    // }
});

//REEL
$('#btn-reel-cyj').on('click', function () {
    // if (confirm('ต้องการโพสต์ Reel ใช่หรือไม่?')) {
    var code = $('#reel-code-cyj').val();
    if (code != null) {
        var linkUrl = `/getReel/${youngjae_ig}/${code}`;
        // PostAjax(linkUrl);
        checkDataExist(code, youngjae_ig, "-", linkUrl);
    } else {
        alert("ระบุ code reel");
        $('#reel-code-cyj').focus();
        return;
    }
    // }
});
$('#btn-reel-jayb').on('click', function () {
    // if (confirm('ต้องการโพสต์ Reel ใช่หรือไม่?')) {
    var code = $('#reel-code-jayb').val();
    if (code != null) {
        var linkUrl = `/getReel/${jayb_ig}/${code}`;
        // PostAjax(linkUrl);
        checkDataExist(code, jayb_ig, "-", linkUrl);
    } else {
        alert("ระบุ code reel");
        $('#reel-code-jayb').focus();
        return;
    }
    // }
});
$('#btn-reel-coco').on('click', function () {
    // if (confirm('ต้องการโพสต์ Reel ใช่หรือไม่?')) {
    var code = $('#reel-code-coco').val();
    if (code != null) {
        var linkUrl = `/getReel/${youngjae_ig}/${code}`;
        // PostAjax(linkUrl);
        checkDataExist(code, youngjae_ig, "-", linkUrl);
    } else {
        alert("ระบุ code reel");
        $('#reel-code-coco').focus();
        return;
    }
    // }
});

$('#btn-reel-jinyoung').on('click', function () {
    var code = $('#reel-code-jinyoung').val();
    if (code != null) {
        var linkUrl = `/getReel/${jinyoung_ig}/${code}`;
        checkDataExist(code, jinyoung_ig, "-", linkUrl);
    } else {
        alert("ระบุ code reel");
        $('#reel-code-jinyoung').focus();
        return;
    }
});

$('#btn-reel-mark').on('click', function () {
    var code = $('#reel-code-mark').val();
    if (code != null) {
        var linkUrl = `/getReel/${mark_ig}/${code}`;
        checkDataExist(code, mark_ig, "-", linkUrl);
    } else {
        alert("ระบุ code reel");
        $('#reel-code-mark').focus();
        return;
    }
});


$('#btn-reel-other').on('click', function () {
    var fromusername = $('#reel-fromusername').val();
    var code = $('#reelOtherCode').val();
    if (fromusername != null && code != null) {
        var youngjae = $('#rdoNameReel1:checked').val();
        var jayb = $('#rdoNameReel2:checked').val();
        var jinyoung = $('#rdoNameReel3:checked').val();
        var mark = $('#rdoNameReel4:checked').val();
        var markjin = $('#rdoNameReel5:checked').val();
        if (youngjae == "on") {
            var linkUrl = `/getReelOther/${fromusername}/${youngjae_ig}/${code}`;
            // PostAjax(linkUrl);
            checkDataExist(code, fromusername, "-", linkUrl);
        } else if (jayb == "on") {
            var linkUrl = `/getReelOther/${fromusername}/${jayb_ig}/${code}`;
            // PostAjax(linkUrl);
            checkDataExist(code, fromusername, "-", linkUrl);
        } else if (jinyoung == "on") {
            var linkUrl = `/getReelOther/${fromusername}/${jinyoung_ig}/${code}`;
            checkDataExist(code, fromusername, "-", linkUrl);
        } else if (mark == "on") {
            var linkUrl = `/getReelOther/${fromusername}/${mark_ig}/${code}`;
            checkDataExist(code, fromusername, "-", linkUrl);
        } else if (markjin == "on") {
            var linkUrl = `/getReelOther/${fromusername}/${markjin_ig}/${code}`;
            checkDataExist(code, fromusername, "-", linkUrl);
        } else {
            alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
            $('input[name="rdoReelOther"]').focus();
            return;
        }
    } else {
        alert("ระบุข้อมูลให้ครบถ้วน");
        $('#reel-fromusername').focus();
        return;
    }
});

//SOME MEDIA
$('#btn-some-media').on('click', function () {
    var fromusername = $('#some-from-usrename').val();
    var numpost = $('#some-media-numpost').val();
    var numpost_list = $('#some-numpostlist').val().trim().split(",");
    // if (confirm('ต้องการโพสต์ใช่หรือไม่?')) {
    var new_numpost_list = [];
    for (var i = 0; i < numpost_list.length; i++) {
        var num = numpost_list[i];
        var newnum = parseInt(num) - 1;
        new_numpost_list.push(newnum);
    }
    if (fromusername != null && numpost != null) {
        numpost = parseInt(numpost) - 1;
        var youngjae = $('#rdospsomemedia1:checked').val();
        var jayb = $('#rdospsomemedia2:checked').val();
        var jinyoung = $('#rdospsomemedia3:checked').val();
        var mark = $('#rdospsomemedia4:checked').val();
        var markjin = $('#rdospsomemedia5:checked').val();
        console.log(jayb);
        if (youngjae == "on") {
            var linkUrl = `/getJsonSomeOther/${fromusername}/${youngjae_ig}/${numpost}/${new_numpost_list}`;
            // PostAjax(linkUrl);
            var datatype = "post";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (jayb == "on") {
            var linkUrl = `/getJsonSomeOther/${fromusername}/${jayb_ig}/${numpost}/${new_numpost_list}`;
            // PostAjax(linkUrl);
            var datatype = "post";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (jinyoung == "on") {
            var linkUrl = `/getJsonSomeOther/${fromusername}/${jinyoung_ig}/${numpost}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (mark == "on") {
            var linkUrl = `/getJsonSomeOther/${fromusername}/${mark_ig}/${numpost}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else if (markjin == "on") {
            var linkUrl = `/getJsonSomeOther/${fromusername}/${markjin_ig}/${numpost}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, numpost, linkUrl);
        } else {
            alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
            $('input[name="rdoSpecialSomePost"]').focus();
            return;
        }
    } else {
        alert("ระบุข้อมูลให้ครบถ้วน");
        $('#some-media-numpost').focus();
        return;
    }
    // }
});

//MERGE MEDIA
$('#btn-merge-media').on('click', function () {
    var fromusername = $('#merge-media-from-usrename').val();

    var numpost_list = $('#mergepost-numpostlist').val().trim().split(",");
    // if (confirm('ต้องการโพสต์ใช่หรือไม่?')) {
    var new_numpost_list = [];
    for (var i = 0; i < numpost_list.length; i++) {
        var num = numpost_list[i];
        var newnum = parseInt(num) - 1;
        new_numpost_list.push(newnum);
    }
    if (fromusername != null && new_numpost_list != null) {
        //numpost = parseInt(numpost_list) - 1;
        var youngjae = $('#rdospmergedia1:checked').val();
        var jayb = $('#rdospmergedia2:checked').val();
        var jinyoung = $('#rdospmergedia3:checked').val();
        var mark = $('#rdospmergedia4:checked').val();
        var markjin = $('#rdospmergedia5:checked').val();
        console.log(jayb);
        if (youngjae == "on") {
            var linkUrl = `/getJsonMergeOther/${fromusername}/${youngjae_ig}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, new_numpost_list[0], linkUrl);
        } else if (jayb == "on") {
            var linkUrl = `/getJsonMergeOther/${fromusername}/${jayb_ig}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, new_numpost_list[0], linkUrl);
        } else if (jinyoung == "on") {
            var linkUrl = `/getJsonMergeOther/${fromusername}/${jinyoung_ig}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, new_numpost_list[0], linkUrl);
        } else if (mark == "on") {
            var linkUrl = `/getJsonMergeOther/${fromusername}/${mark_ig}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, new_numpost_list[0], linkUrl);
        } else if (markjin == "on") {
            var linkUrl = `/getJsonMergeOther/${fromusername}/${markjin_ig}/${new_numpost_list}`;
            var datatype = "post";
            checkDataExist(datatype, fromusername, new_numpost_list[0], linkUrl);
        } else {
            alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
            $('input[name="rdoSpecialMergePost"]').focus();
            return;
        }
    } else {
        alert("ระบุข้อมูลให้ครบถ้วน");
        $('#merge-media-from-usrename').focus();
        return;
    }
    // }
});


//STORY MERGE
$('#btn-story-merge').on('click', function () {

    var numpost_list = $('#story-merge-postnum-start').val().trim().split(",");
    var post_arrary = [];
    for (var i = 0; i < numpost_list.length; i++) {
        var num = numpost_list[i];
        var newnum = parseInt(num) - 1;
        post_arrary.push(newnum);
    }

    //var postnum_end = $('#story-merge-postnum-end').val();
    // if (confirm('ต้องการโพสต์ใช่หรือไม่?')) {
    if (post_arrary != null) {
        // postnum_start = parseInt(postnum_start) - 1;
        // postnum_end = parseInt(postnum_end) - 1;
        var fromusername = $('#story-merge-fromusername').val();
        var youngjae = $('#rdospstorymerge1:checked').val();
        var jayb = $('#rdospstorymerge2:checked').val();
        var jinyoung = $('#rdospstorymerge3:checked').val();
        var mark = $('#rdospstorymerge4:checked').val();
        var markjin = $('#rdospstorymerge5:checked').val();
        if (youngjae == "on") {
            var linkUrl =
                `/p/getstoryother/merge/${fromusername}/${youngjae_ig}/${post_arrary}`;
            // PostAjax(linkUrl);
            var datatype = "story";
            checkDataExist(datatype, fromusername, post_arrary[0], linkUrl);
        } else if (jayb == "on") {
            var linkUrl =
                `/p/getstoryother/merge/${fromusername}/${jayb_ig}/${post_arrary}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, post_arrary[0], linkUrl);
        } else if (jinyoung == "on") {
            var linkUrl =
                `/p/getstoryother/merge/${fromusername}/${jinyoung_ig}/${post_arrary}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, post_arrary[0], linkUrl);
        } else if (mark == "on") {
            var linkUrl =
                `/p/getstoryother/merge/${fromusername}/${mark_ig}/${post_arrary}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, post_arrary[0], linkUrl);
        } else if (markjin == "on") {
            var linkUrl =
                `/p/getstoryother/merge/${fromusername}/${markjin_ig}/${post_arrary}`;
            var datatype = "story";
            checkDataExist(datatype, fromusername, post_arrary[0], linkUrl);
        } else {
            alert("เลือกแอคทวิตเตอร์ที่ต้องการโพสต์");
            $('input[name="rdoSpecialMergePost"]').focus();
            return;
        }
    } else {
        alert("ระบุข้อมูลให้ครบถ้วน");
        $('#story-merge-postnum-start').focus();
        return;
    }

});

//Youtube Post
$('#btn-youtube').on('click', function () {
    console.log("youtube-function")
    var youtube_code = $('#youtube-code').val();
    var username = $('input[name="rdoYoutubePost"]:checked').attr('username');
    var youtubetype = $('input[name="rdoYoutubeType"]:checked').attr('youtubetype');
    if (username.length > 0 && youtube_code.length > 0) {
        console.log("sucess");
        var linkUrl = `/postyoutube/${youtube_code}/${youtubetype}/${username}`;
        var datatype = "youtube";
        checkDataExist(datatype, username, youtube_code, linkUrl);
    } else {
        alert("ระบุข้อมูลให้ครบถ้วน");
        $('input[name="rdoYoutubePost"]').focus();
        return;
    }

});

function PostAjax(linkUrl) {
    $('.loading').css("display", "");
    // $('#btn-loadmodal').click();
    $.ajax({
        type: "POST",
        url: linkUrl,
        timeout: 0,
        cache: false,
        crossDomain: true,
        success: function (msg) {
            // $('#modal-loading').modal('hide');
            var strmsg = JSON.stringify(msg);
            $('.loading').css("display", "none");
            console.log(strmsg.substring(0, 200))
            alert("Tweeted!");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // $('#modal-loading').modal('hide');
            $('.loading').css("display", "none");
            alert(textStatus, errorThrown);

        }
    });
}

function PostCheckExist(checkExistUrl, linkUrl) {
    $('.loading').css("display", "");
    // $('#btn-loadmodal').click();

    $.ajax({
        type: "POST",
        url: checkExistUrl,
        timeout: 0,
        cache: false,
        crossDomain: true,
        success: function (result) {
            // $('#modal-loading').modal('hide');
            console.log(result);
            $('.loading').css("display", "none");
            if (result.data > 0) {
                confirm_text = `มีการโพสต์แล้ว ${result.data} ครั้ง ต้องการโพสต์ซ้ำใช่หรือไม่?`;
            } else {
                confirm_text = "ต้องการโพสต์รูปใช่หรือไม่?";
            }
            console.log(confirm_text);
            if (confirm(confirm_text)) {
                PostAjax(linkUrl);
            }
            // $('.loading').css("display", "none");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // $('#modal-loading').modal('hide');
            $('.loading').css("display", "none");
            alert(textStatus, errorThrown);
        }
    });



}

function checkDataExist(datatype, username, numpost, linkUrl) {
    //check exist
    var checkExistUrl = `/checkExist/${datatype}/${username}/${numpost}`;
    var confirm_text = "";
    PostCheckExist(checkExistUrl, linkUrl);
}