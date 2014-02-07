$(document).ready(function() {
	$('.refreshbtn').click(function(e) {
		console.log("hi");
		e.preventDefault();
		$(this).closest(".friend").remove();
	});
})

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
	    $("#friends").append("<div class='friend'><div class='img-wrap'><img width='300px' height='400px' src='http://upload.wikimedia.org/wikipedia/commons/6/66/J._C._R._Licklider.jpg'><div class='img-overlay'><h3 class='name'>Dave <button width=100% type='button' class='btn btn-success refreshbtn'><i class='fa fa-leaf fa-1x'></i></button></h3></div></div</div>");                      
	  }
	});
});