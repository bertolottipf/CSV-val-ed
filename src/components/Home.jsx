
// import React, { useState, Component } from 'react';
// // import axios from 'axios';
// import $ from 'jquery'

// import Validator from './Validator'

// import UploadImageForm from './UploadImageForm'
// import UploadedImage from './UploadImage'


// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/Home.css';



// function Home() {


// 	// gestione lucchetti
// 	// ...disabilita campi e controlla il carattere |
// 	function lockEnclosures() {
// 		$('#lockEnclosures').click(function () {
// 			$("#valenclosure").val($("#dataenclosure").val());
// 			$("#valenclosure").prop("disabled", !$("#valenclosure").prop("disabled"));

// 			if ($("#valenclosure").prop("disabled") === true) {
// 				syncroDelimiterLookFields();
// 			}
// 			$('#enclosuresMsg .close').trigger('click');

// 			if ($('#valenclosure').val() === "|") {
// 				let msg = "if <em>enclosure</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#enclosuresMsg"), msg);
// 			}

// 		});
// 	}

// 	// ...disabilita campi e controlla il carattere |
// 	function lockDelimiters() {
// 		$('#lockDelimiters').click(function () {
// 			$("#valdelimiter").val($("#datadelimiter").val());
// 			$("#valdelimiter").prop("disabled", !$("#valdelimiter").prop("disabled"));

// 			if ($("#valdelimiter").prop("disabled") === true) {
// 				syncroDelimiterLookFields();
// 			}
// 			$('#delimitersMsg .close').trigger('click');

// 			if ($('#valdelimiter').val() === "|") {
// 				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#delimitersMsg"), msg);
// 			}

// 			//lockIconsDelimiters();
// 		})
// 	}

// 	// ...sincronizzazione campi enclosures bloccati
// 	function syncroEnclosuresLookFields() {
// 		$('#dataenclosure').keyup(function () {
// 			let isDisabled = $('#valenclosure').is(':disabled')
// 			if (isDisabled) {
// 				$('#valenclosure').val($('#dataenclosure').val());
// 				pipeValEnclosureCheck();
// 			}
// 		});
// 	}

// 	// ...sincronizzazione campi delimiters bloccati
// 	function syncroDelimiterLookFields() {
// 		$('#datadelimiter').keyup(function () {
// 			let isDisabled = $('#valdelimiter').is(':disabled')
// 			if (isDisabled) {
// 				$('#valdelimiter').val($('#datadelimiter').val());
// 				pipeValDelimiterCheck();
// 			}
// 		});
// 	}

// 	// mostro un alert nell'elemento el col messaggio msg
// 	function showAlert(el, msg) {
// 		$(el).html('<div class="alert alert-info show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
// 	}

// 	// controllo che valdelimiter non sia | e se lo è mostro un alert
// 	function pipeValDelimiterCheck() {

// 		$('#datadelimiter').keyup(function () {
// 			if ($('#datadelimiter').val() === "|" && $('#valdelimiter').is(':disabled')) {
// 				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#delimitersMsg"), msg);
// 			}
// 		});
// 		$('#valdelimiter').keyup(function () {
// 			$('#delimitersMsg .close').trigger('click');
// 			if ($('#valdelimiter').val() === "|") {
// 				let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#delimitersMsg"), msg);
// 			}
// 		});
// 	}

// 	// controllo che valenclosure non sia | e se lo è mostro un alert
// 	function pipeValEnclosureCheck() {

// 		$('#dataenclosure').keyup(function () {
// 			if ($('#dataenclosure').val() === "|" && $('#valenclosure').is(':disabled')) {
// 				let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#enclosuresMsg"), msg);
// 			}
// 		});
// 		$('#valenclosure').keyup(function () {
// 			$('#enclosuresMsg .close').trigger('click');
// 			if ($('#valenclosure').val() === "|") {
// 				let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
// 				showAlert($("#enclosuresMsg"), msg);
// 			}
// 		});
// 	}

// 	function setReset() {
// 		$('input[data-default-readonly]').each(function (index) {
// 			$(this).prop('disabled', $(this).data('default-readonly'));
// 		});
// 		$('[data-default-open]').each(function (index) {
// 			//// console.log($(this));
// 			if ($(this).data('default-open')) {
// 				$(this).find('.bi-unlock-fill').hide();
// 				$(this).find('.bi-lock-fill').show();
// 			} else {
// 				$(this).find('.bi-unlock-fill').show();
// 				$(this).find('.bi-lock-fill').hide();
// 			}
// 		});
// 		$('.alert .close').trigger("click");

