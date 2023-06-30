// http://jsfiddle.net/x33gz6z9/

/**  scroll to element function **/
function scrollToElement(count) {
	var selector = ('.error:eq(' + count + ')');

	//// console.log(count);

	$('html, body').animate({
		scrollTop: $(selector).offset().top
	}, 1000);

	$(`.error:eq(${count})`).focus();
}

function validate(x = undefined, y = undefined) {

	let thisCellOnly = "";
	if (x != undefined && y != undefined) {
		thisCellOnly = `[data-x=${x}][data-y=${y}]`;
	}

	$("tbody td" + thisCellOnly).each(function () {
		let pattern = $(this).data("pattern");
		let ignoreCase = $(this).data('ignorecase') == undefined ? false : $(this).data('ignorecase');
		let string = $(this).text();
		let re;
		if (ignoreCase) {
			re = new RegExp("^" + pattern + "$", "i");
		} else {
			re = new RegExp("^" + pattern + "$");
		}

		//alert(re.test(string));
		if (!re.test(string) && pattern != undefined) {
			$(this).addClass("error");
		} else {
			$(this).removeClass("error");
		}

		$('#nErrors').html($('.error').length);
	})

}


/**document ready**/
$(document).ready(function () {
	count = 0;
	/* scroll to 150px before .error with animation time of 1000ms */
	$('.navigation a').click(function (e) {
		e.preventDefault();
		var id = $(this).prop('id');
		//// console.log(`$('.error').length - 1: ${$('.error').length - 1}`);
		if (id === "next") {
			if (count < $('.error').length - 1) {
				count++;
			} else {
				count = 0;
				alert("reached end point");
			}
		} else {
			if (count > 0) {
				count--;
			} else {
				count = $('.error').length - 1;
				alert("reached start point");
			}
		}
		//// scrollToElement('.error:eq(' + count + ')');
		scrollToElement( count );
	});
});

