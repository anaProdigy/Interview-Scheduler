import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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


  const updateSpots = (id, appointments) => {
    console.log("updateSports", id, appointments);
    // find a specific day that i m trying to update
    const day = state.days.find((day) => day.appointments.includes(id));
    //calculate the num of spots = nulls
    const spots = day.appointments.filter((appointmentId) => {
      return appointments[appointmentId].interview === null;
    });
    //return updated days
    const updatedDays = state.days.map((dayObj) => {
      if (dayObj.appointments.includes(id)) {
        return { ...dayObj, spots: spots.length };
      }
      return dayObj;
    });
    return updatedDays;
  };


  const bookInterview = (id, interview) => {
    // console.log("bookInterview App",id, interview);
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
          days: updateSpots(id, appointments)
        });

      });

  };

  const cancelInterview = (id) => {
    console.log("cancelInterview App", id);
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
          days: updateSpots(id, appointments)
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

