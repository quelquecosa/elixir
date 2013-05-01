/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');         
    },
     /*
    original ('default') scan function. freezes up on success, maybe its the alert.
    scan: function() {
        window.plugins.barcodeScanner.scan( function(result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        }, function(error) {
            alert("Scanning failed: " + error);
        });
    },
    */
    //scan. if succesful, add one coin and show the animation
    scan: function() {
        window.plugins.barcodeScanner.scan( 
        	function(result) { //callback
        		if (result.text == 01248166){
        			$('#console').html(result.text);
        	    	app.plusOneCoin();
        	    	app.cheese();
        		}
        		else{
        			$('#console').html("scan detected, wrong barcode");
        		}
        	}, 
        	function(error) { //callback
            	alert("error");
            	('#console').html('scan unsuccesful!');
        	}
        );  
    },
    
    //cheese is the animation for when user gets a sucessful scan ('coronation')
    cheese: function () {		
		$('.cheese').transition({ 
			y: '-400px'
		});
		$('.cheese').transition({ 
			delay: '100' 
		});
		$('.cheese').transition({ 
			rotateY: '180deg' 
		});
		$('.cheese').transition({ 
			delay: '500'
		});		
		$(".cheese").transition({ 
			y: '-2000px' 
		}, 
			function(){ //this is a callback function
				//plays sound defined in html <audio>
				document.getElementById("sound").play();
				app.updateCoins();
			}
		);
		$('.cheese').transition({y: '2400px'});
	},
	
	//adds one coin to the coin count
	plusOneCoin: function (){
		elixir.userCoins++;
		console.log ("coin added. new number of coins is " + elixir.userCoins)
	},
	
	//sync number of coins with database
	updateCoins: function(){
		$('#numberOfCoins').html(elixir.userCoins);
		console.log ('number of coins synced');
	},
	
	//when the user clicks on the RewardsYouCanGet button (nav bar), the page description changes and new content is loaded.
	loadRewardsYouCanGet: function(){
		$('#pageDescription').html('Rewards you can get:');
		$.get('./rewardsYouCanGet.html', function(data) {
  			$('#rewardsContainer').replaceWith(data);
  			console.log('ajax for rewardsYouCanGet worked!');
  			$('#myRewardsButtonImage').attr("src","img/myRewardsButtonImage.png");
  			$('#myCoinsButtonImage').attr("src","img/myCoinsButtonImageActive.png");
		});
		console.log ('loaded RewardsYouCanGet');
	},
	
	//same as above but for MyRewards instead
	loadMyRewards: function(){
		$('#pageDescription').html('Your rewards:');
		
		$.get('./yourRewards.html', function(data) {
  			$('#availableRewardsContainer').replaceWith(data);
  			console.log('ajax for rewardsYouCanGet worked!');
  			$('#myCoinsButtonImage').attr("src","img/myCoinsButtonImage.png");
  			$('#myRewardsButtonImage').attr("src","img/myRewardsButtonImageActive.png");
		});
		console.log ('loaded availableRewardsContainer');

	},
	
	//same as above but for MyRewards instead
	showGiftcard: function(){
		$(".app").css( "opacity", "0" );
		$('#giftcardContainer').transition({ y: '-630px' });
		document.getElementById('#giftcardContainer').focus();

	},

	//not sure what this does, it came with phoneGap's emptyExample
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
