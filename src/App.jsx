import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedroutes";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Viewclass from "./pages/schedule/viewClass";
import Aboutclass from "./pages/schedule/aboutclass";
import Confirmation from "./pages/schedule/confirmation";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/addclass"
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
      </Routes>
    </Router>
  );
}

export default App;
