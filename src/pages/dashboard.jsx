import React, { useEffect, useState } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrStatusWarningSmall } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { logoutfunc } from "../utils/apiconfig";
import { decryptedSessionId } from "../utils/cryptconfig";
import Api from "../utils/axiosconfig";

function Dashboard() {
  const [enrollmentdata, setEnrollmentdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handlelogout = logoutfunc(navigate);
  useEffect(() => {
    const fetchEnrollmentData = async () => {
      const sessionId = sessionStorage.getItem('session_id');
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/enrollmentuserspecificdata",{
          headers:{
            'Session-Id': session_key
          }
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
  return (
    <section className="className-schedule">
      <div>
        <a href="/addclass">
          <button>View Class</button>
        </a>
        <button onClick={handlelogout}>Logout</button>
      </div>
      <h3>My Enrollments</h3>
      <p>
        Confirm: <MdOutlineDoneOutline fill="#00FF00" /> Waitlist:{" "}
        <GrStatusWarningSmall fill="#ffae42" />
      </p>
      {loading ? (
        <p>Loading...</p> // Replace with your loading spinner or component
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th>Course Number</th>
              <th>Description</th>
              <th>Days/Times</th>
              <th>Room</th>
              <th>Instructor</th>
              <th>Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentdata.map((enrollment) => (
              <tr key={enrollment._id}>
                <td>{enrollment.course_details.course_number}</td>
                <td>{enrollment.course_details.course_name}</td>
                <td>
                  {enrollment.course_details.course_day.join(", ")}{" "}
                  {enrollment.course_details.course_timing}
                </td>
                <td>{enrollment.course_details.course_room}</td>
                <td>{enrollment.course_details.course_faculty}</td>
                <td>{enrollment.course_details.course_unit}</td>
                <td>
                  {enrollment.status == "Enrolled" ? (
                    <>
                      <MdOutlineDoneOutline fill="#00FF00" />
                    </>
                  ) : (
                    <>
                      <GrStatusWarningSmall fill="#ffae42" />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Dashboard;
