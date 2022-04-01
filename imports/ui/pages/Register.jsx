import React, {useState} from 'react';
import {Header, Form, Message, Icon, Container} from "semantic-ui-react";
import { Accounts } from 'meteor/accounts-base';
import { Navigate, Link } from 'react-router-dom'
import { useFormik } from "formik";

const Register = () => {
    const [error, setError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const formik = useFormik({
        initialValues: {username: '',
        password: '',
        email: '',
        confirm:''
    },
    validate: (values) => {
        const errors = {};
        const passwordErrors = validatePassword(values.password);
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(values.email)
        ) {
            errors.email = 'Invalid Email';
        }
        if(!values.username) {
            errors.username = 'Required';
        }
        if(!values.confirm) {
            errors.confirm = 'Required';
        } else if (values.confirm !== values.password) {
            errors.confirm = 'Mismatching';
        }
        if(!values.password) {
            errors.password = 'Required';
        } else if (!Object.values(passwordErrors).every(item => item)) {
            errors.password = passwordErrors;
        }
        return errors;
    },
    onSubmit: async (values, {setSubmitting}) => {
        console.log(redirectToReferrer);
        setTimeout(() => {
            setRedirectToReferrer(true);
            Accounts.createUser({
                username: values.username,
                password: values.password,
                email: values.email,
                profile: {
                    points: [],
                }
            }, (err) => {
                if (err) {
                    setError(err.reason);
                    console.log(err.reason);
                } else {
                    setError('');
                }
            })
            setSubmitting(false);
        }, 400)}
    });

    const iconTrigger = (passError) => {
            return passError ? <Icon color='green' name='checkmark'/> : <Icon color='red' name="x"/> ;
    }

    const validatePassword = (password) => {
        return {
            length: password.length > 8,
            special: /[!@#$%&*^()_~]/.test(password),
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        }
    }

    if(redirectToReferrer) {
        return <Navigate to="/" replace={true}/>
    }
    return (
            <Container id='register-page'>
                <Header as='h1'>Register Page</Header>
                <Form onSubmit={formik.handleSubmit}>
                    <label>Username</label>
                    <Form.Input
                        id='register-form-username'
                        icon='user'
                        iconPosition='left'
                        name='username'
                        placeholder='Enter Username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.username && formik.touched.username) ? {
                            content: 'Please enter a valid username',
                            pointing: 'below',
                        } : null}
                    />
                    <label>Email</label>
                    <Form.Input
                        id='register-form-email'
                        icon='mail'
                        iconPosition='left'
                        name='email'
                        placeholder='Enter Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.email && formik.touched.email) ? {
                            content: 'Please enter a valid email address',
                            pointing: 'below',
                        } : null}
                    />
                    <label>Password</label>
                    <Form.Input
                        id='register-form-password'
                        icon='lock'
                        iconPosition='left'
                        name='password'
                        placeholder='Enter Password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.password && formik.touched.password) ? {
                            content: 'Please enter a valid password',
                            pointing: 'below',
                        } : null}
                    />
                    {(formik.values.password && formik.errors.password) ?
                        <Message>
                            <ul style={{listStyleType: "none"}}>
                                <Message.Item>{(formik.errors.password) ? iconTrigger(formik.errors.password.lower) : ''}Lowercase</Message.Item>
                                <Message.Item>{(formik.errors.password) ? iconTrigger(formik.errors.password.upper) : ''}Uppercase</Message.Item>
                                <Message.Item>{(formik.errors.password) ? iconTrigger(formik.errors.password.number) : ''}Number</Message.Item>
                                <Message.Item>{(formik.errors.password) ? iconTrigger(formik.errors.password.special) : ''}Special Character (!@#$%&*^()_~)</Message.Item>
                                <Message.Item>{(formik.errors.password) ? iconTrigger(formik.errors.password.length) : ''}Longer than 8 characters</Message.Item>
                            </ul>
                        </Message>
                        :
                        ''}
                    <label>Confirm Password</label>
                    <Form.Input
                        id='register-form-confirm'
                        icon='lock'
                        iconPosition='left'
                        name='confirm'
                        placeholder='Enter Password again'
                        type='password'
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.confirm && formik.touched.confirm) ? {
                            content: 'Please confirm password',
                            pointing: 'below',
                        } : null}
                    />
                    <Link to="/signin">
                        Already have an account?
                    </Link>
                    <Form.Button
                        id='register-form-submit'
                        type='submit'
                        content='Sign up'
                    />
                    {error === '' ? (
                        console.log(formik.errors)
                    ) : (
                        <Message warning
                                 error
                                 header="Registration was not successful"
                                 content={error} />
                    )}
                </Form>
            </Container>
    );
};

export default Register;