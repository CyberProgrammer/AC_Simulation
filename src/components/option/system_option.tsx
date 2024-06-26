
interface SystemOptionParams{
    className: string;
    selectedSetting: number;
    selectedVal: number;
    text: string;
}
const SystemOption = ({className, selectedSetting, selectedVal, text}:SystemOptionParams) => {
    return (
        <p className={`${className} ${selectedSetting === selectedVal ? 'selected' : ''}`}>{text}</p>
    )
}

export default SystemOption;