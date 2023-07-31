const updateSpots = (id, appointments, state) => {

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

export default updateSpots;