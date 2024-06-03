import {DaySlider,MonthSlider,YearSlider,WeekSlider} from './DateSlider'
import { useTimeInterval } from '../context/TimeInterval';

const DateSection = ({timeInterval})=>{
    const {type} = useTimeInterval();

    if(type==='day')
        return (<DaySlider />)
    else if(type==='week')
        return (<WeekSlider />)
    else if(type==='month')
        return (<MonthSlider />)
    else 
        return (<YearSlider />)
}

export default DateSection;