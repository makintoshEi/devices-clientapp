import "./kelvin.css";
import { TemperatureType } from '../temperature.type'

export const Kelvin = (props: TemperatureType) => {
    return (
        <div className="temperature-container">{(+props.currentTemperature + 273.15)}K</div>
    );
};
