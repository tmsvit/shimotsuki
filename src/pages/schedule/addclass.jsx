import React, { useState } from "react";
import Navbar from "../navbar";

const AddClass = () => {
  const [formData, setFormData] = useState({
    courseNumber: "",
    courseName: "",
    courseFaculty: "",
    courseRoom: "",
    courseDay: [],
    courseCapacity: "",
    courseUnit: "",
    courseDept: [],
    courseTiming: [],
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
      courseTiming:
        arrayName === "courseDay"
          ? selectedValues.map(() => "")
          : formData.courseTiming,
    });
  };

  const handleTimingChange = (e, index) => {
    const { value } = e.target;
    const newTimings = [...formData.courseTiming];
    newTimings[index] = value;
    setFormData({
      ...formData,
      courseTiming: newTimings,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
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
          name="courseNumber"
          value={formData.courseNumber}
          onChange={handleChange}
        />
        <br />
        <label>Course Name</label>
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
        />
        <br />
        <label>Course Faculty</label>
        <input
          type="text"
          name="courseFaculty"
          value={formData.courseFaculty}
          onChange={handleChange}
        />
        <br />
        <label>Course Room</label>
        <input
          type="text"
          name="courseRoom"
          value={formData.courseRoom}
          onChange={handleChange}
        />
        <br />
        <label>Course Day (comma-separated)</label>
        <select
          multiple
          name="courseDay"
          value={formData.courseDay}
          onChange={(e) => handleArrayChange(e, "courseDay")}
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
        {formData.courseDay.map((day, index) => (
          <div key={index}>
            <label>Course Timing for {day}</label>
            <select
              name={`courseTiming-${index}`}
              value={formData.courseTiming[index]}
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
          name="courseCapacity"
          value={formData.courseCapacity}
          onChange={handleChange}
        />
        <br />
        <label>Course Unit</label>
        <input
          type="text"
          name="courseUnit"
          value={formData.courseUnit}
          onChange={handleChange}
        />
        <br />
        <label>Course Dept (comma-separated)</label>
        <select
          multiple
          name="courseDept"
          value={formData.courseDept}
          onChange={(e) => handleArrayChange(e, "courseDept")}
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
