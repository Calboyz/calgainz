import React from "react";
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Menu, Header, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ currentUser }) => {
    return (
        <Menu attached="top" borderless inverted>
            <Menu.Item id='logo' as={NavLink} to="/">
                <Header inverted as="h1">CALGAINZ</Header>
            </Menu.Item>
            {currentUser ? (
                [<Menu.Item key='test' as={NavLink} to="/test">Test</Menu.Item>,
                <Menu.Item key='profile' as={NavLink} to="/profilepage">Profile Page</Menu.Item>]
            ) : ''}
            <Menu.Item position="right">
                {currentUser === '' ? (
                    <Dropdown id='signin-dropdown' text="Login" pointing="top right" icon={'user'}>
                        <Dropdown.Menu>
                            <Dropdown.Item id='signin-dropdown-signin' key='signin' icon="user" text="Sign in" as={NavLink} to="/signin"/>
                            <Dropdown.Item id='signin-dropdown-register' key='register' icon="add user" text="Register" as={NavLink} to="/register" />
                        </Dropdown.Menu>
                    </Dropdown>
                    ) : (
                        <Dropdown id='navbar-current-user' text={currentUser} pointing="top right" icon='user'>
                            <Dropdown.Menu>
                                <Dropdown.Item id='navbar-sign-out' key='signout' icon='sign out' text='Sign Out' as={NavLink} to='/signout' />
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