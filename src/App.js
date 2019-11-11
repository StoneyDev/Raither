import React from 'react';
import axios from 'axios';

import Titles from './components/Titles';
import Response from './components/Response';
import Form from "./components/Form";

const API_KEY = 'bcd6a93bf6dc84270d68f9b866327fcb';

class App extends React.Component {

  state = {
    temp: undefined,
    temp_min: undefined,
    temp_max: undefined,
    city: undefined,
    icon: undefined,
    description: undefined,
    temp_forecast_1: undefined,
    temp_forecast_2: undefined,
    temp_forecast_3: undefined,
    temp_forecast_4: undefined,
    temp_forecast_5: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
      .then(res => {
        const currentTemp = res.data;
        this.setState(
          {
            temp: (currentTemp.main.temp).toFixed(),
            temp_min: (currentTemp.main.temp_min).toFixed(),
            temp_max: (currentTemp.main.temp_max).toFixed(),
            city: currentTemp.main.name,
            icon: currentTemp.weather[0].main,
            description: currentTemp.weather[0].description
          }
         );
         this.getForecast(city);
      })
      .catch()
  }

  getForecast = async (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5&lang=fr`)
      .then(res => {
        const all = res.data;
        this.setState(
          {
            temp_forecast_1: (all.list[1].main.temp).toFixed()
          }
         );
      })
      .catch()
  }

  render() {
    return (
      <div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <Titles />
                <Form getWeather={this.getWeather} />
            </div>
          </div>
        </div>
        {/*{this.state.temperature && this.state.temp_forecast_1 ? (*/}
        <Response temp={this.state.temp} temp_min={this.state.temp_min} temp_max={this.state.temp_max} temp_forecast_1={this.state.temp_forecast_1} icon={this.state.icon} description={this.state.description} />
        {/*) : (<p>Aucune données</p>)}*/}
      </div>
    )
  }
}

export default App;
