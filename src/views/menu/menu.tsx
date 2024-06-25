
import './menu.css';

import Main from "./main/main.tsx";
import React, {useState} from "react";
import EditSchedule from "./schedule/edit/edit_schedule.tsx";
import RemoveSchedule from "./schedule/remove-schedule/remove_schedule.tsx";

interface MenuParams{
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>
}
const Menu = ({setIsNavigationActive}: MenuParams) => {
    const [view, setView] = useState<number>(-1);

    return(
        <>
            <div id={"menu-body"}>
                {view === -1 ? <Main setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 0 ? <EditSchedule setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 1 ? <RemoveSchedule setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
                {view === 2 ? <h1>Equipment</h1> : null}
            </div>
        </>
    )
}

export default Menu;