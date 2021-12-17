import { useState, useEffect } from 'react';
import axios from 'axios';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
      } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
      );

const BarChart1 = () => {

    const [release_year_state, set_release_year_state] = useState({
		count: []
	});


	
	

	useEffect(() => {

		const get_release_year_count = async () => {
			const response = await axios.get("https://chartsapi.herokuapp.com/movies/release_year_count");
			console.log(response.data);
			const data = response.data;
			const release_year = Object.keys(data);
			console.log(release_year);
			const release_year_count = release_year.map(year => {
				return data[parseInt(year)];
			})
			console.log(release_year_count)
			set_release_year_state({
				count: release_year_count
			});
	
			console.log(release_year_state);
		}

		get_release_year_count();

		

		
	}, []);



    return (
        <Bar data={{
            labels: ["1921-1930", "1931-1940", "1941-1950", "1951-1960", "1961-1970", "1971-1980", "1981-1990", "1991-2000", "2001-2010", "2011-2020", "2021-2030"],
            datasets: [{
                label: "Release Year Movies Count By Year",
                data: release_year_state.count,
                backgroundColor: "rgba(53, 114, 175,175)"
            }]

        }}
		
		options={{
			plugins: {
				title: {
				  display: true,
				  text: 'Release Year Movies Count By Year',
				},
			  },
			  responsive: true,
			  scales: {
				x: {
				  display: true,
				  title: {
					  display: true,
					  text: 'Year'
				  }
				
				},
				y: {

					display: true,
				  title: {
					  display: true,
					  text: 'Number of Movies'
				  }
				  
				},
			  },

		}}
		
		/>
    );

}

export default BarChart1;