import './navigation.css'

import {SystemStatus} from "../../types/enums";

interface NavigationProps{
    menu: number;
    status: SystemStatus;
    setMenu: (val:number) => void;
}
const Navigation:React.FC<NavigationProps> = ({menu, status, setMenu}) => {

    const handleMenuClick = (val:number) => {
        setMenu(val);
    }

    return(
        <div className={"thermostat-header"}>
            <div className={"thermostat-button-container"}>
                <button className={`thermostat-button ${menu === 0 ? 'selected' : ''}`} disabled={status === SystemStatus.Wait} onClick={() => handleMenuClick(0)}>Home</button>
                <button className={`thermostat-button ${menu === 1 ? 'selected' : ''}`} disabled={status === SystemStatus.Wait} onClick={() => handleMenuClick(1)}>Fan</button>
                <button className={`thermostat-button ${menu === 2 ? 'selected' : ''}`} disabled={status === SystemStatus.Wait} onClick={() => handleMenuClick(2)}>System</button>
                <button className={`thermostat-button ${menu === 3 ? 'selected' : ''}`} disabled={status === SystemStatus.Wait} onClick={() => handleMenuClick(3)}>Menu</button>
            </div>
        </div>
    )
}

export default Navigation;