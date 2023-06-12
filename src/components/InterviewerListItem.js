import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
    
  });


  // const formatSpots = () => {
  //   if (props.spots === 0) {
  //     return "no spots remaining";
  //   }
  //   if (props.spots === 1) {
  //     return "1 spot remaining";
  //   }
  //   return `${props.spots} spots remaining`;
  // };


  return (
    <li className={interviewersClass} onClick={() => { props.setInterviewer(props.id); }}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}


