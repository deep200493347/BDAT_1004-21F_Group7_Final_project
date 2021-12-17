import { useState, useEffect } from 'react';
import axios from 'axios';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart1 = () => {

    const [title_length_state, set_title_length_state] = useState({
		labels: [],
		count: []
	});


	
	

	useEffect(() => {

		const get_release_year_count = async () => {
			const response = await axios.get("https://chartsapi.herokuapp.com/movies/total_revenue_by_title_length");
			console.log(response.data);
			const data = response.data;
			const title_length = Object.keys(data);
			console.log(title_length);
			const title_length_count = title_length.map(title => {
				return parseFloat(data[parseInt(title)].toFixed(2));
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
        <Line data={{
            labels: title_length_state.labels,
            datasets: [{
                label: "Revenue in Millions",
                data: title_length_state.count,
                backgroundColor: "green"
            }]
        }} 
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Movie Earning by Title Length',
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
                text: 'Gross Earnings (Millions)',
              }
              
            },
            },
    
        }}
        
        
        />
    );

}

export default LineChart1;