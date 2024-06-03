import Box from '@mui/material/Box';
import NavBar from "./NavBar";
import Content from './Content';
import {TimeIntervalContextProvider} from '../context/TimeInterval'
import { useState } from 'react';

function Home(){
    const [type,setType] = useState('day');
    const [date,setDate] = useState(new Date());
    const [todayDate,setTodayDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const changeType = (newType)=>{
        setType(newType);
    }

    const setChangedDate = (newDate)=>{
        setDate(newDate);
    }


    return (
        <TimeIntervalContextProvider
            value = {{type,date,todayDate, changeType, setChangedDate}}
        > 
            <div style={{ width: '100%' }}>
                <NavBar/>
                <Content/>
            </div>
        </TimeIntervalContextProvider>
    );
}

export default Home;