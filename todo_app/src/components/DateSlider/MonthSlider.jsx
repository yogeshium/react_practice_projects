import React from 'react';
import { useTimeInterval } from '../../context/TimeInterval';
import './DateSlider.css';

const MonthSlider = () => {

    const {date,todayDate,setChangedDate} = useTimeInterval();

    const formatDate = (date) => {
        const options = { month: 'short', year: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    };

    const changeDate = (month) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + month);
        setChangedDate(newDate);
    };

    return (
        <div className="date-slider">
            <button onClick={() => changeDate(-1)}>&lt;</button>
            <div className="date-display">
                <div className="day">{formatDate(date).split(',')[0]}</div>
            </div>
            <button
                type="button" 
                disabled = {(date>=todayDate)?true:false}
                onClick={() => changeDate(1)}
            >&gt;</button>
        </div>
    );
};

export default MonthSlider;
