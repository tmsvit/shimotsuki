import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedroutes";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Viewclass from "./pages/schedule/viewClass";
import Aboutclass from "./pages/schedule/aboutclass";
import Confirmation from "./pages/schedule/confirmation";
import Fetchuser from "./pages/fetch/fetchuser";
import Fetchavail from "./pages/fetch/fetchavail";
import Fetchenroll from "./pages/fetch/fetchenroll";
import AddClass from "./pages/schedule/addclass";
import Test from "./pages/test";
import Fetchenrollspecific from "./pages/fetch/fetchenrollspecific";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/viewclass"
            element={<ProtectedRoute component={Viewclass} />}
          />
          <Route
            path="/aboutclass"
            element={<ProtectedRoute component={Aboutclass} />}
          />
          <Route
            path="/checkavailibility"
            element={<ProtectedRoute component={Confirmation} />}
          />
          <Route
            path="/viewuser"
            element={<ProtectedRoute component={Fetchuser} />}
          />
          <Route
            path="/viewavailibility"
            element={<ProtectedRoute component={Fetchavail} />}
          />
          <Route
            path="/viewenrollment"
            element={<ProtectedRoute component={Fetchenroll} />}
          />
          <Route
            path="/viewenrollment/:param"
            element={<ProtectedRoute component={Fetchenrollspecific} />}
          />
          <Route
            path="/addclass"
            element={<ProtectedRoute component={AddClass} />}
          />
          <Route
            path="/test"
            element={<ProtectedRoute component={Test} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
