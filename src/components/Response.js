import React from "react";
import { Sun, CloudRain, CloudSnow, Cloud, CloudLightning, CloudDrizzle, AlignRight, Droplet, Thermometer, Moon, Wind, Image } from 'react-feather';
import Form from "./Form";
import Forecast from "./Forecast";
import Clock from "./Clock";

export function checkWeatherIcon(icon) {
    const currentHours = new Date().getHours();
    switch(icon) {
        case 'Clear':
            return currentHours > 6 && currentHours < 18 ? <Sun className="weather-icon" /> : <Moon className="weather-icon" />
            break;
        case 'Drizzle':
            return <CloudDrizzle className="weather-icon" />
            break;
        case 'Rain':
            return <CloudRain className="weather-icon" />
            break;
        case 'Clouds':
            return <Cloud className="weather-icon" />
            break;
        case 'Mist':
            return <AlignRight className="weather-icon" />
            break;
        case 'Snow':
            return <CloudSnow className="weather-icon" />
            break;
        case 'Thunderstorm':
            return <CloudLightning className="weather-icon" />
            break;
        default:
            return <Image className="weather-icon" />
    }
}

const Response = props => (
    <div className="row bg">
        <div className="col-md-4 illustration-img">
            {checkWeatherIcon(props.icon)}
            <div className="display-3">
                {props.temp}°C
            </div>
            <p className="text-capitalize font-weight-bold">{props.description}</p>
        </div>
        <div className="col-md container-p">
            <div className="row pb-4 no-gutters line-bottom">
                <div className="col-md display-4">
                    <Form getWeather={props.getWeather} />
                </div>
                <div className="col-md display-4 text-center text-md-right">
                    <Clock />
                </div>
            </div>
            <div className="row no-gutters weather-detail">
                <div className="col-md mb-4 mb-md-0 weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Thermometer />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{props.temp_min}° | {props.temp_max}°</p>
                        <p>Temp. min|max</p>
                    </div>
                </div>
                <div className="col-md weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Droplet />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{props.humidity} %</p>
                        <p>Humidité</p>
                    </div>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-md mb-4 mb-md-0 weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Wind />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{props.wind} m/s</p>
                        <p>Vent</p>
                    </div>
                </div>
                <div className="col-md weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Cloud />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{props.clouds} %</p>
                        <p>Nuages</p>
                    </div>
                </div>
            </div>
            <div className="row my-4 no-gutters">
                <div className="col-12 mb-3">
                    <h4>Prévisions / 3h</h4>
                </div>
                {props.forecast && props.forecast.map((item, index) => (
                    <Forecast
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </div>
    </div>
)

export default Response;
