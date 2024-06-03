import * as React from 'react';
import {Tabs,Tab,Box} from '@mui/material';
import { useTimeInterval } from '../context/TimeInterval';


export default function NavBar() {
  const {type,changeType,todayDate,setChangedDate} = useTimeInterval();

  const handleChange = (event, newValue) => {
    changeType(newValue);
    setChangedDate(todayDate);
  };

  return (
    
      <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
        <Tabs 
          value={type} 
          onChange={handleChange} 
          textColor='inherit'
          indicatorColor="secondary"
          centered
        >
          <Tab label="Day" value="day"/>
          <Tab label="Week" value="week"/>
          <Tab label="Month" value="month"/>
          <Tab label="Year" value="year"/>
        </Tabs>
      </Box>
  );
}
