// Put JavaScript and JQuery for Rent area here

//Rental History Index Section
$("#RentalHistoryIndex").ready(() => {
	//When the mouse pointer enters any row, make the vertical ellipsis menu on that row visible
	$(".row").on("mouseenter", function () {
		$(this).find(".menu button").removeClass("invisible")
	})

	//When the mouse pointer leaves any row, make the vertical ellipsis menu on that row invisible
	//And, if the dropdown menu is open, close it.
	$(".row").on("mouseleave", function () {
		if ($(this).find(".menu").hasClass("show")) {
			$(this).find('.menu button').dropdown('toggle')
		}
		$(this).find(".menu button").addClass("invisible")
	})
})
//End Rental History Index Section

//Rental History Create and Edit Section
$("#RentalHistoryForm").ready(() => {
	//Somehow an ID can be ready if it doesn't even exist on the page...
	//This code leaves the function so an error doesn't occur on the index page.
	if (!$("#RentalHistoryForm").length) { return }

	//Function to change the Damages Incurred label based on the value of the Rental Damaged checkbox.
	var setDamagesIncurredLabel = () => {
		const damaged = $("#RentalDamaged")[0].checked
		$("#DamagesIncurred").parent().find("label").text(damaged ? "Damages Incurred" : "Notes")
	}

	//Set the label of the Rental Damaged checkbox
	$("#RentalDamaged").parent().parent().find("label").text("Damaged?")

	//Create an onchange event for the Rental Damaged checkbox
	$("#RentalDamaged").change(function () { setDamagesIncurredLabel() })

	setDamagesIncurredLabel()
})
//End Rental History Section
// Put JavaScript and JQuery for Rent area here

//Rental History Index Section
$("#RentalHistoryIndex").ready(() => {
	//On load, set the text of the sort button to the text of the active item.
	$("#sort-methods > button").text($("#sort-methods .active").text())

	//After a drop-down item is clicked, set the text of the sort menu button, and sort the items.
	$("#sort-methods .dropdown-item").on("mouseup", function () {
		if (!$(this).hasClass("active")) {
			$("#sort-methods .active").removeClass("active")
			$(this).addClass("active")
			$("#sort-methods > button").text($(this).text())

			//Sort by index (unsorted)
			const indexSortFunc = function (a, b) {
				const i1 = $(a).data("index")
				const i2 = $(b).data("index")
				return (i1 > i2) ? 1 : (i1 < i2) ? -1 : 0
			}

			//Sort damaged-first
			const damagedSortFunc = function (a, b) {
				const i1 = $(a).data("damaged")
				const i2 = $(b).data("damaged")
				return (i1 == 'False' && i2 == 'True') ? 1 : (i1 == 'True' && i2 == 'False') ? -1 : 0
			}

			//Sort undamaged-first
			const undamagedSortFunc = function (a, b) {
				const i1 = $(a).data("damaged")
				const i2 = $(b).data("damaged")
				return (i1 == 'True' && i2 == 'False') ? 1 : (i1 == 'False' && i2 == 'True') ? -1 : 0
			}

			//Sort alphabetically
			const azSortFunc = function (a, b) {
				const i1 = $(a).data("name")
				const i2 = $(b).data("name")
				return (i1 > i2) ? 1 : (i1 < i2) ? -1 : 0
			}

			//Sort reverse alphabetically
			const zaSortFunc = function (a, b) {
				const i1 = $(a).data("name")
				const i2 = $(b).data("name")
				return (i1 < i2) ? 1 : (i1 > i2) ? -1 : 0
			}

			//Detach the list of items from the page
			var items = $("#RentalHistoryIndex .rentalItem").detach()

			//Determine the sort method
			switch ($(this).data("sort")) {
				case ("damaged"): sortFunc = damagedSortFunc; break
				case ("undamaged"): sortFunc = undamagedSortFunc; break
				case ("a-z"): sortFunc = azSortFunc; break
				case ("z-a"): sortFunc = zaSortFunc; break
				case ("index"): sortFunc = indexSortFunc; break;
			}

			//Sort the items based on the determined method
			items.sort(sortFunc)

			//Add the items back to the page
			$("#RentalHistoryIndex").append(items)
		}
	})

	//When the mouse pointer leaves the sort button, unhighlight it.
	$("#sort-methods").on("mouseleave", function () { $(this).find("button").blur() });

	//When the mouse pointer hovers over the sort button, highlight it.
	$("#sort-methods").on("mouseenter", function () { $(this).find("button").focus() });

	//When the mouse pointer enters any row, make the vertical ellipsis menu on that row visible
	$(".rentalItem").on("mouseenter", function () {
		$(this).find(".menu button").removeClass("invisible")
	})

	//When the mouse pointer leaves any row, make the vertical ellipsis menu on that row invisible
	//And, if the dropdown menu is open, close it.
	$(".rentalItem").on("mouseleave", function () {
		if ($(this).find(".menu").hasClass("show")) {
			$(this).find('.menu button').dropdown('toggle')
		}
		$(this).find(".menu button").addClass("invisible")
	})
})
//End Rental History Index Section