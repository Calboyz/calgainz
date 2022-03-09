import React from "react";
import { Meteor } from 'meteor/meteor';
import {Container, Header} from "semantic-ui-react";


const Signout = () => {
    Meteor.logout();
    return (
        <Container fluid id='signout-page'>
            <Header size='huge'>
                You have logged out!
            </Header>
        </Container>
    )
}

export default Signout;