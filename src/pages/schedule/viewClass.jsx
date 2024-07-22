import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import { decryptedSessionId } from "../../utils/cryptconfig";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

function Viewclass() {
  const navigate = useNavigate();
  const [coursedata, setCoursedata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const group = decryptedSessionId(sessionStorage.getItem("group"));
  useEffect(() => {
    const fetchCourseData = async () => {
      const sessionId = sessionStorage.getItem("session_id");
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/coursedata", {
          headers: {
            "Session-Id": session_key,
          },
        });
        setCoursedata(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const handleDeleteCourse = async (course_id) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post(
        '/schedule/deletecourse',{},
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Session-Id': session_key,
            'Course-Id': course_id
          },
        }
      );
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = coursedata.filter((course) =>
    Object.values(course).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      {sessionStorage.getItem("group") ? <Navbar /> : <>Error</>}
      <br />
      <h3>View Classes</h3>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table border={1}>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Description</th>
            <th>Days/Times</th>
            <th>Room</th>
            <th>Instructor</th>
            <th>Units</th>
            <th>Capacity</th>
            <th>Enroll</th>
            {group === "admin" && "ttfaculty" ? (
                  <th>Delete</th>
                ) : (
                  ""
                )}
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((coursedata) => (
            <tr key={coursedata._id}>
              <td>
                <a href={`/aboutclass?course_id=${coursedata._id}`}>
                  {coursedata.course_number}
                </a>
              </td>
              <td>{coursedata.course_name}</td>
              <td>
                {coursedata.course_day}
                <br />
                {coursedata.course_timing}
              </td>
              <td>{coursedata.course_room}</td>
              <td>{coursedata.course_faculty}</td>
              <td>{coursedata.course_unit}</td>
              <td>{coursedata.course_capacity}</td>
              <td>
                <a
                  href={`/checkavailibility?course_id=${coursedata._id}&course_number=${coursedata.course_number}&course_day_time=${coursedata.course_day}${coursedata.course_timing}&course_room=${coursedata.course_room}&course_inst=${coursedata.course_faculty}`}
                >
                  <button>Enroll</button>
                </a>
              </td>
              <td>
                {group === "admin" && "ttfaculty" ? (
                  <button onClick={() => handleDeleteCourse(coursedata._id)}>Delete</button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Viewclass;
