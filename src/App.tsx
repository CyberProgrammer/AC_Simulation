import VirtualThermostat from '@components/thermostat/virtual_thermostat';

import './App.css'

/* Contexts */
import {ScheduleProvider} from "@contexts/schedule_context.tsx";

function App() {

    return (
        <>
            <div id={"app"}>

                        <ScheduleProvider>
                            <VirtualThermostat/>
                        </ScheduleProvider>

            </div>
        </>
    )
}

export default App
