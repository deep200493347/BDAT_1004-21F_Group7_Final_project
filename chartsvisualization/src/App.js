import BarChart1 from './Components/BarChart1';
import BarChart2 from './Components/BarChart2';
import LineChart1 from './Components/LineChart1';
import BarChart3 from './Components/BarChart3';
import MainLabels from './Components/MainLabels';
import NavBar from './Components/NavBar';

import './App.css';

import { useState } from 'react';




const App = () => {
	

	return (

		<div id="app">
			<NavBar />
			<div className="container">

			

				<div className="row main_labels">

				<MainLabels />
			

				</div>

				<div className="row">

				
				<BarChart1 />
		

				</div>

				<div className="row">
					<BarChart2 />
				</div>

				<div className="row">
					<LineChart1 />
				</div>
				<div className="row">
					<BarChart3 />
				</div>

			</div>

			
		</div>
		
	);
}

export default App;
