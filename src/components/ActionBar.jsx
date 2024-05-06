import  React from "react";
import $ from "jquery"

import './styles/ActionBar.css';

const ActionBar = ({ errorsCheck }) => {

	const downloadCSVFile = (csv, filename) => {
		var csv_file, download_link;
		csv_file = new Blob([csv], { type: `text/csv` });
		download_link = document.createElement(`a`);
		download_link.download = filename;
		download_link.href = window.URL.createObjectURL(csv_file);
		download_link.style.display = `none`;
		document.body.appendChild(download_link);
		download_link.click();
	}


	function htmlToCSV (filename)  {
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
					count = $('.error').length - 1;
					alert("reached end point");
				}
			} else {
				if (count > 0) {
					count--;
				} else {
					count = 0;
					alert("reached start point");
				}
			}
			//// scrollToElement('.error:eq(' + count + ')');
			scrollToElement( count );
			
			//document.querySelector("table").focus();
		});
	});

	return (
		<div id="actionBar">
			{
				errorsCheck===true &&
				<div className="float-left btn btn-warning" style={{"marginTop": -50 + "px", "marginBottom": -50 +"px"}} id="errors" >
					Errors found: <span id="nErrors">0</span>
					<div id="errorsNavigation" className="float-right">
						<a href="#" id="prev" className="float-left">▲</a>
						<a href="#" id="next" className="float-left">▼</a>
					</div>
				</div>
			}

			<div className="float-right" id="exports" style={{ "marginTop": -50 +"px", "marginBottom": -50 + "px" }}>
				<button id="exportCSV" className="float-right btn btn-primary" onClick={htmlToCSV('test.csv')}>Export HTML table to CSV file</button>
			</div>
		</div>
	);
}

export default ActionBar;
