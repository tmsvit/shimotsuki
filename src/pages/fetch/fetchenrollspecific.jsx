import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import Navbar from "../navbar";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrStatusWarningSmall } from "react-icons/gr";
import { decryptedSessionId } from "../../utils/cryptconfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Fetchenrollspecific() {
  const navigate = useNavigate();
  const { param } = useParams();
  const [enrolldata, setEnrolldate] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchEnrollData = async () => {
      const sessionId = sessionStorage.getItem("session_id");
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/enrollmentdata", {
          headers: {
            "Session-Id": session_key,
            'Course-Id': param
          },
        });
        setEnrolldate(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchEnrollData();
  }, [param]);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredData(enrolldata);
    } else {
      setFilteredData(enrolldata.filter(data => data.course_status === statusFilter));
    }
  }, [statusFilter, enrolldata]);

  const handleUnenroll = (courseId, key) => async() => {
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post(
        `/schedule/unenrollclasses?course_id=${courseId}&enroll_id=${key}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Session-Id': session_key
          },
        }
      );
      navigate('/dashboard')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleAddmanually = (courseId) => async() => {
    const sessionId = sessionStorage.getItem('session_id');
    const session_key = decryptedSessionId(sessionId);
    try {
      const response = await Api.post(
        `/schedule/addclassmanually?course_id=${courseId}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Session-Id': session_key
          },
        }
      );
      navigate('/viewenrollment')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sessionStorage.getItem("group") ? <Navbar /> : <>Error</>}
          <p>Course Id: {param}</p>
          <br />
          
          <div>
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Waitlist">Waitlist</option>
            </select>
          </div>

          <table border={1}>
            <thead>
              <tr>
                <th>Enroll Id</th>
                <th>Course Number</th>
                <th>Course Name</th>
                <th>Date and Timing</th>
                <th>Course Room</th>
                <th>Student's Name</th>
                <th>Student's Username</th>
                <th>Student's University Id</th>
                <th>Course Status</th>
                <th>Unenroll/Add Manually</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.enroll_id}</td>
                  <td>{data.course_no}</td>
                  <td>{data.course_name}</td>
                  <td>
                    {data.course_day} {data.course_time}
                  </td>
                  <td>{data.course_room}</td>
                  <td>{data.student_name}</td>
                  <td>{data.student_username}</td>
                  <td>{data.student_university_id}</td>
                  <td>
                    {data.course_status === "Enrolled" ? (
                      <MdOutlineDoneOutline fill="#00FF00" />
                    ) : (
                      <GrStatusWarningSmall fill="#ffae42" />
                    )}
                  </td>
                  <td>
                    {data.course_status === "Enrolled" ? (
                      <button
                        onClick={handleUnenroll(param, data.enroll_id)}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleUnenroll(param, data.enroll_id)}
                        >
                          Unenroll
                        </button>
                        <button
                          onClick={handleAddmanually(param  )}
                        >
                          Add Manually
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Fetchenrollspecific;
