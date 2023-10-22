import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { saveAs } from 'file-saver';

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
		// setCsvFile(Buffer.from("", "base64"));
		// setValFile(Buffer.from("", "base64"));
		setCsvFile(new Blob());
		setValFile(new Blob());
		setDataEnclosure('');
		setValEnclosure('');
		setDataDelimiter(',');
		setValDelimiter(',');
		setShowResults(false);

		setEnclosuresLocked(true);
		setDelimitersLocked(true);
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
							onChange={(e) => setCsvFile(e.target.files[0])}
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
									id="dataenclosure"
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
									id="valenclosure"
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
									id="datadelimiter"
									value={dataDelimiter}
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
									id="valdelimiter"
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






/*


// gestione lucchetti
	// ...disabilita campi e controlla il carattere |
	function lockEnclosures() {
		$('#lockEnclosures').click(function () {
			$("#valenclosure").val($("#dataenclosure").val());
			$("#valenclosure").prop("disabled", !$("#valenclosure").prop("disabled"));

			if ($("#valenclosure").prop("disabled") === true) {
				syncroDelimiterLookFields();
			}
			$('#enclosuresMsg .close').trigger('click');

			if ($('#valenclosure').val() === "|") {
				let msg = "if <em>enclosure</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#enclosuresMsg"), msg);
			}

		});
	}

	// ...disabilita campi e controlla il carattere |
	function lockDelimiters() {
		$('#lockDelimiters').click(function () {
			$("#valdelimiter").val($("#datadelimiter").val());
			$("#valdelimiter").prop("disabled", !$("#valdelimiter").prop("disabled"));

			if ($("#valdelimiter").prop("disabled") === true) {
				syncroDelimiterLookFields();
			}
			$('#delimitersMsg .close').trigger('click');

			if ($('#valdelimiter').val() === "|") {
				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#delimitersMsg"), msg);
			}

			//lockIconsDelimiters();
		})
	}

	// ...sincronizzazione campi enclosures bloccati
	function syncroEnclosuresLookFields() {
		$('#dataenclosure').keyup(function () {
			let isDisabled = $('#valenclosure').is(':disabled')
			if (isDisabled) {
				$('#valenclosure').val($('#dataenclosure').val());
				pipeValEnclosureCheck();
			}
		});
	}

	// ...sincronizzazione campi delimiters bloccati
	function syncroDelimiterLookFields() {
		$('#datadelimiter').keyup(function () {
			let isDisabled = $('#valdelimiter').is(':disabled')
			if (isDisabled) {
				$('#valdelimiter').val($('#datadelimiter').val());
				pipeValDelimiterCheck();
			}
		});
	}

	// mostro un alert nell'elemento el col messaggio msg
	function showAlert(el, msg) {
		$(el).html('<div class="alert alert-info show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
	}

	// controllo che valdelimiter non sia | e se lo è mostro un alert
	function pipeValDelimiterCheck() {

		$('#datadelimiter').keyup(function () {
			if ($('#datadelimiter').val() === "|" && $('#valdelimiter').is(':disabled')) {
				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#delimitersMsg"), msg);
			}
		});
		$('#valdelimiter').keyup(function () {
			$('#delimitersMsg .close').trigger('click');
			if ($('#valdelimiter').val() === "|") {
				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#delimitersMsg"), msg);
			}
		});
	}

	// controllo che valenclosure non sia | e se lo è mostro un alert
	function pipeValEnclosureCheck() {

		$('#dataenclosure').keyup(function () {
			if ($('#dataenclosure').val() === "|" && $('#valenclosure').is(':disabled')) {
				let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#enclosuresMsg"), msg);
			}
		});
		$('#valenclosure').keyup(function () {
			$('#enclosuresMsg .close').trigger('click');
			if ($('#valenclosure').val() === "|") {
				let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
				showAlert($("#enclosuresMsg"), msg);
			}
		});
	}

	function setReset() {
		$('input[data-default-readonly]').each(function (index) {
			$(this).prop('disabled', $(this).data('default-readonly'));
		});
		$('[data-default-open]').each(function (index) {
			//// console.log($(this));
			if ($(this).data('default-open')) {
				$(this).find('.bi-unlock-fill').hide();
				$(this).find('.bi-lock-fill').show();
			} else {
				$(this).find('.bi-unlock-fill').show();
				$(this).find('.bi-lock-fill').hide();
			}
		});
		$('.alert .close').trigger("click");

	}

	lockEnclosures();
	lockDelimiters();

	syncroEnclosuresLookFields();
	syncroDelimiterLookFields();

	pipeValDelimiterCheck();
	pipeValEnclosureCheck();

*/


export default Home;