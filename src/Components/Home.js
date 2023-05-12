import React, { useState, useRef } from "react";
// import ReactDOM from 'react-dom/client';

import Validator from "./Validator.js";

import { setReset } from "../Scripts/Home.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const [formValues, setFormValues] = useState({
    csvFile: csvFile,
    valMethod: valMethod,
    valFile: valFile,
    //tablestyle: "black",
    dataenclosure: dataenclosure,
    valenclosure: valenclosure,
    datadelimiter: datadelimiter,
    valdelimiter: valdelimiter,
  });

  const [csvFile, setCsvFile] = useState("");
  const [valMethod, setValMethod] = useState("");
  const [valFile, setValFile] = useState("");
  const [tablestyle, setTablestyle] = useState("");
  const [dataenclosure, setDataenclosure] = useState("");
  const [valenclosure, setValenclosure] = useState("");
  const [datadelimiter, setDatadelimiter] = useState("");
  const [valdelimiter, setValdelimiter] = useState("");

  const [isFormVisible, setIsFormVisible] = useState(true);

  const inputFileRef = useRef();

  const handleSubmit = (e) => {
    alert(
      `csvFile: ${csvFile}\n valFile: ${valFile}\n datadelimiter: ${datadelimiter}`
    );

    e.preventDefault();
    console.log(inputFileRef?.current?.files);
    setIsFormVisible(false);
  };

  const handleGoHome = (e) => {
    setIsFormVisible(true);
  };

  return (
    <>
      {isFormVisible ? (
        <>
          <h2>HOME</h2>
          <form onSubmit={handleSubmit} className="text-start">
            <div className="row mb-3">
              <label className="col-3">
                File DATA<sub>(*.csv)</sub>
                <span className="text-danger font-weight-bold">*</span>:
              </label>
              <input
                type="file"
                name="csvFile"
                id="csvFile"
                className="col-9"
                value={csvFile}
                onChange={(e) => setCsvFile(e.target.value)}
                required
              />
            </div>

            <div className="row mb-3">
              <label className="col-3">
                File VAL<sub>(*.csv)</sub>:
              </label>

              <div id="valFileMethod" className="col-9">
                <input
                  type="file"
                  name="valFile"
                  id="valFile"
                  value={formValues.valFile}
                  onChange={(e) => setFormValues({ valFile: e.target.value })}
                />
                <a role="button" href="/val-generator">
                  <button
                    type="button"
                    className="btn btn-warning"
                    id="go_home"
                  >
                    <i className="bi bi-gear-fill"></i> Generate new one
                  </button>
                </a>
              </div>

              <input type="hidden" name="valMethod" />
            </div>

             <div id="table_style_cont" className="row mb-3">
                        <label className='col-3'>Table result look</label>
                        
                        <div className="col-9">
                            <input type="radio" name="tablestyle" id="light" value="light" /><label htmlFor="light" style={{ marginRight: "1em" }}>light</label>
                            <input type="radio" name="tablestyle" id="dark" value="dark" defaultChecked /><label htmlFor="dark">dark</label>
                        </div>
                    </div> 

            <div className="row">
              <div className="mb-3 col-6">
                <label>
                  <em>Enclosures</em>
                </label>

                <div className="row">
                  <label htmlFor="dataenclosure" className="col-3">
                    Data file
                  </label>
                  <input
                    type="text"
                    id="dataenclosure"
                    name="dataenclosure"
                    data-original-value=","
                    required=""
                    className="col-2"
                    value={formValues?.dataenclosure}
                    onChange={(e) =>
                      setFormValues({ dataenclosure: e.target.value })
                    }
                  />
                </div>

                <div className="row">
                  <label htmlFor="valenclosure" className="col-3">
                    Val file
                  </label>
                  <input
                    type="text"
                    id="valenclosure"
                    name="valenclosure"
                    data-original-value=","
                    required=""
                    className="col-2"
                    data-default-readonly="false"
                    value={formValues?.valenclosure}
                    onChange={(e) =>
                      setFormValues({ valenclosure: e.target.value })
                    }
                  />
                  <div
                    id="lockEnclosures"
                    style={{ fontSize: "2em", marginTop: "-0.75em" }}
                    data-default-open="false"
                    role="button"
                    className="ms-0 ps-0"
                  >
                    <i className="bi bi-lock-fill">
                      <span className="fs-6">locked</span>
                    </i>
                    <i className="bi bi-unlock-fill ms-1">
                      <span className="fs-6">unlocked</span>
                    </i>
                  </div>
                </div>

                <div id="enclosuresMsg"></div>
              </div>*/}
            <div>
              <div className="mb-3 col-6">
                <label>
                  <em>Delimiters</em>
                </label>

                <div className="row">
                  <label htmlFor="datadelimiter" className="col-3">
                    Data file
                  </label>
                  <input
                    type="text"
                    id="datadelimiter"
                    name="datadelimiter"
                    data-original-value=","
                    required=""
                    className="col-2"
                    value={datadelimiter}
                    onChange={(e) => setDatadelimiter(e.target.value)}
                  />
                </div>
                <div className="row">
                  <label htmlFor="valdelimiter" className="col-3">
                    Val file
                  </label>
                  <input
                    type="text"
                    id="valdelimiter"
                    name="valdelimiter"
                    data-original-value=","
                    required=""
                    className="col-2"
                    data-default-readonly="false"
                    value={valdelimiter}
                    onChange={(e) => setValdelimiter(e.target.value)}
                  />
                  <div
                    id="lockDelimiters"
                    style={{ fontSize: "2em", marginTop: "-0.75em" }}
                    data-default-open="false"
                    role="button"
                    className="ms-0 ps-0"
                  >
                    <i className="bi bi-lock-fill">
                      <span className="fs-6">locked</span>
                    </i>
                    <i className="bi bi-unlock-fill ms-1">
                      <span className="fs-6">unlocked</span>
                    </i>
                  </div>
                </div>

                <div className="row" id="delimitersMsg"></div>
              </div>
            </div>

            <div className="col-6">
              <input
                type="submit"
                value="Validate"
                name="submit"
                className="btn btn-primary me-3"
              />
              <input
                type="reset"
                value="Clear"
                className="resetter btn btn-secondary me-3"
                onClick={() => {
                  setReset();
                }}
              />
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
