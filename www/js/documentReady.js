//run the following when the DOM has finished loading:
$(document).ready(function() {
	app.updateMyRewardsCount();
	logWindowDimensions();
	boobyTrap();
}); //closes onDocumentReady

//boobyTrap sets listeners in place for click events
function boobyTrap(){
	$('#console').html("this is the console!");
	$(".useBox").click(function() {
		console.log('a useButton has been clicked');

		var clickedRewardID = $(this).closest('.oneReward').attr('id');
		console.log("it was "+ clickedRewardID);
		
		var restaurantName = $("#" + clickedRewardID + " li .restaurantName").html();
		console.log ("the restaurant name is "+ restaurantName);
		
		var creditOnGiftcard = $("#" + clickedRewardID + " li .dollarValue").html();
		console.log ("the amount of money on the card is "+ creditOnGiftcard);
		
		app.showGiftcard(restaurantName, creditOnGiftcard);
	}); //closes .useBox click
	
	$(".getButton").click(function() { //if the GET (reward) button is clicked,
		console.log('a get button has been clicked');
		
		var clickedAvailableRewardID = $(this).closest('.oneAvailableReward').attr('id');
		console.log("it was "+ clickedAvailableRewardID);
		
		var coinsNeeded = $("#" + clickedAvailableRewardID + " li .availableCoinCost").html();
		console.log ("this reward costs "+ coinsNeeded + " coins.");
		
		var userCoins = $("#numberOfCoins").html();
		console.log ("user has "+ userCoins +" coins.");
		
		if (userCoins<coinsNeeded){
			//epic fail :(
			/*alert("you need " + (coinsNeeded-userCoins) +" more coins for this reward!");*/
			window.app.showModal();
			console.log ("user doesn't have enough coins.");
		}
		else{
			//success!
			console.log("user has enough coins.");
		} //closes else		
	}); //closes .getButton click
	
	
	$$('.app').doubleTap(function() {
    	// affects "span" children/grandchildren
    	alert('double');
    	app.scan();
	});	
	
}// closes boobyTrap()

//log to the console the dimensions of the browser
function logWindowDimensions (){
	window.onresize=function(){
		console.log (document.documentElement.clientHeight);
	};
}//closes logWindowDimensions()


		
