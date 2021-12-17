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

    const [title_length_state, set_title_length_state] = useState({
		labels: [],
		count: []
	});


	
	

	useEffect(() => {

		const get_release_year_count = async () => {
			const response = await axios.get("https://chartsapi.herokuapp.com/movies/movie_count_by_title_length");
			console.log(response.data);
			const data = response.data;
			const title_length = Object.keys(data);
			console.log(title_length);
			const title_length_count = title_length.map(title => {
				return data[parseInt(title)];
			})
			console.log(title_length_count);
			set_title_length_state({
				labels: title_length,
				count: title_length_count
			});
	

		}

		get_release_year_count();

		

		
	}, []);



    return (
        <Bar data={{
            labels: title_length_state.labels,
            datasets: [{
                label: "Number of movies",
                data: title_length_state.count,
                backgroundColor: "pink"
            }]
        }} 
		
		options={{
			plugins: {
				title: {
				  display: true,
				  text: 'Number of Movies by Title Length',
				},
			  },
			  responsive: true,
			  scales: {
				x: {
				  display: true,
				  title: {
					  display: true,
					  text: 'Title Length (Words)',
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