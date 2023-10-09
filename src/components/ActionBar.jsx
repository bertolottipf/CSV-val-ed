import  React from "react";

import './styles/ActionBar.css';

function ActionBar() {

        return (
			<div id="actionBar">
				<div className="float-left btn btn-warning" style={{"marginTop": -50 + "px", "marginBottom": -50 +"px"}} id="errors" >
					Errors found: <span id="nErrors">0</span>
					<div id="errorsNavigation" className="float-right">
						<a href="#" id="prev" className="float-left">▲</a>
						<a href="#" id="next" className="float-left">▼</a>
					</div>
				</div>

				<div className="float-right" id="exports" style={{ "marginTop": -50 +"px", "marginBottom": -50 + "px" }}>
					<button id="exportCSV" className="float-right btn btn-primary">Export HTML table to CSV file</button>
				</div>
			</div>
        );
}

export default ActionBar;
