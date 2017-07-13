$(document).ready(function () {


	loadMerch();

	$('.addCredit').on('click', function calcAndDisplayCredit() {
		$('#messageBox > p').text('');
		$('#changeReturnDisplay').text('');
		var creditDisplay = $('#creditDisplay > p').text();
		var currentCredit = parseFloat(creditDisplay.slice(1));
		var addedCredit = parseFloat($(this).attr('id'));
		
		currentCredit += addedCredit;
		
		$('#creditDisplay > p').text('$' + currentCredit.toFixed(2));
		})


	$('#makePurchase').on('click', function vendItem() {
		var creditDisplay = $('#creditDisplay > p').text();
		var currentCredit = parseFloat(creditDisplay.slice(1));
		var slotNum = $('#itemNumEntry').val();

		$.ajax({
			type: 'GET',
			url: 'http://localhost:8081/money/' + currentCredit + '/item/' + slotNum,
			success: function(changePurse) {

				var quarters = changePurse.quarters;
				var dimes = changePurse.dimes;
				var nickels = changePurse.nickels;
				var pennies = changePurse.pennies;

				$('#messageBox > p').text('Thank You!!!');
				$('#creditDisplay > p').text('$0.00');
				$('#merchDisplay > div').remove();
				loadMerch();

				var changeDisplay = '';

				if (quarters > 0) {
					changeDisplay += 'Quarters: ' + quarters + '<br/>';
			}

				if (dimes > 0) {
					changeDisplay += 'Dimes: ' + dimes + '<br/>';
			}

				if (nickels > 0) {
					changeDisplay += 'Nickels: ' + nickels + '<br/>';
			}

				if (pennies > 0) {
					changeDisplay += 'Pennies: ' + pennies + '<br/>';
			}

			$('#changeReturnDisplay').html(changeDisplay);


			//jquery ajax promise error
			},
				error: function(jqXHR, textStatus, errorThrown) {
				if (jqXHR.responseJSON.message != "No message available") {
				$('#messageBox > p').text(jqXHR.responseJSON.message);
			} else {
				$('#messageBox > p').text("Please select an available item.");
				}
			}
		
		})
	})





// $('.merchDiv').on('click', function selectItem() {
// 	var selection = this.id;
// 	$('#itemNumEntry').text(selection);
// })





	$('#changeReturnButton').on('click', function returnChange() {
		var creditDisplay = $('#creditDisplay > p').text();
		var currentCredit = parseFloat(creditDisplay.slice(1)).toFixed(2);
		var pennies = (currentCredit * 100).toFixed(0);

		if (currentCredit > 0) {

			var quarters = parseInt(pennies / 25);
			pennies = pennies % 25;

			var dimes = parseInt(pennies / 10);
			pennies %= 10;

			var nickels = parseInt(pennies / 5);
			pennies %= 5;

			var changeDisplay = '';

			
			if (quarters > 0) {
					changeDisplay += 'Quarters: ' + quarters + '<br/>';
				}

				if (dimes > 0) {
					changeDisplay += 'Dimes: ' + dimes + '<br/>';
				}

				if (nickels > 0) {
					changeDisplay += 'Nickels: ' + nickels + '<br/>';
				}

				if (pennies > 0) {
					changeDisplay += 'Pennies: ' + pennies + '<br/>';
				}

			$('#creditDisplay > p').text('$0.00');
			$('#changeReturnDisplay').html(changeDisplay);
			$('#messageBox > p').text("Don't forget your change!");
		}

	})





	
	});

	
   

	function loadMerch() {
		var merchDisplay = $('#merchDisplay');
	
		$.ajax({
				type: 'GET',
				url: 'http://localhost:8081/items',
				success: function(merchArray) {
					
					$.each(merchArray, function(index, merch) {
						var slotNum = merch.id;
						var name = merch.name;
						var price = merch.price;
						var quantity = merch.quantity;

						var merchandise  = '<div class="buffer col-sm-1"></div>';
							//merchandise += '<div class="form">';
							merchandise += '<input class="btn btn-default merchDiv col-sm-2" id="' + slotNum + '">';
							merchandise += '<div class="slotNumDiv">' + slotNum + '</div>';
							merchandise += '<div class="nameDiv">' + name + '</div>';
							merchandise += '<div class="priceDiv">$' + price + '</div>';
							merchandise += '<div class="quantityDiv">Quantity: ' + quantity + '</div>';
							merchandise += '</input>';
							//merchandise += '</div>';


					merchDisplay.append(merchandise);

					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.responseJSON.message);
				}

		});

	}