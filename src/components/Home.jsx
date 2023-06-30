
import React, { useState, useRef } from 'react';
import $ from 'jquery'
// import ReactDOM from 'react-dom/client';

import Validator from './Validator'

import UploadImageForm from './UploadImageForm'
import UploadedImage from './UploadImage'


import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';



function Home() {


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


    //export { setReset }

    const [formValues, setFormValues] = useState({
        csvFile: "",
        valMethod: "file",
        valFile: "",
        //tablestyle: "black",
        dataenclosure: "",
        valenclosure: "",
        datadelimiter: ",",
        valdelimiter: ",",
    });

    const [areEnclosuresLocked, setEnclosuresLocked] = useState(false);
    const [areDelimitersLocked, setDelimitersLocked] = useState(false);

    const [FormVisible, setFormVisible] = useState(true);

    const [uploadedImage, setUploadedImage] = useState();

    const inputFileRef = useRef();

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        alert(`csvFile: ${formValues.csvFile}`);

        e.preventDefault();
        console.log(formValues);
        console.log(inputFileRef?.current?.files);
        setFormVisible(false);

    };

    const handleGoHome = (e) => {
        setFormVisible(true);
    }

    lockEnclosures();
    lockDelimiters();

    syncroEnclosuresLookFields();
    syncroDelimiterLookFields();

    pipeValDelimiterCheck();
    pipeValEnclosureCheck();

    return (
        <>
            {FormVisible ? (
                <>
                    <h2>HOME</h2>
                    <form onSubmit={handleSubmit} className="text-start">

                        <div className="row mb-3">
                            <label className="col-3">File DATA<sub>(*.csv)</sub><span className="text-danger font-weight-bold">*</span>:</label>
                            <input type="file" name="csvFile" id="csvFile" className="col-9" value={formValues.csvFile} onChange={(e) => setFormValues({ csvFile: e.target.value })} required />
                        </div>


                        <div className="row mb-3">
                            <label className='col-3'>File VAL<sub>(*.csv)</sub>:</label>

                            <div id="valFileMethod" className="col-9">
                                {/* <input type="file" name="valFile" id="valFile" value={formValues.valFile} onChange={(e) => setFormValues({ valFile: e.target.value })} /> */}
                                <UploadImageForm
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <UploadedImage uploadedImage={uploadedImage} />
                            </div>

                            <input type="hidden" name="valMethod" />
                        </div>


                        {/* <div id="table_style_cont" className="row mb-3">
                        <label className='col-3'>Table result look</label>
                        
                        <div className="col-9">
                            <input type="radio" name="tablestyle" id="light" value="light" /><label htmlFor="light" style={{ marginRight: "1em" }}>light</label>
                            <input type="radio" name="tablestyle" id="dark" value="dark" defaultChecked /><label htmlFor="dark">dark</label>
                        </div>
                    </div> */}


                        <div className="row">

                            <div className="mb-3 col-6">
                                <label><em>Enclosures</em></label>

                                <div className="row">
                                    <label htmlFor="dataenclosure" className="col-3">Data file</label>
                                    <input type="text" id="dataenclosure" name="dataenclosure" data-original-value="," required="" className="col-2" value={formValues?.dataenclosure} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="row">
                                    <label htmlFor="valenclosure" className="col-3">Val file</label>
                                    <input type="text" id="valenclosure" name="valenclosure" data-original-value="," required="" className="col-2" data-default-readonly="false" disabled={areEnclosuresLocked} value={formValues?.valenclosure} onChange={(e) => handleChange(e)} />
                                    <div id="lockEnclosures" style={{ fontSize: "2em", marginTop: "-0.75em" }} data-default-open="false" role="button" className="ms-0 ps-0">
                                        {areEnclosuresLocked ? (
                                            <i className="bi bi-lock-fill" onClick={() => setEnclosuresLocked(false)}><span className="fs-6">locked</span></i>
                                        ) : (
                                                <i className="bi bi-unlock-fill ms-1" onClick={() => setEnclosuresLocked(true)}><span className="fs-6">unlocked</span></i>
                                            )}
                                    </div>
                                </div>

                                <div id="enclosuresMsg"></div>
                            </div>


                            <div className="mb-3 col-6">
                                <label><em>Delimiters</em></label>

                                <div className="row">
                                    <label htmlFor="datadelimiter" className="col-3">Data file</label>
                                    <input type="text" id="datadelimiter" name="datadelimiter" data-original-value="," required="" className="col-2" value={formValues.datadelimiter} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="row">
                                    <label htmlFor="valdelimiter" className="col-3">Val file</label>
                                    <input type="text" id="valdelimiter" name="valdelimiter" data-original-value="," required="" className="col-2" data-default-readonly="false" disabled={areDelimitersLocked} value={formValues.valdelimiter} onChange={(e) => handleChange(e)} />
                                    <div id="lockDelimiters" style={{ fontSize: "2em", marginTop: "-0.75em" }} data-default-open="false" role="button" className="ms-0 ps-0">
                                        {areDelimitersLocked ? (
                                            <>
                                                <script>console.log(areDelimitersLocked);</script>
                                                <i className="bi bi-lock-fill" onClick={() => setDelimitersLocked(false)}><span className="fs-6">locked</span></i>
                                            </>
                                        ) : (
                                                <>
                                                    <script>console.log(areDelimitersLocked);</script>
                                                    <i className="bi bi-unlock-fill ms-1" onClick={() => setDelimitersLocked(true)}><span className="fs-6">unlocked</span></i>
                                                </>
                                            )}
                                    </div>
                                </div>

                                <div className="row" id="delimitersMsg"></div>
                            </div>

                        </div>

                        <div className="col-6">
                            <input type="submit" value="Validate" name="submit" className="btn btn-primary me-3" />
                            <input type="reset" value="Clear" className="resetter btn btn-secondary me-3" onClick={() => { setReset() }} />
                        </div>
                    </form>
                </>
            ) : (
                    <Validator data={formValues} goHome={handleGoHome} />
                    // <Validator data={formValues} />
                )}
        </>
    );

}


export default Home;
