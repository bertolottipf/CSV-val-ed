sortTable = (tableName, colN) => {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, i, xCompare, yCompare;
	table = document.getElementById(tableName);

	// give all i class fa sort
	$(`#${tableName} th>span>i:nth-child(1)`).removeClass(`fa-sort-up fa-sort-down`).addClass(`fa-sort`);
	// but not to clicked which will have up o down sort
	$(`#${tableName} th:nth-child(${colN + 1})>span>i:nth-child(1)`).removeClass(`fa-sort`);

	switching = true;
	//Set the sorting direction to ascending:
	dir = `asc`;
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
			first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName(`TD`)[colN];
			y = rows[i + 1].getElementsByTagName(`TD`)[colN];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/

			var sort = ``;
			if (dir == `asc`) {
				sort = `down`;
			} else if (dir == `desc`) {
				sort = `up`;
			}

			// set sort up or down icon
			$(`#${tableName} th:nth-child(${colN + 1})>span>i:nth-child(1)`).addClass(`fa-sort-${sort}`);


			if (parseFloat(x.innerHTML) && parseFloat(y.innerHTML)) {
				xCompare = parseFloat(x.innerHTML);
				yCompare = parseFloat(y.innerHTML);
			} else if (parseInt(x.innerHTML) && parseInt(y.innerHTML)) {
				xCompare = parseInt(x.innerHTML);
				yCompare = parseInt(y.innerHTML);
			} else {
				xCompare = x.innerHTML.toLowerCase();
				yCompare = y.innerHTML.toLowerCase();
			}


			if (dir == `asc`) {
				if (xCompare > yCompare) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == `desc`) {
				if (xCompare < yCompare) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is `asc`,
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == `asc`) {
				dir = `desc`;
				switching = true;
			}
		}
	}

	$("table tbody tr").each(function (index) {
		$(this).attr("data-ysort", index + 1);
	});

}


htmlToCSV = (html, filename) => {
	var data = [];
	var rows = document.querySelectorAll(`table tr`);

	for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll(`td, th`);

		for (var j = 1; j < cols.length; j++) {
			row.push(cols[j].innerText);
		}

		data.push(row.join(","));
	}

	downloadCSVFile(data.join("\n"), filename);
}


downloadCSVFile = (csv, filename) => {
	var csv_file, download_link;
	csv_file = new Blob([csv], { type: `text/csv` });
	download_link = document.createElement(`a`);
	download_link.download = filename;
	download_link.href = window.URL.createObjectURL(csv_file);
	download_link.style.display = `none`;
	document.body.appendChild(download_link);
	download_link.click();
}



