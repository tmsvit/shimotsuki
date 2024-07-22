import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import { decryptedSessionId } from "../../utils/cryptconfig";

function Timetable() {
  const [enrollmentdata, setEnrollmentdata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEnrollmentData = async () => {
      const sessionId = sessionStorage.getItem("session_id");
      const session_key = decryptedSessionId(sessionId);

      try {
        const response = await Api.get("/fetch/enrollmentuserspecificdata", {
          headers: {
            "Session-Id": session_key,
          },
        });
        setEnrollmentdata(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchEnrollmentData();
  }, []);
  const enrolled = enrollmentdata.filter(
    (course) => course.status === "Enrolled"
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00AM - 10:00AM",
    "10:00AM - 11:00AM",
    "11:00AM - 11:15AM", // Break
    "11:15AM - 12:15PM",
    "12:15PM - 01:15PM",
    "01:15PM - 01:45PM", // Break
    "01:45PM - 02:45PM",
    "02:45PM - 03:45PM",
    "03:45PM - 04:45PM",
    "04:45PM - 05:00PM", // Break
    "05:00PM - 06:00PM",
  ];
  const renderCourseDetails = (day, timeSlot) => {
    return enrolled.map((course, index) => {
      const dayIndex = course.course_details.course_day.indexOf(day);
      if (
        dayIndex !== -1 &&
        course.course_details.course_timing[dayIndex] === timeSlot
      ) {
        return (
          <div key={index}>
            <p>
              {course.course_details.course_name}
              <br />
              {course.course_details.course_faculty}
              <br />
              {course.course_details.course_room}
            </p>
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Replace with your loading spinner or component
      ) : (
        <>
          <table border={1}>
            <thead>
              <tr>
                <th></th>
                {days.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, index) => (
                <tr key={index}>
                  <td>{timeSlot}</td>
                  {timeSlot === "11:00AM - 11:15AM" ||
                  timeSlot === "01:15PM - 01:45PM" ||
                  timeSlot === "04:45PM - 05:00PM" ? (
                    <td colSpan={days.length} style={{ textAlign: "center" }}>
                      Break
                    </td>
                  ) : (
                    days.map((day, dayIndex) => (
                      <td key={dayIndex}>
                        {renderCourseDetails(day, timeSlot)}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Timetable;
