import './navigation.css'

interface NavigationProps{
    menu: number;
    setMenu: (val:number) => void;
}
const Navigation:React.FC<NavigationProps> = ({menu, setMenu}) => {

    const handleMenuClick = (val:number) => {
        setMenu(val);
    }

    return(
        <div className={"thermostat-header"}>
            <div className={"thermostat-button-container"}>
                <button className={`thermostat-button ${menu === 0 ? 'selected' : ''}`} onClick={() => handleMenuClick(0)}>Home</button>
                <button className={`thermostat-button ${menu === 1 ? 'selected' : ''}`} onClick={() => handleMenuClick(1)}>Fan</button>
                <button className={`thermostat-button ${menu === 2 ? 'selected' : ''}`} onClick={() => handleMenuClick(2)}>System</button>
                <button className={`thermostat-button ${menu === 3 ? 'selected' : ''}`} onClick={() => handleMenuClick(3)}>Menu</button>
            </div>
        </div>
    )
}

export default Navigation;