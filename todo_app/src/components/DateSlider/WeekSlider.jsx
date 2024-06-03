import React from 'react';
import { useTimeInterval } from '../../context/TimeInterval';
import './DateSlider.css';

const DateSlider = () => {
    
    const {date,todayDate,setChangedDate} = useTimeInterval();

    const weekInterval = (date)=>
    {
        const startDate=new Date(date)
        startDate.setDate(startDate.getDate()-startDate.getDay()+1)

        const endDate=new Date(startDate)
        endDate.setDate(endDate.getDate()+6)

        return formatDate(startDate) + " - " + formatDate(endDate);
    }

    const formatDate = (date) => {
        const options = { day: 'numeric' , month: 'short'};
        return date.toLocaleDateString('en-US', options);
    };

    const changeDate = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setChangedDate(newDate);
    };

    return (
        <div className="date-slider">
            <button onClick={() => changeDate(-7)}>&lt;</button>
            <div className="date-display">
                <div className="day">{weekInterval(date)}</div>
                <div className="full-date">Monday to Sunday , {date.getFullYear()}</div>
            </div>
            <button
                type="button" 
                disabled = {(date>=todayDate)?true:false}
                onClick={() => changeDate(7)}
            >&gt;</button>
        </div>
    );
};

export default DateSlider;
