import { useState } from 'react';
import { useEffect } from 'react';

import axios from "axios";
import updateSpots from "../helpers/updateSpots"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      // console.log(all); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);





  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //ALWAYS RETURN IF I WANT TO WAIT FOR PROMISE (on save fn)
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(response => {

        setState({
          ...state,
          appointments,
          days: updateSpots(id, appointments, state)
        });

      });

  };

  const cancelInterview = (id) => {

    return axios
      .delete(`/api/appointments/${id}`)
      .then(response => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: null
          }
        };
        setState({
          ...state,
          appointments,
          days: updateSpots(id, appointments, state)
        });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };


}

