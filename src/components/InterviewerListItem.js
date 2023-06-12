import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  // const dayClass = classNames("day-list__item", {
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": props.spots === 0
  // });


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
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}