// 	}

// 	lockEnclosures();
// 	lockDelimiters();

// 	syncroEnclosuresLookFields();
// 	syncroDelimiterLookFields();

// 	pipeValDelimiterCheck();
// 	pipeValEnclosureCheck();

// 	const [formValues, setFormValues] = useState({
// 		csvFile: "",
// 		valMethod: "file",
// 		valFile: "",
// 		//tablestyle: "black",
// 		dataenclosure: "",
// 		valenclosure: "",
// 		datadelimiter: ",",
// 		valdelimiter: ",",
// 	});

// 	const [areEnclosuresLocked, setEnclosuresLocked] = useState(false);
// 	const [areDelimitersLocked, setDelimitersLocked] = useState(false);

// 	const [FormVisible, setFormVisible] = useState(true);

// 	const [uploadedImage, setUploadedImage] = useState();

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		//console.log(e.target.value);

// 		//console.log(name, value);

// 		setFormValues({ ...formValues, [name]: value });
// 		console.log(JSON.stringify(formValues));
// 	};

// 	const handleSubmit = (e) => {
// 		// alert(`csvFile: ${formValues.csvFile}`);

// 		e.preventDefault();


// 		console.log(formValues);
// 		// console.log(inputFileRef?.current?.files);
// 		setFormVisible(false);

// 	};

// 	const handleGoHome = (e) => {
// 		setFormVisible(true);
// 	}

// 	lockEnclosures();
// 	lockDelimiters();

// 	syncroEnclosuresLookFields();
// 	syncroDelimiterLookFields();

// 	pipeValDelimiterCheck();
// 	pipeValEnclosureCheck();

// 	return (
// 		<>
// 			{FormVisible ? (
// 				<>
// 					<h2>HOME</h2>
// 					<form onSubmit={handleSubmit} className="text-start">

// 						<div className="row mb-3">
// 							<label className="col-3">File DATA<sub>(*.csv)</sub><span className="text-danger font-weight-bold">*</span>:</label>
// 							{/* <input type="file" name="csvFile" id="csvFile" className="col-9" value={formValues.csvFile} onChange={(e) => setFormValues({ csvFile: e.target.files[0].value })} required /> */}
// 							<input type="file" name="csvFile" id="csvFile" className="col-9" value={formValues.csvFile} onChange={(e) => handleChange(e)} required />
// 						</div>


// 						<div className="row mb-3">
// 							<label className='col-3'>File VAL<sub>(*.csv)</sub>:</label>

// 							<div id="valFileMethod" className="col-9">
// 								{/* <input type="file" name="valFile" id="valFile" value={formValues.valFile} onChange={(e) => setFormValues({ valFile: e.target.value })} /> */}
// 								<input type="file" name="valFile" id="valFile" value={formValues.valFile} onChange={(e) => handleChange(e)} />
// 								{/* <UploadImageForm
// 									uploadedImage={uploadedImage}
// 									setUploadedImage={setUploadedImage}
// 								/>
// 								<UploadedImage uploadedImage={uploadedImage} /> */}
// 							</div>

// 							<input type="hidden" name="valMethod" />
// 						</div>


// 						{/* <div id="table_style_cont" className="row mb-3">
//                         <label className='col-3'>Table result look</label>

//                         <div className="col-9">
//                             <input type="radio" name="tablestyle" id="light" value="light" /><label htmlFor="light" style={{ marginRight: "1em" }}>light</label>
//                             <input type="radio" name="tablestyle" id="dark" value="dark" defaultChecked /><label htmlFor="dark">dark</label>
//                         </div>
//                     </div> */}


// 						<div className="row">

// 							<div className="mb-3 col-6">
// 								<label><em>Enclosures</em></label>

// 								<div className="row">
// 									<label htmlFor="dataenclosure" className="col-3">Data file</label>
// 									<input type="text" id="dataenclosure" name="dataenclosure" data-original-value="," required="" className="col-2" value={formValues?.dataenclosure} onChange={(e) => handleChange(e)} />
// 								</div>

