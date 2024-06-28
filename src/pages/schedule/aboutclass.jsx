import React from "react";

function Aboutclass() {
  return (
    <div>
      <div class="enrollment">
        <h1>Enrollment: Add Classes</h1>
        <h2>CSE 6421 - 0010 Computer Architecture</h2>

        <div class="class-details">
          <h3>Class Details</h3>
          <table>
            <tr>
              <td>Status</td>
              <td>Wait List</td>
            </tr>
            <tr>
              <td>Class Number</td>
              <td>10701</td>
            </tr>
            <tr>
              <td>Session</td>
              <td>Regular Academic Term</td>
            </tr>
            <tr>
              <td>Units</td>
              <td>3 units</td>
            </tr>
            <tr>
              <td>Instruction Mode</td>
              <td>In Person</td>
            </tr>
            <tr>
              <td>Class Components</td>
              <td>Lecture Required</td>
            </tr>
            <tr>
              <td>Academic Career</td>
              <td>Graduate</td>
            </tr>
            <tr>
              <td>Dates</td>
              <td>8/20/2024 - 12/4/2024</td>
            </tr>
            <tr>
              <td>Grading</td>
              <td>Graded A-E</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Columbus Campus</td>
            </tr>
            <tr>
              <td>Campus</td>
              <td>Columbus</td>
            </tr>
          </table>
        </div>

        <div class="meeting-information">
          <h3>Meeting Information</h3>
          <table>
            <tr>
              <td>Days & Times</td>
              <td>Room</td>
              <td>Instructor</td>
              <td>Meeting Dates</td>
            </tr>
            <tr>
              <td>TuTh 9:35AM - 10:55AM</td>
              <td>Dreese Lab 305</td>
              <td>To be Announced</td>
              <td>08/20/2024 - 12/04/2024</td>
            </tr>
          </table>
        </div>

        <div class="class-availability">
          <h3>Class Availability</h3>
          <table>
            <tr>
              <td>Class Capacity</td>
              <td>40</td>
            </tr>
            <tr>
              <td>Enrollment Total</td>
              <td>40</td>
            </tr>
            <tr>
              <td>Available Seats</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Wait List Capacity</td>
              <td>999</td>
            </tr>
            <tr>
              <td>Wait List Total</td>
              <td>3</td>
            </tr>
          </table>
        </div>

        <div class="description">
          <h3>Description</h3>
          <p>
            Principles and tradeoffs behind the design of modern computer
            architectures, including instruction-level parallelism, memory
            system design, advanced cache architectures, cache coherence,
            multiprocessors, energy-efficient and embedded architectures.
          </p>
          <p>
            Prereq: 3431 (660) or 5431, and 3421 (675), 5421, or ECE 5362 (662).
            Not open to students with credit for 775.
          </p>
        </div>

        <div class="textbook">
          <h3>Textbook/Other Materials</h3>
          <p>Textbooks to be determined</p>
        </div>

        <div class="buttons">
          <button>Return to Add Classes</button>
          <button>View Search Results</button>
          <button>Select Class</button>
        </div>
      </div>
    </div>
  );
}

export default Aboutclass;
