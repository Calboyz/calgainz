import React, {useState} from 'react';
import {Header, Form} from "semantic-ui-react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e, {name, value}) => {
        switch(name) {
            case 'username':
                setUsername(value);
                break
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
            <Header as='h1'>Register Page</Header>
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