$(function () {

	document.getElementById(`exportCSV`).addEventListener(`click`, function () {
		var html = document.querySelector(`table`).outerHTML;
		htmlToCSV(html, `csvValEd.csv`);
	})



	var activeX = `0`, activeY = `0`, toPasteXStart, toPasteYStart, toPasteXEnd, toPasteYEn

	// validate on td changes
	$(`body`).on(`focus`, `td[contenteditable]`, function () {
		const $this = $(this);
		$this.data(`before`, $this.html());
	}).on(`blur keyup paste input`, `[contenteditable]`, function () {
		const $this = $(this);
		if ($this.data(`before`) !== $this.html()) {
			$this.data(`before`, $this.html());
			$this.trigger(`change`);
		}
		validate($(this).attr('data-x'), $(this).attr('data-y'));
	});

	// validate on copy
	$(`td[contenteditable=true]`).mousedown(function (e) {

		// on mousedown if control is not pressed do focus (take current cell data to copy content)
		// else take cellSelectStart (and then will do mouseup)
		if (e.ctrlKey) {
			cellSelectStart($(this));
			e.stopImmediatePropagation(); //stops event bubbling
			e.preventDefault();  //stops default browser action (focus)
		}

	}).focus(function (e) {
		//// console.log("copiato!");
		// get selected cell x/y to copy the value
		activeX = $(this).attr(`data-x`);
		activeY = $(this).attr(`data-y`);
	}).mouseup(function (e) {
		e.stopImmediatePropagation(); //stops event bubbling

		e.preventDefault();  //stops default browser action (focus)

		if (!e.ctrlKey) {
			//set value to copy
			valueToCopy = $(`td[data-x="${activeX}"][data-y="${activeY}"]`).text();
			//// console.log(valueToCopy);
		} else {
			// copia celle
			cellSelectEnd($(this));

			arrRange = [];
			getSquareRange(arrRange, toPasteXStart, toPasteYStart, toPasteXEnd, toPasteYEnd);
			////console.log(arrRange);

			arrRange.forEach(pointXY => {
				$(`td[data-x=${pointXY[0]}][data-y=${pointXY[1]}]`).text(valueToCopy);
				validate(pointXY[0], pointXY[1]);
			});

			// obbligo di validare tutto perché non è solo una cella incollata
			//// validate($(this).attr('data-x'), $(this).attr('data-y'));
			validate($(this).attr('data-x'), $(this).attr('data-y'));
		}
	})



	cellSelectStart = ((isthis) => {
		toPasteXStart = isthis.attr(`data-x`);
		toPasteYStart = isthis.attr(`data-y`);
		//// console.log(`toPasteXStart: ${toPasteXStart} - toPasteYStart ${toPasteYStart}`);
	})



	cellSelectEnd = ((isthis) => {
		toPasteXEnd = isthis.attr(`data-x`);
		toPasteYEnd = isthis.attr(`data-y`);

		//// console.log(`toPasteXEnd: ${toPasteXEnd} - toPasteYEnd ${toPasteYEnd}`);
	})


	$(document).keydown(function (e) {
		var x, y;
		if (e.keyCode == 37 && e.altKey && e.ctrlKey) { // left
			x = getSortedPosition()[0]-1;
			y = getSortedPosition()[1];
			$(`tr[data-ysort=${y}] > td[data-x=${x}]`).focus();
			valueToCopy = $(`td[data-x=${x}][data-y=${y}]`).text();
		} else if (e.keyCode == 38 && e.altKey && e.ctrlKey) { // up
			x = getSortedPosition()[0];
			y = getSortedPosition()[1]-1;
			$(`tr[data-ysort=${y}] > td[data-x=${x}]`).focus();
			valueToCopy = $(`td[data-x=${x}][data-y=${y}]`).text();
		} else if (e.keyCode == 39 && e.altKey && e.ctrlKey) { // right
			x = getSortedPosition()[0]+1;
			y = getSortedPosition()[1];
			$(`tr[data-ysort=${y}] > td[data-x=${x}]`).focus();
			valueToCopy = $(`td[data-x=${x}][data-y=${y}]`).text();
		} else if (e.keyCode == 40 && e.altKey && e.ctrlKey) { // down
			x = getSortedPosition()[0];
			y = getSortedPosition()[1]+1;
			$(`tr[data-ysort=${y}] > td[data-x=${x}]`).focus();
			valueToCopy = $(`:focus`).text();
			// valueToCopyFocus = $(`:focus`).text();
			//valueToCopyPosition = $(`tr[data-ysort=${y}] td[data-x=${x}]`).text();
		} else if (e.ctrlKey) {
			$(`td[contenteditable=true]:not(:focus)`).css(`cursor`, `crosshair`);
		}
	});



	function getUnsortedPosition() {
		//// console.log($(':focus').data('x') + "-" + $(':focus').data('y'));
		//// console.log($(':focus').text());
		return [$(':focus').data("x"), $(':focus').data('y')];
	}


	function getSortedPosition() {
		//// console.log($(':focus').data('x') + "-" + $(':focus').parent().data('ysort'));
		//// console.log($(':focus').text());
		return [$(':focus').data("x"), $(':focus').parent().data('ysort')];
	}


	$(document).on(`keyup`, function (event) {
		if (!event.ctrlKey) {
			$(`td[contenteditable=true]:not(:focus)`).css(`cursor`, `text`);
		}
	});

});
