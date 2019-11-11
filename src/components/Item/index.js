import React from 'react';
import {checkSwitch} from "../Response";

const Forecast = props => (
    <div className="col forecast">
        {checkSwitch(props.weather)}
        <h4 className="my-2">{props.temp}°</h4>
        <p className="small">{props.date}</p>
    </div>
);

export default Forecast;