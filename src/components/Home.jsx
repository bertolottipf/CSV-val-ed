import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { saveAs } from 'file-saver';
 import $ from "jquery"

import Validate from './Validate';
import './styles/Home.css';






const uploadFilesToServer = (csvFile, valFile) => {
	// TODO: Implement your server-side file upload logic here
	console.log('Uploading files to server:', csvFile.name, " & ", valFile?.name);
};



const Home = () => {
	const [csvFile, setCsvFile] = useState(null);
	const [valFile, setValFile] = useState(null);
	const [dataEnclosure, setDataEnclosure] = useState('');
	const [valEnclosure, setValEnclosure] = useState('');
	const [dataDelimiter, setDataDelimiter] = useState(',');
	const [valDelimiter, setValDelimiter] = useState(',');
	const [showResults, setShowResults] = useState(false);

	const [areEnclosuresLock, setEnclosuresLock] = useState(true);
	const [areDelimitersLock, setDelimitersLock] = useState(true);


	const showAlert = (el, msg) => {
		$(el).html(`<div class="alert alert-info show">
				<button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true" onclick="this.parentElement.remove()">
					<span aria-hidden="true">
						&times;
					</span>
				</button>
				${msg}
			</div>`);
	}


	///////////////////////////////
	//          Handles          //
	///////////////////////////////


	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Simulate sending the files to the server
		uploadFilesToServer(csvFile, valFile);

		// Perform validation logic here with the form values
		setShowResults(true);
	};



	const handleReset = () => {
		setCsvFile(null);
		setValFile(null);
		setDataEnclosure('');
		setValEnclosure('');
		setDataDelimiter(',');
		setValDelimiter(',');
		setShowResults(false);

		setEnclosuresLock(true);
		setDelimitersLock(true);		

		$('.alert .close').trigger("click");
	};



	return (
		<div>
		
			{!showResults ? (
				<form onSubmit={handleFormSubmit}>

					<div className="row mb-3">
						<label htmlFor="csvFile" className="col-3">CSV File:</label>
						<input
							type="file"
							id="csvFile"
							accept=".csv"
							onChange={ (e) => {
								// imposto il valore di csvFile
								setCsvFile(e.target.files[0])
							} }
							required
							className="col-9"
						/>
					</div>

					<div className="row mb-3">
						<label htmlFor="valFile" className="col-3">Validation File:</label>
						<input
							id="valFile"
							type="file"
							accept=".csv"
							onChange={
								// imposto il valore di valFile
								(e) => setValFile(e.target.files[0])
							}
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
									id="dataenclosure"
									value={dataEnclosure}
									onChange={(e) => {
										const val = e.target.value;
										// imposto il valore di dataEnclosure
										setDataEnclosure(val);
										// se areEnclosuresLock è vero setto il campo valEnclosure uguale
										if (areEnclosuresLock) { 
											setValEnclosure(val);
										}
										// mostro l'alert se il valore del campo dataEnclosurero è | 
										if (val === "|") {
											showAlert(document.getElementById("enclosuresMsg"), "if <em>enclosure</em> is <em>\"|\"<em>, the validation may not work.");
										}
										
									}}
									className="col-3"
								/>
							</div>

							<div className="row">

								<label htmlFor="valenclosure" className="col-4">Validation File Enclosures:</label>
								<input
									type="text"
									id="valenclosure"
									value={valEnclosure}
									onChange={(e) => {
										const val = e.target.value;
										// imposto il valore di valEnclosure
										setValEnclosure(val);
										// mostro il l'alert se 
										if (val === "|") {
											showAlert(document.getElementById("enclosuresMsg"), "if <em>enclosure</em> is <em>\"|\"<em>, the validation may not work.");
										}
									}}
									className="col-3"
									disabled={areEnclosuresLock}
								/>
								<div id="lockEnclosures" style={{ fontSize: "2em", position: "relative", top: "-0.95em" }} data-default-open="false" role="button" className='ms-0 ps-0' >
									{areEnclosuresLock ? (
										<i className="bi bi-lock-fill" onClick={() => {
											// sblocco
											setEnclosuresLock(false);
										}}><span className="fs-6">locked</span></i>
									) : (
										<i className="bi bi-unlock-fill ms-1" onClick={() => {
											// blocco
											setEnclosuresLock(true);
											// copio il valore 
											setValEnclosure(document.getElementById('dataenclosure').value);
										}}><span className="fs-6">unlocked</span></i>
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
									id="datadelimiter"
									value={dataDelimiter}
									onChange={(e) => {
										
										const val = e.target.value;

										// imposto il valore di dataDelimiter
										setDataDelimiter(val);
																				
										// se areDelimitersLock è vero setto il campo valDelimiter uguale
										if (areDelimitersLock) { 
											setValDelimiter(val);
										}
										
										// mostro l'alert se il valore del campo dataEnclosurero è | 
										if (val === "|") {
											showAlert(document.getElementById("delimitersMsg"), "if <em>delimiter</em> is <em>\"|\"<em>, the validation may not work.");
										}
										
									}}
									className="col-3"
								/>
							</div>
							<div className="row">
								<label htmlFor="valdelimiter" className="col-4">Validation File Delimiters:</label>
								<input
									type="text"
									id="valdelimiter"
									value={valDelimiter}
									onChange={(e) => {
										const val = e.target.value;
										// imposto il valore di valEnclosure
										setValDelimiter(val);
										// mostro il l'alert se 
										if (val === "|") {
											showAlert(document.getElementById("enclosuresMsg"), "if <em>delimiter</em> is <em>\"|\"<em>, the validation may not work.");
										}
									}}
									className="col-3"
									disabled={areDelimitersLock}
								/>
								<div id="lockDelimiters" style={{ fontSize: "2em", position: "relative", top: "-0.95em" }} data-default-open="false" role="button" className="ms-0 ps-0">
									{areDelimitersLock ? (
										<i className="bi bi-lock-fill" onClick={() => { 
											// sblocco
											setDelimitersLock(false);
										}}><span className="fs-6">locked</span></i>
									) : (
										<i className="bi bi-unlock-fill ms-1" onClick={() => {
											// blocco
											setDelimitersLock(true);
											// copio il valore 
											setValDelimiter(document.getElementById('datadelimiter').value);
										}}><span className="fs-6">unlocked</span></i>
									)}
								</div>
							</div>

							<div className="row" id="delimitersMsg"></div>
						</div>

					</div>

					<button type="submit" className="btn btn-primary">VALIDATE</button>
					<button type="reset" onClick={handleReset} className="btn btn-warning">Reset</button>
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





export default Home;