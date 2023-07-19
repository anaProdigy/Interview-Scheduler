import React from 'react';
import "./styles.scss";

import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Form from "./Form.js";
import Confirm from "./Confirm.js";
import Status from "./Status.js";
import Error from "./Error.js";


import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING); // Transition to SAVING mode
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE,true)
      });
  };

  const destroy = (event) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      });
  };

  return (
    
    <article data-testid="appointment" className="appointment" >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

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
            onConfirm={() => { destroy()}}
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
        {mode === ERROR_SAVE &&(
          <Error message={"Cudnt save"} onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message={"Cudnt delete"} onClose={back} />
        )}

      </article>
    
  );
}