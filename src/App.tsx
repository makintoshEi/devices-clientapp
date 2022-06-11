import './App.css'
// import { Dashboard } from './modules/dashboard/dashboard'
import { CustomInput } from './shared/CustomInput'
import { Farenheit, Kelvin } from './modules/temperature'

function App() {


  return (
    <div className="App">
      <CustomInput placeholder='Temp in °C'
        renderProp={(value: string) => (
          <>
            <Kelvin currentTemperature={value} />
            <Farenheit currentTemperature={value} />
          </>
        )} />
    </div>
  );
}

export default App;
