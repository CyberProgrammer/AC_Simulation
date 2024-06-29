
// noinspection t

import './menu.css';

import Main from "./main/main.tsx";
import React, {useEffect, useState} from "react";
import EditSchedule from "./edit_schedule/edit_schedule.tsx";
import RemoveSchedule from "./remove_schedule/remove_schedule.tsx";
import SelectTimeOrDate from "./time_date/select_time_or_date.tsx";

interface MenuParams{
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>
}
const Menu = ({setIsNavigationActive}: MenuParams) => {
    const [view, setView] = useState<number>(-1);

    useEffect(() => {
        if(view === 3)
            setIsNavigationActive(false);
        else
            setIsNavigationActive(true);

    }, [setIsNavigationActive, view]);

    return(
        <>
            <div id={"menu-body"}>
                {view === -1 ? <Main setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 0 ? <EditSchedule setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 1 ? <RemoveSchedule setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 2 ? <h1>Equipment</h1> : null}
                {view === 3 ? <SelectTimeOrDate setView={setView} /> : null}
                {view === 4 ? <h1>Clean Screen</h1> : null}
                {view === 5 ? <h1>Security Settings</h1> : null}
            </div>
        </>
    )
}

export default Menu;