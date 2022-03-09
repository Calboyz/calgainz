import React from "react";
import { Meteor } from 'meteor/meteor';


const Signout = () => {
    Meteor.logout();
    return (
        <h1>You have logged out!</h1>
    )
}

export default Signout;