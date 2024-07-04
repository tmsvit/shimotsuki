import React, { useState, useEffect } from "react";
import Api from "../../utils/axiosconfig";
import { decryptedSessionId } from "../../utils/cryptconfig";

function Fetchuser() {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const sessionId = sessionStorage.getItem("session_id");
      const session_key = decryptedSessionId(sessionId);
      try {
        const response = await Api.get("/fetch/userdata", {
          headers: {
            "Session-Id": session_key,
          },
        });
        setUserdata(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
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
            {userdata.map((userdata) => (
              <tr key={userdata._id}>
                <td>{userdata._id}</td>
                <td>{userdata.first_name} {userdata.last_name}</td>
                <td>{userdata.username}</td>
                <td>{userdata.university_id}</td>
                <td>{userdata.email}</td>
                <td>{userdata.dept}</td>
                <td>{userdata.group[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Fetchuser;
