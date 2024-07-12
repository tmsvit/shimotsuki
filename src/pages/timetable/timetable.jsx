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
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>

              {/* 09:00AM - 10:00AM */}
              <tr>
                <td>09:00AM - 10:00AM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "09:00AM - 10:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "09:00AM - 10:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "09:00AM - 10:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "09:00AM - 10:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "09:00AM - 10:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 10:00AM - 11:00AM */}
              <tr>
                <td>10:00AM - 11:00AM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "10:00AM - 11:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "10:00AM - 11:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "10:00AM - 11:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "10:00AM - 11:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "10:00AM - 11:00AM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 11:00AM - 11:15AM */}
              <tr>
                <td>11:00AM - 11:15AM</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
              </tr>

              {/* 11:15AM - 12:15PM */}
              <tr>
                <td>11:15AM - 12:15PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "11:15AM - 12:15PM" && (
                        <div key={index}>
                          <p>
                            {course.course_details.course_name}
                            <br />
                            {course.course_details.course_faculty}
                            <br />
                            {course.course_details.course_room}
                          </p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "11:15AM - 12:15PM" && (
                        <div key={index}>
                          <p>
                            {course.course_details.course_name}
                            <br />
                            {course.course_details.course_faculty}
                            <br />
                            {course.course_details.course_room}
                          </p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "11:15AM - 12:15PM" && (
                        <div key={index}>
                          <p>
                            {course.course_details.course_name}
                            <br />
                            {course.course_details.course_faculty}
                            <br />
                            {course.course_details.course_room}
                          </p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "11:15AM - 12:15PM" && (
                        <div key={index}>
                          <p>
                            {course.course_details.course_name}
                            <br />
                            {course.course_details.course_faculty}
                            <br />
                            {course.course_details.course_room}
                          </p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "11:15AM - 12:15PM" && (
                        <div key={index}>
                          <p>
                            {course.course_details.course_name}
                            <br />
                            {course.course_details.course_faculty}
                            <br />
                            {course.course_details.course_room}
                          </p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 12:15PM - 1:15PM */}
              <tr>
                <td>12:15PM - 1:15PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "12:15PM - 1:15PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "12:15PM - 1:15PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "12:15PM - 1:15PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "12:15PM - 1:15PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "12:15PM - 1:15PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 01:15PM - 01:45PM */}
              <tr>
                <td>01:15PM - 01:45PM</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
              </tr>

              {/* 01:45PM - 02:45PM */}
              <tr>
                <td>01:45PM - 02:45PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "01:45PM - 02:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "01:45PM - 02:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "01:45PM - 02:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "01:45PM - 02:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "01:45PM - 02:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 02:45PM - 03:45PM */}
              <tr>
                <td>02:45PM - 03:45PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "02:45PM - 03:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "02:45PM - 03:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "02:45PM - 03:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "02:45PM - 03:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "02:45PM - 03:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 03:45PM - 04:45PM */}
              <tr>
                <td>03:45PM - 04:45PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "03:45PM - 04:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "03:45PM - 04:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "03:45PM - 04:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "03:45PM - 04:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "03:45PM - 04:45PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>

              {/* 04:45PM - 05:00PM */}
              <tr>
                <td>04:45PM - 05:00PM</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
                <td>Break</td>
              </tr>

              {/* 05:00PM - 06:00PM */}
              <tr>
                <td>05:00PM - 06:00PM</td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Monday") &&
                      course.course_details.course_timing ===
                        "05:00PM - 06:00PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Tuesday") &&
                      course.course_details.course_timing ===
                        "05:00PM - 06:00PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Wednesday") &&
                      course.course_details.course_timing ===
                        "05:00PM - 06:00PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Thursday") &&
                      course.course_details.course_timing ===
                        "05:00PM - 06:00PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
                <td>
                  {enrolled.map(
                    (course, index) =>
                      course.course_details.course_day.includes("Friday") &&
                      course.course_details.course_timing ===
                        "05:00PM - 06:00PM" && (
                        <div key={index}>
                          <p>{course.course_details.course_name}</p>
                          <p>{course.course_details.course_faculty}</p>
                        </div>
                      )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Timetable;
