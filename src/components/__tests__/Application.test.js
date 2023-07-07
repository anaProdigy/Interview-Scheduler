import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from '@testing-library/react';
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  //1
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  });
//2
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //console.log("appointment", prettyDOM(appointment));
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    //1 way
    // await waitForElementToBeRemoved(() => queryByText(appointment, "Saving..."))
    // expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    //2 way
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //debug();
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const foundDay = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(foundDay, /no spots remaining/i)).toBeInTheDocument();
    //console.log(prettyDOM(foundDay));
  });
//3
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    //debug();
    // 4. Click the "Confirm" button on confirmation.
    expect(getByText(appointment, "are you sure?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
   
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    //debug();
    // 8. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const foundDay = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(foundDay, /2 spots remaining/i)).toBeInTheDocument();
   // console.log(prettyDOM(foundDay));
  });
//4
  it("loads data, edits an interview and keeps the spots remaining for Monday the same",async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name" instead of Archie Cohen .
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 6. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 7. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const foundDay = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(foundDay, /1 spot remaining/i)).toBeInTheDocument();
    //debug();
   })

   //5
  it("shows the save error when failing to save an appointment", async() => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

   
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
   // throws an error
    axios.put.mockRejectedValueOnce();
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    
    fireEvent.click(getByText(appointment, "Save"));
     await waitForElement(() => getByText(container, "Cudnt save"));
     await waitForElement(() => fireEvent.click(getByAltText(appointment, "Close")));
    
  });


  //6
  it("shows the delete error when failing to delete an existing appointment", async () => {
    // throws an error
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container} = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    // 3. Click the "Delete" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "are you sure?")).toBeInTheDocument();
  
  
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    await waitForElement(() => getByText(container, "Cudnt delete"));
    await waitForElement(() => fireEvent.click(getByAltText(appointment, "Close")));

  });
 

});

