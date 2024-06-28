import React,{useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import Api from "../../utils/axiosconfig";
import { decryptedSessionId } from "../../utils/cryptconfig";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrStatusWarningSmall } from "react-icons/gr";
import { enrollfunc } from "../../utils/apiconfig";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();
  const [checkdata, setCheckdata] = useState([]);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course_id");
  const courseNumber = searchParams.get("course_number");
  const courseDayTime = searchParams.get("course_day_time");
  const courseRoom = searchParams.get("course_room");
  const courseInstr = searchParams.get("course_inst");
  const sessionId = sessionStorage.getItem('session_id');
  const session_key = decryptedSessionId(sessionId)
  const handleEnrollment = enrollfunc(courseId,session_key,navigate);

  useEffect(() => {
    const fetchCheckAvailibility = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id');
        const session_key = decryptedSessionId(sessionId)

        const response = await Api.get(`/schedule/checkavailibility?course_id=${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Session-ID': session_key,
          },
        });

        setCheckdata(response.data);        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCheckAvailibility();
  }, []);

  return (
    <>
      <h1>Enrollment Page</h1>
      <p>Course ID: {courseId}</p>

      <table border={1}>
        <thead>
          <tr>
            <td>Course Number</td>
            <td>Days & Times</td>
            <td>Room</td>
            <td>Instructor</td>
            <td>Message</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{courseNumber}</td>
            <td>{courseDayTime}</td>
            <td>{courseRoom}</td>
            <td>{courseInstr}</td>
            <td>{checkdata.message}</td>
            <td>{checkdata.availibilty ? <><MdOutlineDoneOutline fill="#00FF00" /></> : <><GrStatusWarningSmall fill="#ffae42"/></>}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <button>Go Back</button>
      <button onClick={handleEnrollment}>Confirm</button>
    </>
  );
}

export default Confirmation;
