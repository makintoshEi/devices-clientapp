import './App.css'
// import { Dashboard } from './modules/dashboard/dashboard'
import { CustomInput } from './shared/CustomInput'
import { Farenheit, Kelvin } from './modules/temperature'

function App() {


  return (
    <div className="App">
      <CustomInput placeholder='Temp in °C'>
        {(value: string) => (
          <>
            <Kelvin currentTemperature={value} />
            <Farenheit currentTemperature={value} />
          </>
        )}
      </CustomInput>
    </div>
  );
}

export default App;
