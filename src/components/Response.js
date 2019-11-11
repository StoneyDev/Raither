import React from "react";
import { Sun, CloudRain, CloudSnow, Cloud, CloudLightning, CloudDrizzle, AlignRight, Droplet, Thermometer, Moon, Wind, Eye } from 'react-feather';
import Form from "./Form";
import Item from './Item';

export function checkSwitch (v) {
    switch(v) {
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
    }
}

class Response extends React.Component {

    state = {
        time: new Date()
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    render() {
        return (
            <div className="container">
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
                            <div className="col ">
                                <Form />
                            </div>
                            <div className="col display-4 text-right">
                                {this.state.time.toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="row py-4 no-gutters">
                            <div className="col-md mb-4 mb-md-0 d-flex align-items-center">
                                <div className="icon">
                                    <Thermometer />
                                </div>
                                <div className="flex-column">
                                    <p>{this.props.temp_min}° | {this.props.temp_max}°</p>
                                    <p>Temp. min/max</p>
                                </div>
                            </div>
                            <div className="col-md d-flex align-items-center">
                                <div className="icon">
                                    <Droplet />
                                </div>
                                <div className="flex-column">
                                    <p>{this.props.humidity} %</p>
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
                                    <p>{this.props.wind} km/h</p>
                                    <p>Vent</p>
                                </div>
                            </div>
                            <div className="col-md d-flex align-items-center">
                                <div className="icon">
                                    <Eye />
                                </div>
                                <div className="flex-column">
                                    <p>{this.props.visibility} km</p>
                                    <p>Visibilité</p>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4 no-gutters">
                            <div className="col-12 mb-3">
                                <h5>Prévisions / 3h</h5>
                            </div>
                            {this.props.forecast.map((item, index) => (
                                <Item
                                    key={index}
                                    {...item}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;
