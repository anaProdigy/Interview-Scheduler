import React from 'react';
import "./styles.scss";

import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Form from "./Form.js";
import Confirm from "./Confirm.js";
import Status from "./Status.js";


import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  //console.log("Appointment", props.id)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING); // Transition to SAVING mode
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  const cancelInterview = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });



  };
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {/* wht this check???????????? */}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit ={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save} />
        )}
        {mode === SAVING && (
          <Status
            message={"Saving..."} />
        )}
        {mode === DELETING && (
          <Status
            message={"Deleting..."} />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={back}
            onConfirm={() => { cancelInterview()}}
            message={"are you sure?"} />
        )}
        {mode === EDIT && (
          <Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save} />
        )}
      </article>
    </>
  );
}