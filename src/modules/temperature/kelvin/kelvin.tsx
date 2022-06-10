import "./kelvin.css";

type KelvinType = {
    currentTemperature: number
}

export const Kelvin = (props: KelvinType) => {
    return (
        <div className="temperature-container">{(props.currentTemperature + 273.15)}K</div>
    );
};
