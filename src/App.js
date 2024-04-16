import './App.css';

import { Routes, Route } from 'react-router-dom';

import Heading from './components/Heading';
import Home from './components/Home';
import Help from './components/Help';
import About from './components/About';

function App() {
	return (
		<div className="App">
			<div className="full-height container-sm" id="container">
				<Heading />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/help" element={<Help />} />
					<Route path="/about" element={<About />} />
					{/* <Route path="/val-generator" element={<ValGenerator />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
