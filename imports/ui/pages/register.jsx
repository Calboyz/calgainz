import React, {useState} from 'react';
import {Header, Form, Message} from "semantic-ui-react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        Accounts.createUser({ username: username, password: password}, (err) => {
            if (err) {
                setError(err.reason);
            } else {
                setError('');
            }
        })
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
                    content='Sign up'
                    icon='sign in'
                />
                {error === '' ? (
                    ''
                ) : (
                    <Message warning
                             error
                             header="Registration was not successful"
                             content={error} />
                )}
            </Form>
        </div>
    );
};