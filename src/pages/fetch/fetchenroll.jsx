import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrStatusWarningSmall } from "react-icons/gr";
import { decryptedSessionId } from "../../utils/cryptconfig";
import { useNavigate } from "react-router-dom";
import { addmanually, unenrollfunc } from "../../utils/apiconfig";

function Fetchenroll() {
  const navigate = useNavigate();
  const [enrolldata, setEnrolldate] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleUnenroll = (courseId) => unenrollfunc(courseId,navigate);
  const handleAddmanually = (courseId) => addmanually(courseId,navigate);

  useEffect(() => {
    const fetchEnrollData = async () => {
      const sessionId = sessionStorage.getItem("session_id");
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/enrollmentdata", {
          headers: {
            "Session-Id": session_key,
          },
        });
        setEnrolldate(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchEnrollData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Replace with your loading spinner or component
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>University Id</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {enrolldata.map((enrolldata) => (
              <tr key={enrolldata._id}>
                <td>{enrolldata._id}</td>
                <td>{enrolldata.course_details.course_number}</td>
                <td>{enrolldata.course_details.course_name}</td>
                <td>{enrolldata.course_details.course_day} {enrolldata.course_details.course_timing}</td>
                <td>{enrolldata.course_details.course_dept}</td>
                <td>{enrolldata.course_details.course_room}</td>
                <td>{enrolldata.status == "Enrolled" ? <><MdOutlineDoneOutline fill="#00FF00" /></> : <><GrStatusWarningSmall fill="#ffae42" /></>}</td>
                <td>{enrolldata.status == "Enrolled" ? <button onClick={handleUnenroll(enrolldata.course_id)}>Unenroll</button> : <><button onClick={handleUnenroll(enrolldata.course_id)}>Unenroll</button><button onClick={handleAddmanually(enrolldata.course_id)}>Add Manually</button></>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Fetchenroll