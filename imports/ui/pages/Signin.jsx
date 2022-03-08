import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {Form, Header,  Message} from "semantic-ui-react";
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
        return <Navigate to="/" replace={true} />
    }

    return (
        <div>
            <Header as='h1'>Login Page</Header>
            <Form inverted onSubmit={formik.handleSubmit}>
                <label>Username</label>
                <Form.Input
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
                    type='submit'
                    content='Sign in'
                    icon='sign in'
                />
            </Form>
            <Link to="/signin">
                Create an account
            </Link>
            {error === '' ? (
                '' )
                : (
                    <Message warning
                             error
                             header="Username or Password is Incorrect"
                             content={error} />
            )};
        </div>
    );

    Signin.propTypes = {
        location: PropTypes.object,
    };
};

Signin.propTypes ={
    location: PropTypes.object,
};

export default Signin;