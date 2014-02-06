$(document).ready(function() {
	$('.refreshbtn').click(function(e) {
		console.log("hi");
		e.preventDefault();
		$(this).closest(".friend").remove();
	});
})