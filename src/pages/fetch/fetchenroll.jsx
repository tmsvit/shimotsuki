import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import { decryptedSessionId } from "../../utils/cryptconfig";
import Navbar from "../navbar";

function Fetchenroll() {
  const [coursedata, setCoursedata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchCourseData = async () => {
      const sessionId = sessionStorage.getItem('session_id');
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/coursedata",{
          headers:{
            'Session-Id': session_key
          }
        });
        setCoursedata(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = coursedata.filter((course) =>
    Object.values(course).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );  

  return (
    <div>
      {sessionStorage.getItem('group') ? <Navbar/> : <>Error</>}
      <br/>
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
                {coursedata.course_day}<br/>{coursedata.course_timing}
              </td>
              <td>{coursedata.course_room}</td>
              <td>{coursedata.course_faculty}</td>
              <td>{coursedata.course_unit}</td>
              <td>{coursedata.course_capacity}</td>
              <td>
                <a
                  href={`/viewenrollment/${coursedata._id}`}
                >
                  <button>View Enrollment</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fetchenroll;
