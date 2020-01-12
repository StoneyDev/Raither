import React from "react";
import { Sun, CloudRain, CloudSnow, Cloud, CloudLightning, CloudDrizzle, AlignRight, Droplet, Thermometer, Moon, Wind, Image } from 'react-feather';
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

const Response = ({icon, description, temp, setCity, temp_min, temp_max, humidity, wind, clouds, forecast}) => (
    <div className="row bg">
        <div className="col-md-4 illustration-img">
            {checkWeatherIcon(icon)}
            <div className="display-3">
                {temp}°C
            </div>
            <p className="text-capitalize font-weight-bold">{description}</p>
        </div>
        <div className="col-md container-p">
            <div className="row pb-4 no-gutters line-bottom">
                <div className="col-md display-4">
                    <form onSubmit={setCity}>
                        <input type="text" className="form-control form-control-lg text-center text-md-left text-capitalize custom-input" name="city" placeholder="Votre ville" required />
                    </form>
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
                        <p className="font-weight-bold">{temp_min}° | {temp_max}°</p>
                        <p>Temp. min|max</p>
                    </div>
                </div>
                <div className="col-md weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Droplet />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{humidity} %</p>
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
                        <p className="font-weight-bold">{wind} m/s</p>
                        <p>Vent</p>
                    </div>
                </div>
                <div className="col-md weather-detail--item">
                    <div className="weather-detail--item-icon">
                        <Cloud />
                    </div>
                    <div className="weather-detail--item-data">
                        <p className="font-weight-bold">{clouds} %</p>
                        <p>Nuages</p>
                    </div>
                </div>
            </div>
            <div className="row my-4 no-gutters">
                <div className="col-12 mb-3">
                    <h4>Prévisions / 3h</h4>
                </div>
                {forecast ? (
                    forecast.map((item, index) => (
                        <Forecast
                            key={index}
                            {...item}
                        />
                    ))
                ) : (
                    <p>Aucune prévision disponible !</p>
                )}
            </div>
        </div>
    </div>
)

export default Response;
