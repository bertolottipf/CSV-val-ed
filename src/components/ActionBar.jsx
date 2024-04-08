import  React, { useState } from "react";
import $ from "jquery"

//import Table from './Table'

import './styles/ActionBar.css';

const ActionBar = ({ errorsCheck }) => {



	function scrollToElement(count) {
		// Trova l'elemento con la classe "error" e l'indice specificato
		var element = document.querySelectorAll(".error")[count];
	  
		// Controlla se l'elemento è presente
		if (element) {
		  // Scorri alla posizione dell'elemento
		  window.scrollTo({
			top: element.offsetTop,
			behavior: "smooth"
		  });
	  
		  // Imposta lo focus sull'elemento
		  element.focus();
		} else {
		  console.error("Errore: elemento con indice " + count + " non trovato.");
		}
	  }

	/**document ready**/
	// TODO: togliere jquery
	$(function () {
	//document.addEventListener("DOMContentLoaded", function () {
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
				<button id="exportCSV" className="float-right btn btn-primary">Export HTML table to CSV file</button>
			</div>
		</div>
	);
}

export default ActionBar;
