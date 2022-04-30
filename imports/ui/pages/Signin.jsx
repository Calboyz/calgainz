import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {Container, Form, Header, Message} from "semantic-ui-react";
import { Navigate, Link } from 'react-router-dom'
import {useFormik} from "formik";

const Signin = ({ location }) => {
    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
                return errors;
            }
        },
        onSubmit: async (values, {setSubmitting}) => {
            setTimeout(() => {
                Meteor.loginWithPassword(values.username, values.password, (err) => {
                    if (err) {
                        setError(err.reason);
                    } else {
                        setRedirectToReferrer(true);
                        setError('');
                    }
                })
                setSubmitting(false);
            }, 400)}
    });

    if (redirectToReferrer) {
        return <Navigate to="/calories" replace={true} />
    }

    return (
        <Container id='signin-page'>
            <Header as='h1'>Login Page</Header>
            <Form inverted onSubmit={formik.handleSubmit}>
                <label>Username</label>
                <Form.Input
                    id='signin-form-username'
                    icon='user'
                    iconPosition='left'
                    name='username'
                    placeholder='Enter Username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    error={(formik.errors.username && formik.touched.username) ? {
                        content: 'Please enter a username',
                        pointing: 'below',
                    } : null}
                />
                <label>Password</label>
                <Form.Input
                    id='signin-form-password'
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Enter Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.errors.password && formik.touched.password) ? {
                        content: 'Please enter a username',
                        pointing: 'below',
                    } : null}
                />
                <Form.Button
                    id='signin-form-submit'
                    type='submit'
                    content='Sign in'
                    icon='sign in'
                />
                <Link to="/register">
                    Create an account
                </Link>
            </Form>
            {error === '' ? (
                    '' )
                : (
                    <Message warning
                             error
                             header="Username or Password is Incorrect"
                             content={error} />
                )}
        </Container>
    );
};

Signin.propTypes ={
    location: PropTypes.object,
};

export default Signin;