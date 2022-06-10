import './fahrenheit.css'

export const Farenheit = ({ currentTemperature = 0 }) => {
    return <div className="fh-temperature-container">{(currentTemperature * 9) / 5 + 32}F</div>
}
