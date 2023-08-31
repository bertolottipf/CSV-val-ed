import React, { useState, useRef } from "react";
import { useIsVisible } from "../hooks/useIsVisible";
import $ from "jquery";

import ValScript from "./ValScript";


const Validate = ({
	csvFile,
	valFile,
	dataEnclosure,
	dataDelimiter,
	valEnclosure,
	valDelimiter,
	onReset,
}) => {
	const [csvData, setCsvData] = useState([]);

	const [valData, setValData] = useState([]);

	const ref = useRef();
  	const isVisible = useIsVisible(ref);


	
	const parseCSVData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(dataDelimiter);
			return cells.map((cell) => cell.replace(dataEnclosure, '').replace('\r', ''));
		});
		setCsvData(parsedData);
	};

	const parseValData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(valDelimiter);
			return cells.map((cell) => cell.replace(valEnclosure, '').replace('\r', ''));
		});
		setValData(parsedData);
	};


	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseCSVData(content);
		};
		reader.readAsText(csvFile);
	}, [csvFile, dataDelimiter, dataEnclosure]);

	React.useEffect(() => {
		if (valFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target.result;
				parseValData(content);
			};
			reader.readAsText(valFile);
		} 
	}, [valFile, valDelimiter, valEnclosure]);


	const handleCellEdit = (rowIndex, cellIndex, value) => {
		const updatedData = [...csvData];
		const rowN = rowIndex + 1;
		updatedData[rowN][cellIndex] = value;
		setCsvData(updatedData);
	};

	const getValidator = (nomeCol, numCol) => {



		valData.forEach((dataVal, index) => {

			// se il nome del campo corrisponde
			if (dataVal[0] === nomeCol) {

				const opzione = dataVal[1];
				const dataConfronto = dataVal[3];

				var command = "";

				switch (opzione.toUpperCase()) {
						
					case 'L':
						if (dataVal[2] === "=") {
							const els = $(`[ data-x='${numCol}' ]`);
							els.map((el) => (
								el.attr('data-pattern', `.{${dataConfronto}}`)
							));
							command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '.{${dataConfronto}}');\n`;
						} else if (dataVal[2] === ">") {
							const els = $(`[ data-x='${numCol}' ]`);
							els.map((el) => (
								el.attr('data-pattern', `.{${dataConfronto+1},}`)
							));
							command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '.{${dataConfronto+1},}');\n`;
						} else if (dataVal[2] === ">=") {
							const els = $(`[ data-x='${numCol}' ]`);
							els.map((el) => (
								el.attr('data-pattern', `.{${dataConfronto},}`)
							));
							command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '.{${dataConfronto},}');\n`;
						} else if (dataVal[2] === "<") {
							const els = $(`[ data-x='${numCol}' ]`);
							els.map((el) => (
								el.attr('data-pattern', `.{0, ${dataConfronto-1}}`)
							));
							command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '.{0, ${dataConfronto-1}}');\n`;
						} else if (dataVal[2] === "<=") {
							const els = $(`[ data-x='${numCol}' ]`);
							els.map((el) => (
								el.attr('data-pattern', `.{,${dataConfronto}}`)
							));
							command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '.{,${dataConfronto}}');\n`;
						}
						break;

					case 'R':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '${dataConfronto}');\n`;
						break;

					case 'RI':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '${dataConfronto}');\n`;
						command += `$("[ data-x='${numCol}' ]").attr('data-ignorecase', 'true');\n`;
						break;

					case 'S':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
						break;

					case 'SI':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
						command += `$("[ data-x='${numCol}' ]").attr('data-ignorecase', 'true');\n`;
						break;

					case 'U':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
						break;

					case 'UI':
						command = `$("[ data-x='${numCol}' ]").attr('data-pattern', '(${dataConfronto})');\n`;
						command += `$("[ data-x='${numCol}' ]").attr('data-ignorecase', 'true');\n`;
						break;
				}

				
				console.log(">>>>>>>>> " + command)
				return command;
			}
		});
	}









	const getValidator2 = (a, b) => {
		
		return ` data-fff='${a}' `
	}






	const getValScript = () => {

		const container = document.getElementById('valScript');

		return (
			<script id="valScript">
				console.log("!!!!!!!!!!!!!!!! " + JSON.stringify(csvData));

				{/*Array.isArray(csvData) ? csvData[0].map((csvItem, csvIndex) => (
					container.append(
						getValidator(csvItem, csvIndex)
						)
					)) : ""*/}
				{
					//Array.isArray(csvData) ? console.log("è un array" + JSON.stringify(csvData)) : console.log("NON È UN ARRAY")
				}
					
			</script>
		)
	}


	return (
		<div ref={ref}>
			<table className="table table-striped table-responsive">
				<thead>
					<tr>
						<th>#</th>
						{csvData.length > 0 &&
							csvData[0].map((item, index) => (
								<th key={index}>{item}</th>
							))}
					</tr>
				</thead>
				<tbody>
					{csvData.slice(1).map((row, rowIndex) => (
						<tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
							<td key={rowIndex}>
								{2+rowIndex}
							</td>
							{row.map((item, cellIndex) => (
								<td
									key={cellIndex}
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
			<ValScript csvData={csvData} valData={valData} />
		</div>
	);
};


export default Validate;