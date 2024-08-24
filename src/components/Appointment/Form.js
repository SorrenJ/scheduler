import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

    // track the error state for "Student name cannot be blank"
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

// this function is for testing purposes
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }


    if (interviewer === null) {
    setError("Please select an interviewer");
    return;
  }

  // if tests don't pass clear the error on successful submission
  setError("");
    props.onSave(name, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
              data-testid="student-name-input" // When we use getByTestId we need to add the matching data-testid value to the node that we want to find
          />

<section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/* onClick passes in the needed parameters to the onSave prop */}
          <Button confirm onClick={validate} >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
