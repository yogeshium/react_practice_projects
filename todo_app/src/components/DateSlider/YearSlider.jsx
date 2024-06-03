import React from 'react';
import { useTimeInterval } from '../../context/TimeInterval';
import './DateSlider.css';

const DateSlider = () => {
    const {date,todayDate,setChangedDate} = useTimeInterval();

    const changeDate = (yr) => {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + yr);
        setChangedDate(newDate);
    };

    return (
        <div className="date-slider">
            <button onClick={() => changeDate(-1)}>&lt;</button>
            <div className="date-display">
                <div className="day">{date.getFullYear()}</div>
                <div className="full-date">{}</div>
            </div>
            <button
                type="button" 
                disabled = {(date.getFullYear()>=todayDate.getFullYear())?true:false}
                onClick={() => changeDate(1)}
            >&gt;</button>
        </div>
    );
};

export default DateSlider;
