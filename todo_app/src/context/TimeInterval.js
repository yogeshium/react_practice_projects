import { createContext, useContext } from "react";

const timeIntervalContext = createContext({
    type: "day",
    todayDate: new Date(new Date().setHours(0, 0, 0, 0)),
    date: new Date(),
    changeType: ()=>{},
    setChangedDate:()=>{}
});

export const TimeIntervalContextProvider = timeIntervalContext.Provider;

export const useTimeInterval = ()=>useContext(timeIntervalContext)