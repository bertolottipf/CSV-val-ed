import React, { useState } from "react";
import $ from "jquery"

import './styles/Home.css';

//import ValScript from "./ValScript";


const Validate = ({
	csvFile,
	valFile,
	dataEnclosure,
	dataDelimiter,
	valEnclosure,
	valDelimiter,
	onReset,
}) => {


	function scrollToElement(count) {
		var selector = ('.error:eq(' + count + ')');
	
		//// console.log(count);
	
		$('html, body').animate({
			scrollTop: $(selector).offset().top
		}, 1000);
	
		$(`.error:eq(${count})`).focus();
	}
	
	function validate(x = undefined, y = undefined) {
		
		var thisCellOnly = "";
		if (x !== undefined && y !== undefined) {
			thisCellOnly = `[data-x=${x}][data-y=${y}]`;
		}
	
		$("tbody td" + thisCellOnly).each(function () {
			const pattern = $(this).data("pattern");
			const ignoreCase = $(this).data('ignorecase') === undefined ? false : $(this).data('ignorecase');
			const string = $(this).text();
			let re;
			if (ignoreCase) {
				re = new RegExp("^" + pattern + "$", "i");
			} else {
				re = new RegExp("^" + pattern + "$");
			}
	
			//alert(re.test(string));
			if (!re.test(string) && pattern !== undefined) {
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
	
			$('#nErrors').html($('.error').length);
		})
		
	}
	
	
	/**document ready**/
	$(function () {
		// var count = 0;
		// /* scroll to 150px before .error with animation time of 1000ms */
		// $('.navigation a').on('click', function (e) {
		// 	e.preventDefault();
		// 	var id = $(this).prop('id');
		// 	//// console.log(`$('.error').length - 1: ${$('.error').length - 1}`);
		// 	if (id === "next") {
		// 		if (count < $('.error').length - 1) {
		// 			count++;
		// 		} else {
		// 			count = 0;
		// 			alert("reached end point");
		// 		}
		// 	} else {
		// 		if (count > 0) {
		// 			count--;
		// 		} else {
		// 			count = $('.error').length - 1;
		// 			alert("reached start point");
		// 		}
		// 	}
		// 	//// scrollToElement('.error:eq(' + count + ')');
		// 	scrollToElement( count );
		// });

		const csvDataClone = [...csvData]
		csvDataClone.splice(1).forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				validate(cellIndex, rowIndex)
			});
		}); // ! TODO: errore!!!!!
	});











	const [csvData, setCsvData] = useState([]);
	//// console.log('-----------------------------------------------' + csvData + '-----------------------------------------------')
	const [valData, setValData] = useState([]);
	//// console.log('-----------------------------------------------' + valData + '-----------------------------------------------')


	const parseCsvData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(dataDelimiter);
			return cells.map((cell) => cell.replace(dataEnclosure, '')?.replace('\r', ''));
		});
		setCsvData(parsedData);
		return parsedData;
	};

	const parseValData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(valDelimiter);
			return cells.map((cell) => cell.replace(valEnclosure, '')?.replace('\r', ''));
		});
		setValData(parsedData);
		return parsedData;
	};


	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseCsvData(content);
		};
		reader.readAsText(csvFile);
	}, [csvFile, dataDelimiter, dataEnclosure]);




	function instanceOfBlob(object){
		return 'member' in Blob;
	}



	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseValData(content);
		};
		console.log(valFile)
		if (valFile) {
			reader.readAsText(valFile);
		}
	}, [valFile, valDelimiter, valEnclosure]);



	React.useEffect(() => {
		if (valData.length > 0) {
			const val = getValidator()
			try {
				eval(val); // Esegui il codice jQuery
				console.info("eval!!!")
			} catch (error) {
				console.error("Errore nell'esecuzione del codice jQuery:", error);
			}
		}
	}, [csvData, valData]);

	


	const handleCellEdit = (rowIndex, cellIndex, value) => {
		console.log(JSON.stringify(csvData));
		csvData[rowIndex + 1][cellIndex] = value;
		setCsvData(csvData);
	};
	

	const getValidator = () => {

		var commands = '';
		var command= '';
		
		//! per tutte le intestazioni del csv
		csvData[0]?.forEach((csvColumnName, csvColumnIndex) => {
			
			//! per tutte le linee del validatore
			valData.forEach(valEl => {
				
				const option = valEl[1]?.toUpperCase();
				const dataConfronto = parseInt(valEl[3])
				
				if (valEl[0] === csvColumnName) {
					// eslint-disable-next-line default-case
					switch (typeof option === "string" && option) {

						case 'L':
							if (valEl[2] === "=") {
								command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto}}');\n`;
							} else if (valEl[2] === ">") {
								command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto+1},}');\n`;
							} else if (valEl[2] === ">=") {
								command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto},}');\n`;
							} else if (valEl[2] === "<") {
								command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{0,${dataConfronto-1}}');\n`;
							} else if (valEl[2] === "<=") {
								command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{0,${dataConfronto}}');\n`;
							}
							break;
							
						case 'R':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '${dataConfronto}');\n`;
							break;
						case 'RI':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '${dataConfronto}');\n`;
							command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`;
							break;
							
						case 'S':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							break;
						case 'SI':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`;
							break;
							
						case 'U':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							break;
						case 'UI':
							command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`;
							break;
					}

					commands += command;
				}
				console.log(commands)
			});


		});

		//// console.log("~~~~~~~~~~~~~~~~~~~~~ " + commands);
		// return `$(function() {${commands}})`;
		return `${commands}`;
	}



	return (
		<div>
			
			<table className="table table-striped table-responsive">
				<thead>
					<tr>
						<th>#</th>
						{csvData?.length > 0 &&
							csvData[0].map((item, index) => (
								<th key={index}>{item}</th>
							))}
					</tr>
				</thead>
				<tbody>
					{csvData.slice(1).map((row, rowIndex) => (
						<tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
							<td key={rowIndex}>
								{2 + rowIndex}
							</td>
							{row.map((item, cellIndex) => (
								<td
									key={cellIndex}
									data-x={cellIndex}
									data-y={rowIndex}
									contentEditable
									suppressContentEditableWarning
									onBlur={(e) =>
										handleCellEdit(rowIndex, cellIndex, e.target.textContent)
									}
								>
									{item}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={onReset}>Back</button>
			{/*<ValScript csvData={csvData} valData={valData} />*/}
		</div>
	);
};


export default Validate;