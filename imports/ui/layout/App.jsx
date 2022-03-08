import React from 'react';
import { Meteor } from 'meteor/meteor';
import {BrowserRouter as Router} from "react-router-dom";
import {Routes, Route, Navigate, useLocation, Outlet} from "react-router-dom";
import 'semantic-ui-css/semantic.css';
import NavbarContainer from "../components/Navbar";
import Landing from "../pages/Landing";
import Test from "../pages/Test";
import NotFound from "../pages/404";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import Signout from "../pages/Signout";

export const App = () => (
  <div>
    <Router>
        <NavbarContainer />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signout" element={<Signout />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/profilepage" element={<ProfilePage />}/>
            </Route>
        </Routes>
    </Router>
  </div>
);

const ProtectedRoute = () => {
    const isLogged = Meteor.userId() !== null;
    const location = useLocation();

    if (!isLogged) {
        return <Navigate to='/login' state={{ from: location }} />;
    }
    return <Outlet />
}
