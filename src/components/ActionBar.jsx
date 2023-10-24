import  React from "react";
import $ from "jquery"

//import Table from './Table'

import './styles/ActionBar.css';

function ActionBar() {


	function scrollToElement(count) {
		var selector = ('.error:eq(' + count + ')');

		//// console.log(count);

		$('html, body').animate({
			scrollTop: $(selector).offset().top
		}, 1000);

		$(`.error:eq(${count})`).focus();
	}

	/**document ready**/
	$(function () {
		var count = 0;
		/* scroll to 150px before .error with animation time of 1000ms */
		$('#errorsNavigation a').on('click', function (e) {
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

	return (
		<div id="actionBar">
			<div className="float-left btn btn-warning" style={{"marginTop": -50 + "px", "marginBottom": -50 +"px"}} id="errors" >
				Errors found: <span id="nErrors">0</span>
				<div id="errorsNavigation" className="float-right">
					<a href="#" id="prev" className="float-left">▲</a>
					<a href="#" id="next" className="float-left">▼</a>
				</div>
			</div>

			<div className="float-right" id="exports" style={{ "marginTop": -50 +"px", "marginBottom": -50 + "px" }}>
				<button id="exportCSV" className="float-right btn btn-primary">Export HTML table to CSV file</button>
			</div>
		</div>
	);
}

export default ActionBar;
