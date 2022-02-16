import React, {useState} from 'react';
import { Meteor } from 'meteor/meteor';
import {Form, Button, Header, Input} from "semantic-ui-react";

export const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e, {name, value}) => {
        switch(name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break
            default:
                // Do nothing
        }
    }

    const submit = () => {
        console.log(username);
    }

    return (
        <div>
            <Header as='h1'>Login Page</Header>
            <Form inverted onSubmit={submit}>
                <label>Username</label>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    name='username'
                    placeholder='Enter Username'
                        onChange={handleChange}
                />
                <label>Password</label>
                <Form.Input
                        icon='lock'
                        iconPosition='left'
                        name='password'
                        placeholder='Enter Password'
                        type='password'
                        onChange={handleChange}
                />
                <Form.Button
                    type='submit'
                    content='Sign in'
                    icon='sign in'
                />
            </Form>
        </div>
    );
};
