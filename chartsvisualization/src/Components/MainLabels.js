import { useEffect, useState } from 'react';
import axios from 'axios';

const MainLabels = () => {

    const [movies, set_movies] = useState([]);
    const [revenue, set_revenue] = useState(0);

    useEffect(() =>{
        const get_label_data = async () => {
			const response = await axios.get("https://chartsapi.herokuapp.com/");
			console.log(response.data);
			const data = response.data.movies;
            set_movies(data);

	

		}

            
        

       get_label_data();

       

        



    },[]);

    useEffect(() =>{

        let sum_ = 0;
            for (const movie of movies) {
                sum_+=movie.revenue
            }
    
        console.log(sum_);
        set_revenue(sum_);



    }, [movies])

    return (
            <>
                <div className="col-md-6 main_label_child" style={{padding: "10px"}}>

                    <div className="card text-white bg-danger mb-3" style={{maxWidth: "18rem"}}>
                        <div className="card-header">Number of Movies</div>
                        <div className="card-body">
                            <h5 className="card-title">{movies.length}</h5>
                        </div>
                        </div>

                </div>

                <div className="col-md-6 main_label_child" style={{padding: "10px"}}>

                <div className="card text-white bg-secondary mb-3" style={{maxWidth: "18rem", alignItems: ""}}>
                    <div className="card-header">Total Revenue</div>
                    <div className="card-body">
                        <h5 className="card-title">${revenue.toFixed(2)} Million</h5>
                    </div>
                    </div>

                </div>

                
            </>
            
       
            
    );

}


export default MainLabels;