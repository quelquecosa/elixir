$(document).ready(function() {
	console.log ('document ready');
	$('#console').html("this is the console!");

	//  put class="doubleTap" on the elements you need to double tap
	$(".app").doubleTap(function(){
		$("#console").html('doubleTap!');
		app.scan();
		});
		$("#pageDescriptionBox").doubleTap(function(){
		$("#console").html('doubleTap!');
		app.scan();
		});
	
	//log to the console the dimensions of the browser
	window.onresize=function(){
	console.log (document.documentElement.clientHeight);
	};
	
	$(".useBox").click(function() {
		console.log('a useButton has been clicked');
		$(this).css('background-color','red');
		
		var clickedRewardID = $(this).closest('.oneReward').attr('id');
		console.log("it was "+ clickedRewardID);
		
		var restaurantName = $("#" + clickedRewardID + " li .restaurantName").html();
		console.log ("the restaurant name is "+ restaurantName);
		
		var creditOnGiftcard = $("#" + clickedRewardID + " li .dollarValue").html();
		console.log ("the amount of money on the card is "+ creditOnGiftcard);
		
		
		app.showGiftcard(restaurantName, creditOnGiftcard);

	});
	
	
});