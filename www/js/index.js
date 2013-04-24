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
    //new one, changing the div background if scan is succesful
    scan: function() {
        window.plugins.barcodeScanner.scan( 
        	function(result) { //callback
        		$('#console').html('scan successful!');
        	    app.plusOneCoin();
        	    app.cheese();

        	}, 
        	function(error) { //callback
            	alert("error");
        	}
        );  
    },
    
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
	
	plusOneCoin: function (){
		elixir.userCoins++;
		console.log ("coin added. new number of coins is " + elixir.userCoins)
	},
	
	updateCoins: function(){
		$('#numberOfCoins').html(elixir.userCoins);
		console.log ('number of coins synced');
	},


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
