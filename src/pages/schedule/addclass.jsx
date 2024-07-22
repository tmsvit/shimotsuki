import React, { useState } from "react";
import Navbar from "../navbar";
import { decryptedSessionId } from "../../utils/cryptconfig";
import Api from "../../utils/axiosconfig";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_number: "",
    course_name: "",
    course_faculty: "",
    course_room: "",
    course_day: [],
    course_capacity: "",
    course_unit: "",
    course_dept: [],
    course_timing: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, arrayName) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      [arrayName]: selectedValues,
      course_timing:
        arrayName === "course_day"
          ? selectedValues.map(() => "")
          : formData.course_timing,
    });
  };

  const handleTimingChange = (e, index) => {
    const { value } = e.target;
    const newTimings = [...formData.course_timing];
    newTimings[index] = value;
    setFormData({
      ...formData,
      course_timing: newTimings,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post("/schedule/addclass", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Session-Id': session_key 
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const timeSlots = [
    "09:00AM - 10:00AM",
    "10:00AM - 11:00AM",
    "11:15AM - 12:15PM",
    "12:15PM - 01:15PM",
    "01:45PM - 02:45PM",
    "02:45PM - 03:45PM",
    "03:45PM - 04:45PM",
    "05:00PM - 06:00PM",
  ];

  const departments = ["CMPN", "INFT", "EXTC", "EXCS", "BIO"];

  return (
    <>
      <Navbar />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Course Number</label>
        <input
          type="text"
          name="course_number"
          value={formData.course_number}
          onChange={handleChange}
        />
        <br />
        <label>Course Name</label>
        <input
          type="text"
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
        />
        <br />
        <label>Course Faculty</label>
        <input
          type="text"
          name="course_faculty"
          value={formData.course_faculty}
          onChange={handleChange}
        />
        <br />
        <label>Course Room</label>
        <input
          type="text"
          name="course_room"
          value={formData.course_room}
          onChange={handleChange}
        />
        <br />
        <label>Course Day (comma-separated)</label>
        <select
          multiple
          name="course_day"
          value={formData.course_day}
          onChange={(e) => handleArrayChange(e, "course_day")}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <br />
        {formData.course_day.map((day, index) => (
          <div key={index}>
            <label>Course Timing for {day}</label>
            <select
              name={`course_timing-${index}`}
              value={formData.course_timing[index]}
              onChange={(e) => handleTimingChange(e, index)}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, slotIndex) => (
                <option key={slotIndex} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        ))}
        <br />
        <label>Course Capacity</label>
        <input
          type="text"
          name="course_capacity"
          value={formData.course_capacity}
          onChange={handleChange}
        />
        <br />
        <label>Course Unit</label>
        <input
          type="text"
          name="course_unit"
          value={formData.course_unit}
          onChange={handleChange}
        />
        <br />
        <label>Course Dept (comma-separated)</label>
        <select
          multiple
          name="course_dept"
          value={formData.course_dept}
          onChange={(e) => handleArrayChange(e, "course_dept")}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddClass;
