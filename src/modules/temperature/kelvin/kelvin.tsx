import "./kelvin.css";

export const Kelvin = ({ currentTemperature = 0 }) => {
    return (
        <div className="temperature-container">{currentTemperature + 273.15}</div>
    );
};
