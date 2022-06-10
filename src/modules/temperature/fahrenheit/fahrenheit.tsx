import './fahrenheit.css'

export const Farenheit = ({ customValue = 0 }) => {
    return <div className="fh-temperature-container">{customValue}</div>
}
