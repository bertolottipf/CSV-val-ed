import * as React from "react";
import logo from "../images/CSVValED.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Heading.css';
import { Link } from "react-router-dom";

class Heading extends React.Component {
    render() {
        return (
            <h1 className="text-left" >
                <span className="badge bg-warning" id="help" role="button">
                    <Link to="/help">
                        <i className="bi bi-question-diamond-fill"></i>
                    </Link>
                </span>

                <Link to="/">
                    <img src={logo} alt="CSVValEd" />
                </Link>

                <span className="badge bg-primary" id="about" role="button">
                    <Link to="/about">
                        <i className="bi bi-exclamation-diamond-fill"></i>
                    </Link>
                </span>
            </h1>
        );
    }
}

export default Heading;
