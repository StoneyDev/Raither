import React from 'react';
import axios from 'axios';
import moment from "moment";

import Titles from './components/Titles';
import Response from './components/Response';

moment.locale('fr');

const API_KEY = 'bcd6a93bf6dc84270d68f9b866327fcb';

class App extends React.Component {

    state = {
        data: {
            city: '',
            temp: 'N/A',
            temp_min: 'N/A',
            temp_max: 'N/A',
            icon: undefined,
            wind: 'N/A',
            clouds: 'N/A',
            humidity: 'N/A',
            description: undefined,
            forecast: [],
            error: ''
        }
    }

    componentDidMount() {
        setInterval(() => {
            !!(this.state.city) && this.getWeather(this.state.city)
        }, 1800000)
    }

    setCity = (e) => {
        e.preventDefault();
        this.setState({city: e.target.elements.city.value}, () => {
            this.getWeather(this.state.city)
        });
    }

    getWeather = async (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
            .then(res => {
                const all = res.data;
                this.setState({
                    temp: (all.main.temp).toFixed(),
                    temp_min: (all.main.temp_min).toFixed(),
                    temp_max: (all.main.temp_max).toFixed(),
                    wind: (all.wind.speed).toFixed(),
                    clouds: all.clouds.all ? all.clouds.all : "N/A",
                    humidity: all.main.humidity,
                    icon: all.weather[0].main,
                    description: all.weather[0].description,
                    error: ''
                });
                this.getForecast(city);
            })
            .catch(err => {
                const msg = err.response.status === 404 ? 'Aucune ville ne correspond à votre recherche ! Veuillez réessayer.' : 'Une erreur technique est survenue, merci de réessayer ultérieurement.';
                this.setState({
                    error: msg,
                    city: ''
                })
            })
    };

    getForecast = async (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr&cnt=6`)
            .then(res => {
                const all = res.data;
                this.setState({
                    forecast: all.list.map(
                        item => ({
                            date: moment.unix(item.dt).format('D MMM HH:mm'),
                            temp: (item.main.temp).toFixed(),
                            humidity: item.main.humidity,
                            weather: item.weather[0].main
                        })
                    )
                })
            })
            .catch(err => {
                this.setState({
                    error: `Une erreur technique est survenue, merci de réessayer ultérieurement. (${err})`
                })
            })
    }

    render() {
        return (
            <div>
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 offset-md-2 text-center">
                            <Titles />
                            {this.state.error && <p className="text-center mt-4 text-danger">{this.state.error}</p>}
                        </div>
                    </div>
                    <Response
                        setCity={this.setCity}
                        forecast={this.state.forecast}
                        temp={this.state.temp}
                        temp_min={this.state.temp_min}
                        temp_max={this.state.temp_max}
                        icon={this.state.icon}
                        description={this.state.description}
                        wind={this.state.wind}
                        clouds={this.state.clouds}
                        humidity={this.state.humidity}
                    />
                </div>
            </div>
        )
    }
}

export default App;
