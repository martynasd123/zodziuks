import React, {createContext, useCallback, useEffect, useState} from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({children}){
    const [toast, setToast] = useState(null);
    useEffect(() => {
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);
    return(
        <ToastContext.Provider value={{setToast, toast}}>
            {children}
        </ToastContext.Provider>
    )
}