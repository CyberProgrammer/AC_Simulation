
interface NavigationProps{
    setMenu: (val:number) => void;
}
const Navigation:React.FC<NavigationProps> = ({setMenu}) => {

    const handleMenuClick = (val:number) => {
        setMenu(val);
    }

    return(
        <div className={"thermostat-header"}>
            <div className={"thermostat-button-container"}>
                <button className={"thermostat-button"} onClick={() => handleMenuClick(0)}>Home</button>
                <button className={"thermostat-button"} onClick={() => handleMenuClick(1)}>Fan</button>
                <button className={"thermostat-button"} onClick={() => handleMenuClick(2)}>System</button>
                <button className={"thermostat-button"} onClick={() => handleMenuClick(3)}>Menu</button>
            </div>
        </div>
    )
}

export default Navigation;