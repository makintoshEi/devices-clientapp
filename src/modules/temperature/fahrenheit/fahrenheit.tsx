import './fahrenheit.css'
import { TemperatureType } from '../temperature.type'

export const Farenheit = (props: TemperatureType) => {
    return <div className="fh-temperature-container">{(+props.currentTemperature * 9) / 5 + 32}F</div>
}
