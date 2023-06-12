import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {


  const days = props.days.map((day) => {
   
  return (
      <DayListItem
      // where itkey is used???
        key = {day.id} 
        name = { day.name } 
        spots = { day.spots } 
        selected = { day.name === props.day }
        // why props??
        setDay = { props.setDay }
    />
  )
  })

  return (
    <ul>
      {days}
    </ul>
  );
}