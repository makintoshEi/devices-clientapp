import './App.css'
// import { Dashboard } from './modules/dashboard/dashboard'
import { useState } from 'react'
import { CustomInput } from './shared/CustomInput'
import { Farenheit, Kelvin } from './modules/temperature'

function App() {

  const [value, setValue] = useState<string>("");

  const handleChange = (evt: any) => {
    setValue(evt.target.value)
  }
  return (
    <div className="App">
      <CustomInput placeholder='Temp in °C' handleChange={handleChange} value={value} />
      <Kelvin currentTemperature={value} />
      <Farenheit currentTemperature={value} />
    </div>
  );
}

export default App;
