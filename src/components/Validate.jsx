import React, { useState } from "react";
import $ from "jquery"

import ActionBar from './ActionBar'

import './styles/Validate.css';



const Validate = ({
	csvFile,
	valFile,
	dataEnclosure,
	dataDelimiter,
	valEnclosure,
	valDelimiter,
	onReset,
}) => {
	

	function validate(x = undefined, y = undefined) {


		var thisCellOnly = "";
		if (x !== undefined && y !== undefined) {
			thisCellOnly = `[data-x="${x}"][data-y="${y}"]`;
		} 

		
		document.querySelectorAll("tbody td" + thisCellOnly).forEach(el => {
			const pattern = el.getAttribute("data-pattern");
			const ignoreCase = el.getAttribute("data-ignorecase") === undefined ? false : el.getAttribute("data-ignorecase");
			const string = el.innerText;
			let re;
			if (ignoreCase) {
				re = new RegExp("^" + pattern + "$", "i");
			} else {
				re = new RegExp("^" + pattern + "$");
			}

			if (!re.test(string) && pattern != null ) {
				el.classList.add('error');
			} else {
				el.classList.remove("error");
			}

			const nErrorsElement = document.getElementById("nErrors");
			const errors = document.querySelectorAll(".error");
			nErrorsElement.innerHTML = errors.length;

		})

	}


	window.addEventListener('load', function () {
		if (valFile) {
			validate()
			setErrorCheck(true);
		}
	});


	







	const [csvData, setCsvData] = useState([]);
	//console.log('-----------------------------------------------' + csvData + '-----------------------------------------------')
	const [valData, setValData] = useState([]);
	//console.log('-----------------------------------------------' + valData + '-----------------------------------------------')
	const [errorsCheck, setErrorCheck] = useState(false);
	


	const parseCsvData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {

			let regex = new RegExp(`${dataEnclosure}(.*?)${dataDelimiter}(.*?)${dataEnclosure}`, "g");

			const cells = row.split(dataDelimiter);

			return cells.map((cell) => {
				if (dataEnclosure !== "") {
					return cell.replace(/^\s+|\s+$/gm,'').replaceAll(dataEnclosure, '')?.replace('\r', '')
                } else {
					return cell.replace('\r', '')
                }
			});
		});
		setCsvData(parsedData);
		return parsedData;
	};

	const parseValData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(valDelimiter);
			return cells.map((cell) => {
				if (valEnclosure !== "") {
					return cell.replace(/^\s+|\s+$/gm,'').replaceAll(valEnclosure, '')?.replace('\r', '')
				} else {
					return cell.replace('\r', '')
				}
			});
			
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





	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseValData(content);
		};
		console.log(valFile);
		if (valFile) {
			reader.readAsText(valFile);
			
			validate()
		}
	}, [valFile, valDelimiter, valEnclosure]);



	React.useEffect(() => {
		if (valData.length > 0) {
			const val = getValidator()
			
			try {

				console.info("eval!!!" + val)
				eval(val); // Esegui il codice jQuery
			} catch (error) {
				console.error("Errore nell'esecuzione del codice jQuery:", error);
			}
			
			validate()
		}
	}, [csvData, valData]);




	const handleCellEdit = (rowIndex, cellIndex, value) => {
		console.log(JSON.stringify(csvData));
		csvData[rowIndex + 1][cellIndex] = value;
		validate(cellIndex, rowIndex);
	};


	const getValidator = () => {

		var commands = '';
		var command= '';

		//! per tutte le intestazioni del csv
		csvData[0]?.forEach((csvColumnName, csvColumnIndex) => {

			//! per tutte le linee del validatore
			valData.forEach(valEl => {

				const option = valEl[1]?.toUpperCase();
				const dataConfronto = valEl[3];

				if (valEl[0] === csvColumnName) {
					// eslint-disable-next-line default-case
					switch (typeof option === "string" && option) {

						case 'L':
							if (valEl[2] === "=") {
								//command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto}}');\n`;
								command = `document
										.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
										.forEach(el => el.setAttribute('data-pattern', '.{${dataConfronto}}'));\n`;
							} else if (valEl[2] === ">") {
								//command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto+1},}');\n`;
								command = `document
										.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
										.forEach(el => el.setAttribute('data-pattern', '.{${dataConfronto+1},}'));\n`;
							} else if (valEl[2] === ">=") {
								//command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{${dataConfronto},}');\n`;
								command = `document
										.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
										.forEach(el => el.setAttribute('data-pattern', '.{${dataConfronto},}'));\n`;
							} else if (valEl[2] === "<") {
								//command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{0,${dataConfronto-1}}');\n`;
								command = `document
										.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
										.forEach(el => el.setAttribute('data-pattern', '.{0,${dataConfronto-1}}'));\n`;
							} else if (valEl[2] === "<=") {
								// command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '.{0,${dataConfronto}}');\n`;
								command = `document
										.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
										.forEach(el => el.setAttribute('data-pattern', '.{0,${dataConfronto}}'));\n`;
							}
							break;

						case 'R':
							// command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '${dataConfronto}');\n`;
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => el.setAttribute('data-pattern', '${dataConfronto}'));\n`;
							break;
						case 'RI':
							/* command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '${dataConfronto}');\n`;
							command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`; */
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => {
										el.setAttribute('data-pattern', '${dataConfronto}')
											.setAttribute('data-ignorecase', 'true')
									});\n`;
							break;

						case 'S':
							// command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => el.setAttribute('data-pattern', '(${dataConfronto})'));\n`;
							break;
						case 'SI':
							/* command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`; */
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => {
										el.setAttribute('data-pattern', '(${dataConfronto})');
											el.setAttribute('data-ignorecase', 'true');
									});\n`;
							break;

						case 'U':
							// command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => el.setAttribute('data-pattern', '(${dataConfronto})'));\n`;
							break;
						case 'UI':
							// command = `$("[ data-x='${csvColumnIndex}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
							// command += `$("[ data-x='${csvColumnIndex}' ]").attr('data-ignorecase', 'true');\n`;
							command = `document
									.querySelectorAll("[ data-x='${csvColumnIndex}' ]")
									.forEach(el => {
										el.setAttribute('data-pattern', '(${dataConfronto})')
											.setAttribute('data-ignorecase', 'true')
									});\n`;
							break;
					}
					console.log(command)
					commands += command;
				}
				console.log(commands)
			});


		});


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
									style={{whiteSpace: "pre-wrap",	overflow: "auto", fontFamily: "sans-serif",
											fontSize: 16+"px", lineHeight: 1.2,	margin: "0 0 10px 0",
											padding: 10+"px"}}
								>
									{/* <pre style={{ fontFamily: "sans-serif", fontSize: 16+"px", lineHeight: 1.5, margin: 0, padding: 0}}>{item}</pre> */}
									{item}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={onReset}>Back</button>

			

			<ActionBar errorsCheck={valFile!= undefined}></ActionBar>
		</div>
	);
};


export default Validate;