// 								<div className="row">
// 									<label htmlFor="valenclosure" className="col-3">Val file</label>
// 									<input type="text" id="valenclosure" name="valenclosure" data-original-value="," required="" className="col-2" data-default-readonly="false" disabled={areEnclosuresLocked} value={formValues?.valenclosure} onChange={(e) => handleChange(e)} />
// 									<div id="lockEnclosures" style={{ fontSize: "2em", marginTop: "-0.75em" }} data-default-open="false" role="button" className="ms-0 ps-0">
// 										{areEnclosuresLocked ? (
// 											<i className="bi bi-lock-fill" onClick={() => setEnclosuresLocked(false)}><span className="fs-6">locked</span></i>
// 										) : (
// 												<i className="bi bi-unlock-fill ms-1" onClick={() => setEnclosuresLocked(true)}><span className="fs-6">unlocked</span></i>
// 											)}
// 									</div>
// 								</div>

// 								<div id="enclosuresMsg"></div>
// 							</div>


// 							<div className="mb-3 col-6">
// 								<label><em>Delimiters</em></label>

// 								<div className="row">
// 									<label htmlFor="datadelimiter" className="col-3">Data file</label>
// 									<input type="text" id="datadelimiter" name="datadelimiter" data-original-value="," required="" className="col-2" value={formValues.datadelimiter} onChange={(e) => handleChange(e)} />
// 								</div>
// 								<div className="row">
// 									<label htmlFor="valdelimiter" className="col-3">Val file</label>
// 									<input type="text" id="valdelimiter" name="valdelimiter" data-original-value="," required="" className="col-2" data-default-readonly="false" disabled={areDelimitersLocked} value={formValues.valdelimiter} onChange={(e) => handleChange(e)} />
// 									<div id="lockDelimiters" style={{ fontSize: "2em", marginTop: "-0.75em" }} data-default-open="false" role="button" className="ms-0 ps-0">
// 										{areDelimitersLocked ? (
// 											<>
// 												<script>console.log(areDelimitersLocked);</script>
// 												<i className="bi bi-lock-fill" onClick={() => setDelimitersLocked(false)}><span className="fs-6">locked</span></i>
// 											</>
// 										) : (
// 												<>
// 													<script>console.log(areDelimitersLocked);</script>
// 													<i className="bi bi-unlock-fill ms-1" onClick={() => setDelimitersLocked(true)}><span className="fs-6">unlocked</span></i>
// 												</>
// 											)}
// 									</div>
// 								</div>

// 								<div className="row" id="delimitersMsg"></div>
// 							</div>

// 						</div>

// 						<div className="col-6">
// 							<input type="submit" value="Validate" name="submit" className="btn btn-primary me-3" />
// 							<input type="reset" value="Clear" className="resetter btn btn-secondary me-3" onClick={() => { setReset() }} />
// 						</div>
// 					</form>
// 				</>
// 			) : (
// 					<Validator data={formValues} goHome={handleGoHome} />
// 					// <Validator data={formValues} />
// 				)}
// 		</>
// 	);

// }


// export default Home;










import React, { useState, useRef, Component } from 'react';
// // import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';
import { saveAs } from 'file-saver';
import $ from 'jquery';
import {Buffer} from 'buffer';

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

	const parseCSVData = (data) => {
		const rows = data.split('\n');
		const parsedData = rows.map((row) => {
			const cells = row.split(dataDelimiter);
			return cells.map((cell) => cell.replace(valEnclosure, ''));
		});
		setCsvData(parsedData);
	};

	React.useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target.result;
			parseCSVData(content);
		};
		reader.readAsText(csvFile);
	}, [csvFile, dataDelimiter, valEnclosure]);

	const handleCellEdit = (rowIndex, cellIndex, value) => {
		const updatedData = [...csvData];
		const rowN = rowIndex + 1;
		updatedData[rowN][cellIndex] = value;
		setCsvData(updatedData);
	};

	return (
		<div>
			<table className="table table-striped table-responsive">
				<thead>
					<tr>
						{csvData.length > 0 &&
							csvData[0].map((item, index) => (
								<th key={index}>{item}</th>
							))}
					</tr>
				</thead>
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
								>
									{item}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={onReset}>Back</button>
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