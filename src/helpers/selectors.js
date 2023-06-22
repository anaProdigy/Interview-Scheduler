export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  console.log('selectedDay', selectedDay);
  if (!selectedDay || !state.days.length) {
    return [];
  }

  const appointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });
//do not change any of the contents of state directly.
  return [...appointments];
}