import React from 'react';
import "./styles.scss";

import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";

import { useVisualMode } from  "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
console.log("line10", props)
  return (
    <>
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty/>} 
    </article>
    </>
  );
}