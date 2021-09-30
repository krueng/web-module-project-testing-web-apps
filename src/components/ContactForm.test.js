import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const headerEl = screen.queryByText(/Contact Form/i);
    expect(headerEl).toBeInTheDocument();
    expect(headerEl).toBeTruthy();
    expect(headerEl).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fname = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(fname, 'd')
    const btn = screen.getByRole('button');
    userEvent.click(btn);

    const fnameError = await screen.queryByText('Error: firstName must have at least 5 characters.')
    expect(fnameError).toBeInTheDocument();
}

);

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const fname = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(fname, '')
    const lname = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lname, '')
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, '')

    const btn = screen.getByRole('button');
    userEvent.click(btn);

    const fnameError = await screen.queryByText('Error: firstName must have at least 5 characters.')
    const lnameError = await screen.queryByText('Error: lastName is a required field.')
    const emailError = await screen.queryByText('Error: email must be a valid email address.')
    expect(fnameError).toBeInTheDocument();
    expect(lnameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // render(<ContactForm />);
    // const fname = screen.getByPlaceholderText(/Edd/i);
    // userEvent.type(fname, 'Fnamed')
    // const lname = screen.getByPlaceholderText(/burke/i);
    // userEvent.type(lname, 'Lnamed')
    // const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    // userEvent.type(email, '')
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});