import React from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import "semantic-ui-css/semantic.css";
import NavbarContainer from "../components/Navbar";
import Landing from "../pages/Landing";
import Test from "../pages/Test";
import NotFound from "../pages/404";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import Signout from "../pages/Signout";
import Dashboard from "../pages/Dashboard";
import Calories from "../pages/Calories";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export const App = () => (
  <div>
    <Router>
      <NavbarContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calorie" element={<Calories />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signout" element={<Signout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profilepage/:_id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  </div>
);

const ProtectedRoute = () => {
  const isLogged = Meteor.userId() !== null;
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return <Outlet />;
};
