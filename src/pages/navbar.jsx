import React from "react";
import { decryptedSessionId } from "../utils/cryptconfig";
import { useNavigate } from "react-router-dom";
import { logoutfunc } from "../utils/apiconfig";

function Navbar() {
  const navigate = useNavigate();
  const group = sessionStorage.getItem("group");
  const group_type = decryptedSessionId(group);
  const handlelogout = logoutfunc(navigate);
  return (
    <div>
      {/* Admin */}
      {group_type == "admin" ? (
        <>
          <a href="/">
            <button>Dashboard</button>
          </a>
          <a href="/viewclass">
            <button>View Courses</button>
          </a>
          <a href="/viewuser">
            <button>View Users</button>
          </a>
          <a href="/viewavailibility">
            <button>View Availiblity</button>
          </a>
          <a href="/viewenrollment">
            <button>View Enrollments</button>
          </a>
          <a href="/addclass">
            <button>Add Class</button>
          </a>
          <button onClick={handlelogout}>Logout</button>
        </>
      ) : (
        <></>
      )}
      {/* Student */}
      {group_type == "student" ? (
        <>
          <a href="/">
            <button>Dashboard</button>
          </a>
          <a href="/viewclass">
            <button>View Courses</button>
          </a>
          <button onClick={handlelogout}>Logout</button>
        </>
      ) : (
        <></>
      )}

      {/* TT Faculty */}
      {group_type == "ttfaculty" ? (
        <>
          <a href="/">
            <button>Dashboard</button>
          </a>
          <a href="/viewclass">
            <button>View Courses</button>
          </a>
          <a href="/viewavailibility">
            <button>View Availiblity</button>
          </a>
          <a href="/viewenrollment">
            <button>View Enrollments</button>
          </a>
          <button onClick={handlelogout}>Logout</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
