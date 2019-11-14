import React from "react";
import { Sun, CloudRain, CloudSnow, Cloud, CloudLightning, CloudDrizzle, AlignRight, Droplet, Thermometer, Moon, Wind, Image } from 'react-feather';
import Form from "./Form";
import Forecast from "./Forecast";
import Clock from "./Clock";

export function checkSwitch (icon) {
    switch(icon) {
        case 'Clear':
            if (new Date().getHours() > 6 && new Date().getHours() < 18) {
                return <Moon className="card--today-icon" />
            } else {
                return <Sun className="card--today-icon" />
            }
            break;
        case 'Drizzle':
            return <CloudDrizzle className="card--today-icon" />
            break;
        case 'Rain':
            return <CloudRain className="card--today-icon" />
            break;
        case 'Atmosphere':
            return <AlignRight className="card--today-icon" />
            break;
        case 'Clouds':
            return <Cloud className="card--today-icon" />
            break;
        case 'Snow':
            return <CloudSnow className="card--today-icon" />
            break;
        case 'Thunderstorm':
            return <CloudLightning className="card--today-icon" />
            break;
        default:
            return <Image className="card--today-icon" />
    }
}

class Response extends React.Component {
    render() {
        return (
            <div className="row bg-detail">
                <div className="col-md-4 bg">
                    {checkSwitch(this.props.icon)}
                    <div className="display-3">
                        {this.props.temp}°C
                    </div>
                    <p className="text-capitalize font-weight-bold">{this.props.description}</p>
                </div>
                <div className="col-md detail">
                    <div className="row pb-4 no-gutters line-bottom">
                        <div className="col-md display-4">
                            <Form getWeather={this.props.getWeather} />
                        </div>
                        <div className="col-md display-4 text-center text-md-right">
                            <Clock />
                        </div>
                    </div>
                    <div className="row py-4 no-gutters">
                        <div className="col-md mb-4 mb-md-0 d-flex align-items-center">
                            <div className="icon">
                                <Thermometer />
                            </div>
                            <div className="flex-column">
                                <p className="font-weight-bold">{this.props.temp_min}° | {this.props.temp_max}°</p>
                                <p>Temp. min|max</p>
                            </div>
                        </div>
                        <div className="col-md d-flex align-items-center">
                            <div className="icon">
                                <Droplet />
                            </div>
                            <div className="flex-column">
                                <p className="font-weight-bold">{this.props.humidity} %</p>
                                <p>Humidité</p>
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md mb-4 mb-md-0 d-flex align-items-center">
                            <div className="icon">
                                <Wind />
                            </div>
                            <div className="flex-column">
                                <p className="font-weight-bold">{this.props.wind} m/s</p>
                                <p>Vent</p>
                            </div>
                        </div>
                        <div className="col-md d-flex align-items-center">
                            <div className="icon">
                                <Cloud />
                            </div>
                            <div className="flex-column">
                                <p className="font-weight-bold">{this.props.clouds} %</p>
                                <p>Nuages</p>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4 no-gutters">
                        <div className="col-12 mb-3">
                            <h5>Prévisions / 3h</h5>
                        </div>
                        {this.props.forecast.map((item, index) => (
                            <Forecast
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;
