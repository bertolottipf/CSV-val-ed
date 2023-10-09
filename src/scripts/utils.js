// numbers = [];
function incrementN(arr, number, end) {
	if (number <= end) {
		arr.push(number);
		number++;
		incrementN(arr, number, end);
	} else {

	}
}
// incrementN(numbers, 0, 9);



// range = []
var xStartOrig = undefined;
function getSquareRange(arr, xStart, yStart, xEnd, yEnd) {

	xStart = parseInt(xStart);
	yStart = parseInt(yStart);
	xEnd = parseInt(xEnd);
	yEnd = parseInt(yEnd);



	if (xStartOrig === undefined) {
		xStartOrig = xStart;

		if (xStart > xEnd) {
			xEnd = [xStart, xStart = xEnd][0];
		}
		if (yStart > yEnd) {
			yEnd = [yStart, yStart = yEnd][0];
		}
		//// console.log(`xStart: ${xStart}, yStart: ${yStart}`);
		//// console.log(`xEnd: ${xEnd}, yEnd: ${yEnd}`);
	}

	// evito che vengano prese in considerazione le celle a sinistra della colonna interessata
	if (xStart >= xStartOrig  && yStart <= yEnd && xStart <= xEnd) {
		arr.push([xStart, yStart]);
		xStart++;
		getSquareRange(arr, xStart, yStart, xEnd, yEnd);
	}
	else {
		yStart++;
		if (yStart <= yEnd) {
			xStart = xStartOrig;
			arr.push([xStart, yStart]);
			getSquareRange(arr, xStart, yStart, xEnd, yEnd);
		}
	}

	xStartOrig = undefined;
}
//// getSquareRange(range, 1, 1, 3, 3);
//// console.log(range);
