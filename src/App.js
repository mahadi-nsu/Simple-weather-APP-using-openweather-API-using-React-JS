import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "48b0c5fe39d7f2112578c50444316b97";

class App extends React.Component{

	state = {
		temperature  : undefined,
		city : undefined,
		country : undefined,
		humidity : undefined,
		description : undefined,
		error : undefined
	}


//function that introduced props in form component
  getWeather = async(e) =>{
       

  	e.preventDefault();

  	//taking input values from the form 
  	const city  = e.target.elements.city.value;
  	const country = e.target.elements.country.value;
    

    //API calls
  	const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},$ {country}&appid=${API_KEY}`);
  	const data = await api_call.json();
  	console.log(data); //just to see the JSON data on console

  	if(city && country)
  	{
  		this.setState({

  		temperature  : data.main.temp,
		city : data.name,
		country : data.sys.country,
		humidity : data.main.humidity,
		description : data.weather[0].description,
		error : ""

  	});
  	}
  	  	else
  	{
  		this.setState({

  		temperature  : undefined,
		city : undefined,
		country : undefined,
		humidity : undefined,
		description : undefined,
		error : "Enter the values Please"

  	});
  	}
  }


  render(){
    return (
        <div>
           <Title/>
           <Form getWeather = {this.getWeather}/>

           
           <Weather
               temperature = {this.state.temperature}
               city = {this.state.city}
               country = {this.state.country}
               humidity = {this.state.humidity}
               description = {this.state.description}
               error = {this.state.error}


           />
        </div>
      );
  }
};

export default App;