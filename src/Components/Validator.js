import React from "react";

function Validator({ data, goHome }) {
  // function  Validator({data}) {
  console.log(">>> " + JSON.stringify(data));
  return (
    <>
      <h2>Validator</h2>
      <div>
        <p>csvFile: {data.csvFile}</p>
        <p>valMethod: {data.valMethod}</p>
        <p>valFile: {data.valFile}</p>
        <p>{/*tablestyle: {data.tablestyle: "black}*/}</p>
        <p>dataenclosure: {data.dataenclosure}</p>
        <p>valenclosure: {data.valenclosure}</p>
        <p>datadelimiter: {data.datadelimiter}</p>
        <p>valdelimiter: {data.valdelimiter}</p>
      </div>
      <input type="button" onClick={goHome} value="input back" />
      <button type="button" onClick={goHome}>
        button back
      </button>
    </>
  );
}

export default Validator;
