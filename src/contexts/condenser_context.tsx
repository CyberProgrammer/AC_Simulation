import React, {createContext, ReactNode, useContext, useState} from "react";
import {} from "../types/enums"

interface CondenserContextProps{
    callForCooling: boolean;
    setCallForCooling: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CondenserProviderProps{
    children: ReactNode
}

const CondenserContext = createContext<CondenserContextProps | undefined>(undefined)

export const CondenserProvider: React.FC<CondenserProviderProps> = ({children}) => {

    const [callForCooling, setCallForCooling] = useState<boolean>(false);

    return(
        <CondenserContext.Provider value={{
            callForCooling,
            setCallForCooling
        }}>
            {children}
        </CondenserContext.Provider>
    )
}

export const useCondenser = () => {
    const context = useContext(CondenserContext);
    if(context === undefined){
        throw new Error("useFan must be used within a CondenserProvider");
    }
    return context;
}