$(document).ready(function() {
	$('.refreshbtn').click(function(e) {
		console.log("hi");
		e.preventDefault();
		$(this).closest(".friend").html("<center>MOVE TO BOTTOM</center>");
	});
})


function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}

function OnImageLoad(evt) {

    var img = evt.currentTarget;

    // what's the size of this image and it's parent
    var w = $(img).width();
    var h = $(img).height();
    var tw = $(img).parent().width();
    var th = $(img).parent().height();

    // compute the new size and offsets
    var result = ScaleImage(w, h, tw, th, true);

    // adjust the image coordinates and size
    img.width = result.width;
    img.height = result.height;
    $(img).css("left", result.targetleft);
    $(img).css("top", result.targettop);
}

$(document).on("click", "#addFriend", function(e) {

    bootbox.prompt("Who do you want to add?", function(result) {                
	  if (result === null) {                                             
	    console.log("Prompt dismissed");                              
	  } else {
	  	var name = result;
	  	var picURL = 'http://upload.wikimedia.org/wikipedia/commons/6/66/J._C._R._Licklider.jpg';
	    var friend = {
	    	"name" : name,
	    	"description" : "",
	    	"imageURL" : picURL
	    };
	    console.log(friend);
	    $("#friends").append("<div class='row'> <div class='friend'> <div class='img-wrap' ><img src='https://scontent-b-sjc.xx.fbcdn.net/hphotos-ash4/t1/1185358_694367837243460_875045615_n.jpg' style='width: 200px; height: 200px; overflow: hidden;' onload='OnImageLoad(event);'><div class='description'><h3>Kiki Hui</h3><p>Last Seen: 0 seconds ago</p><button type='button' class='btn btn-success refreshbtn'><i class='fa fa-leaf fa-1x'></i></button></div></div></div></div>");  }
	});
});

$(document).on("click", "#notificationButton", function(e) {
	    console.log("notificationButton pressed!");
	    $("#notifyText").html("hey man, it's been a while! we ought to hang out... hit me up sometime please");                      
});

$(document).on("click", "#addFriendButton", function(e) {   
        var name = $('#add-friend-form #nameField').val();
        console.log("Added " + name); 
        if(name.length > 0) {
            //alert("Added " + name); 
            var json = {
                'name': name
            };
            //alert("Added " + name); 
            $.post('/user/new', json, function() {
                window.location.href = '/home'; // reload the page
            });
        }                
});

$(document).on("click", "#notifyText", function(e) {
	    console.log("text dissapears!");
	    $("#notifyText").text("");                      
});
