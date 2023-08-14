import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';
// import { saveAs } from 'file-saver';
import $ from 'jquery';

const Home = () => {
	const [csvFile, setCsvFile] = useState(null);
	const [valFile, setValFile] = useState(null);
	const [dataEnclosure, setDataEnclosure] = useState('');
	const [valEnclosure, setValEnclosure] = useState('');
	const [dataDelimiter, setDataDelimiter] = useState(',');
	const [valDelimiter, setValDelimiter] = useState(',');
	const [showResults, setShowResults] = useState(false);

	const [areEnclosuresLocked, setEnclosuresLocked] = useState(true);
	const [areDelimitersLocked, setDelimitersLocked] = useState(true);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Simulate sending the files to the server
		uploadFilesToServer(csvFile, valFile);

		// Perform validation logic here with the form values
		setShowResults(true);
	};

	const handleReset = () => {
		setCsvFile(Buffer.from("", "base64"));
		setValFile(Buffer.from("", "base64"));
		setDataEnclosure('');
		setValEnclosure('');
		setDataDelimiter(',');
		setValDelimiter(',');
		setShowResults(false);

		setEnclosuresLocked(true);
		setDelimitersLocked(true);
	};

	const uploadFilesToServer = (csvFile, valFile) => {
		// Implement your server-side file upload logic here
		console.log('Uploading files to server:', csvFile, valFile);
	};

	return (
		<div>
			{!showResults ? (
				<form onSubmit={handleFormSubmit}>

					<div className="row mb-3">
						<label className="col-3">CSV File:</label>
						<input
							type="file"
							accept=".csv"
							onChange={(e) => setCsvFile(e.target.files[0])}
							required
							className="col-9"
						/>
					</div>

					<div className="row mb-3">
						<label className="col-3">Validation File:</label>
						<input
							type="file"
							accept=".csv"
							onChange={(e) => setValFile(e.target.files[0])}
							className="col-9"
						/>
					</div>

					<div className="row">

						<div className="mb-3 col-6">
							{/* <label><em>Enclosures</em></label> */}

							<div className="row">
								<label htmlFor="dataenclosure" className="col-4">Data File Enclosures:</label>
								<input
									type="text"
									value={dataEnclosure}
									onChange={(e) => { 
										setDataEnclosure(e.target.value);
										if (areEnclosuresLocked) setValEnclosure(e.target.value);
										
									}}
									className="col-3"
								/>
							</div>

							<div className="row">

								<label htmlFor="valenclosure" className="col-4">Validation File Enclosures:</label>
								<input
									type="text"
									value={valEnclosure}
									onChange={(e) => setValEnclosure(e.target.value)}
									className="col-3"
									disabled={areEnclosuresLocked}
								/>
								<div id="lockEnclosures" style={{ fontSize: "2em",position: "relative", top: "-0.95em" }} data-default-open="false" role="button" className='ms-0 ps-0' >
								
									{areEnclosuresLocked ? (
										<i className="bi bi-lock-fill" onClick={() => {setEnclosuresLocked(false)}}><span className="fs-6">locked</span></i>
									) : (
										<i className="bi bi-unlock-fill ms-1" onClick={() => {setEnclosuresLocked(true); setValEnclosure(dataEnclosure)}}><span className="fs-6">unlocked</span></i>
									)}
								</div>
							</div>

							<div id="enclosuresMsg"></div>
						</div>


						<div className="mb-3 col-6">
							{/* <label><em>Delimiters</em></label> */}

							<div className="row">
								<label htmlFor="datadelimiter" className="col-4">Data File Delimiters:</label>
								<input
									type="text"
									value={dataDelimiter}
									// onChange={(e) => setDataDelimiter(e.target.value)}
									onChange={(e) => { 
										setDataDelimiter(e.target.value);
										if (areDelimitersLocked) setValDelimiter(e.target.value);
									}}
									className="col-3"
								/>
							</div>
							<div className="row">
								<label htmlFor="valdelimiter" className="col-4">Validation File Delimiters:</label>
								<input
									type="text"
									value={valDelimiter}
									onChange={(e) => { 
										setValDelimiter(e.target.value);
										if (areDelimitersLocked) setValDelimiter(e.target.value);
									}}
									className="col-3"
									disabled={areDelimitersLocked}
								/>
								<div id="lockDelimiters" style={{ fontSize: "2em",position: "relative", top: "-0.95em" }} data-default-open="false" role="button" className="ms-0 ps-0">
									{areDelimitersLocked ? (
											<i className="bi bi-lock-fill" onClick={() => {setDelimitersLocked(false)}}><span className="fs-6">locked</span></i>
									) : (
										<i className="bi bi-unlock-fill ms-1" onClick={() => {setDelimitersLocked(true); setValDelimiter(dataDelimiter)}}><span className="fs-6">unlocked</span></i>
									)}
								</div>
							</div>

							<div className="row" id="delimitersMsg"></div>
						</div>

					</div>

					<button type="submit" className="btn btn-primary">VALIDATE</button>
					<button onClick={handleReset} className="btn btn-warning">Reset</button>
				</form>
			) : (
					<Validate
						csvFile={csvFile}
						valFile={valFile}
						dataEnclosure={dataEnclosure}
						dataDelimiter={dataDelimiter}
						valEnclosure={valEnclosure}
						valDelimiter={valDelimiter}
						onReset={handleReset}
					/>
				)}
		</div>
	);
};














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

	/* React.useEffect(() => {
		if (valFile != "") {
			scriptVal += getValidator(csvData[colIndex])
			intestazioni.push(intestazioni, csvData[colIndex])
		}
	}, [valFile, valEnclosure]); */


	/**
	 * crea l'array da una stringa csv per i dati
	 * @param {string} data 
	 */
	const parseCSVData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(dataDelimiter);
			return cells.map((cell) => cell.split(dataEnclosure).join(""));
		});
		setCsvData(parsedData);
		
	};

	/**
	 * crea l'array da una stringa csv per il validatore
	 * @param {string} data 
	 */
	const parseVALData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(valDelimiter);
			return cells.map((cell) => cell.split(valEnclosure).join(""));
		});
		setValData(parsedData);
	};

	/**
	 * legge i dati dal file dei dati scelto creando un array
	 */
	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseCSVData(content);
			/* if (valData.length > 0){
				$(function () {
					csvData[0].map((item, colIndex) => (
						getValidator(csvData[0][colIndex])
					))
				})
			} */
		};
		reader.readAsText(csvFile);
	}, [csvFile, dataDelimiter, dataEnclosure]);

	/**
	 * legge i dati dal file dei validatori scelto creando un array
	 */
	React.useEffect(() => {
		if(valFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target.result;
				parseVALData(content);
				/* if (csvData.length > 0){
					$(function () {
						csvData[0].map((item, colIndex) => (
							getValidator(csvData[0][colIndex])
						))	
					})	
				} */
			};
			reader.readAsText(valFile);
		}
	}, [valFile, valDelimiter, valEnclosure]);

	/**
	 * 
	 * 
	 * @param {number} rowIndex  la riga su cui si trova il dato
	 * @param {number} cellIndex  la colonna su cui di trova il dato
	 * @param {string} value  il dato editato
	 */
	const handleCellEdit = (rowIndex, cellIndex, value) => {
		const updatedData = [...csvData];
		const rowN = rowIndex + 1;
		updatedData[rowN][cellIndex] = value;
		setCsvData(updatedData);
	};


	
	const getValidator = (nomeCol, numCol) => {


		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		document.querySelector("#validateScripts").append('// ...');

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

				
				//console.log( "!!! " , command , " !!!" );
				document.querySelector("#validateScripts").append(command);
				return command;
			}
		});
	}


	return (
		<div>
			{<table className="table table-striped table-responsive">
				{<thead>
					<tr>
						{csvData.length > 0 && csvData[0].map((item, colIndex) => (
							<th key={colIndex}>{item}</th>
						))}
					</tr>
				</thead>}
				<tbody>
					{csvData.slice(1).map((row, rowIndex) => (
						<tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
							{row.map((item, cellIndex) => (
								<td
									key={cellIndex}
									contentEditable
									suppressContentEditableWarning
									onBlur={(e) =>
										handleCellEdit(rowIndex, cellIndex, e.target.textContent)
									}
									data-x={rowIndex}
									data-y={cellIndex}
								>
									{item}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>}
			<br />
			<button onClick={onReset}>Back</button>

			<script id="validateScripts">
				{$(function () {
					/*
						TODO:aggiuntare!!! Va in errore
						csvData.length > 0 && csvData[0].forEach((item, colIndex) => {
							getValidator(item.replace("\r", ''), colIndex)
						})
						
					*/
					
				})}
			</script>			
		</div>
	);

};

export default Home;


