import VirtualThermostat from '@components/thermostat/virtual_thermostat';

import './App.css'

/* Contexts */
import {ScheduleProvider} from "@contexts/schedule_context.tsx";
import {FanProvider} from "@contexts/fan_context.tsx";
import {GeneralProvider} from "@contexts/general_context.tsx";
import {CondenserProvider} from "@contexts/condenser_context.tsx";
import {DatetimeProvider} from "@contexts/datetime_context.tsx";

function App() {

    return (
        <>
            <div id={"app"}>
                <DatetimeProvider>
                    <GeneralProvider>
                        <CondenserProvider>
                            <FanProvider>
                                <ScheduleProvider>
                                    <VirtualThermostat/>
                                </ScheduleProvider>
                            </FanProvider>
                        </CondenserProvider>
                    </GeneralProvider>
                </DatetimeProvider>
            </div>
        </>
    )
}

export default App
