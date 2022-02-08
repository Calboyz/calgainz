import React from "react";
import { Menu, Header, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <Menu attached="top" borderless inverted>
            <Menu.Item as={NavLink} exact to="/">
                <Header inverted as="h1">CALGAINZ</Header>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/test">Test</Menu.Item>
            <Menu.Item position="right">
                <Dropdown text="login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Sign in" as={NavLink} exact to="/signin"/>
                        <Dropdown.Item icon="add user" text="Sign up" as={NavLink} to="/signup" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}