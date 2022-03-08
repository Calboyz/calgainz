import React from "react";
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Menu, Header, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ currentUser }) => {
    return (
        <Menu attached="top" borderless inverted>
            <Menu.Item as={NavLink} exact to="/">
                <Header inverted as="h1">CALGAINZ</Header>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/test">Test</Menu.Item>
            <Menu.Item position="right">
                {currentUser === '' ? (
                    <Dropdown text="Login" pointing="top right" icon={'user'}>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="user" text="Sign in" as={NavLink} exact to="/signin"/>
                            <Dropdown.Item icon="add user" text="Register" as={NavLink} to="/register" />
                        </Dropdown.Menu>
                    </Dropdown>
                    ) : (
                        <Dropdown text={currentUser} pointing="top right" icon='user'>
                            <Dropdown.Menu>
                                <Dropdown.Item icon='sign out' text='Sign Out' as={NavLink} exact to='/signout' />
                            </Dropdown.Menu>
                        </Dropdown>
                )}
            </Menu.Item>
        </Menu>
    )
}

Navbar.propTypes =
    {
        currentUser: PropTypes.string,
    };

const NavbarContainer = withTracker(() => {
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    return {
        currentUser,
    };
})(Navbar);

export default NavbarContainer;