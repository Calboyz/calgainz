import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.css';
import {Navbar} from "../components/Navbar";
import {Landing} from "../pages/Landing";
import {Test} from "../pages/Test";
import {NotFound} from "../pages/404";
import {Signin} from "../pages/signin";
import {Register} from "../pages/register";
import {ProfilePage} from "../pages/ProfilePage";
import {Dashboard} from "../pages/Dashboard";

export const App = () => (
  <div>
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profilepage" element={<ProfilePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/test" element={<Test />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  </div>
);
