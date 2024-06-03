import React from 'react';
import { useTimeInterval } from '../../context/TimeInterval';
import './DateSlider.css';

const DateSlider = () => {
    const {date,todayDate,setChangedDate} = useTimeInterval();

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const changeDate = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setChangedDate(newDate);
    };

    return (
        <div className="date-slider">
            <button onClick={() => changeDate(-1)}>&lt;</button>
            <div className="date-display">
                <div className="day">{formatDate(date).split(',')[0]}</div>
                <div className="full-date">{formatDate(date).split(',').slice(1).join(', ')}</div>
            </div>
            <button
                type="button" 
                disabled = {(date>=todayDate)?true:false}
                onClick={() => changeDate(1)}
            >&gt;</button>
        </div>
    );
};

export default DateSlider;
