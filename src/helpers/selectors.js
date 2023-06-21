export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  console.log('selectedDay', selectedDay);
  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });

  return appointments;
}