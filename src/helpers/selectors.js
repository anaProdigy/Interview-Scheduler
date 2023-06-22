export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  // console.log('selectedDay', selectedDay);
  if (!selectedDay || !state.days.length) {
    return [];
  }

  const appointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });
//do not change any of the contents of state directly.
  return [...appointments];
}



export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const {student, interviewer} = interview;
  const interviewerData = state.interviewers[interviewer];
  return {
    student,
   interviewer: interviewerData
  }
}


