import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

describe('Contact Form', () => {
    beforeEach(() => {
        render(<ContactForm />);
    })

    it('should render the header', () => {
        const headerEl = screen.queryByText(/Contact Form/i);
        expect(headerEl).toBeInTheDocument();
        expect(headerEl).toBeTruthy();
        expect(headerEl).toHaveTextContent(/contact form/i);
    });

})

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
    render(<ContactForm />);
    const fname = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(fname, 'Fnamed')
    const lname = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lname, 'Lnamed')
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, '')

    const btn = screen.getByRole('button');
    userEvent.click(btn);

    const emailError = await screen.queryByText('Error: email must be a valid email address.')
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, 'sddss@')

    const emailError = await screen.queryByText(/email must be a valid email address./)
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const lname = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lname, '')

    const btn = screen.getByRole('button');
    userEvent.click(btn);
    
    const lNameError = await screen.queryByText(/lastName is a required field/)
    expect(lNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const fname = screen.getByPlaceholderText(/Edd/i);
    const lname = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(fname, 'Fnamed')
    userEvent.type(lname, 'Lnamed')
    userEvent.type(email, 'fnamed@lnamed.io')

    const btn = screen.getByRole('button');
    userEvent.click(btn);

    const txtFname = await screen.findByTestId('firstnameDisplay');
    const txtLname = await screen.findByTestId('lastnameDisplay');
    const txtEmail = await screen.findByTestId('emailDisplay');

    expect(txtFname).toHaveTextContent(/Fnamed/)
    expect(txtLname).toHaveTextContent(/Lnamed/)
    expect(txtEmail).toHaveTextContent(/fnamed@lnamed.io/)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const fname = screen.getByPlaceholderText(/Edd/i);
    const lname = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const msg = screen.getByLabelText(/message/i);

    userEvent.type(fname, 'Fnamed')
    userEvent.type(lname, 'Lnamed')
    userEvent.type(email, 'fnamed@lnamed.io')
    userEvent.type(msg, 'Where is Acheh?');

    const btn = screen.getByRole('button');
    userEvent.click(btn);

    const txtFname = await screen.findByTestId('firstnameDisplay');
    const txtLname = await screen.findByTestId('lastnameDisplay');
    const txtEmail = await screen.findByTestId('emailDisplay');
    const txtMsg = await screen.findByTestId('messageDisplay');

    expect(txtFname).toHaveTextContent(/Fnamed/)
    expect(txtLname).toHaveTextContent(/Lnamed/)
    expect(txtEmail).toHaveTextContent(/fnamed@lnamed.io/)
    expect(txtMsg).toHaveTextContent('Where is Acheh?')
});

test('renders all input tittles', () => {
    render(<ContactForm />);

    const fields = [
        /First Name*/i,
        /Last Name*/i,
        /Email*/i,
        /Message/i
    ];

    for (let field of fields) {
        const title = screen.queryByText(field);
        expect(title).toBeInTheDocument();
    }

    const titleFname = screen.queryByText(/First Name*/i);
    const titleLname = screen.queryByText(/Last Name*/i);
    const titleEmail = screen.queryByText(/Email*/i);
    const titleMsg = screen.queryByText(/Message/i);

    expect(titleFname).toBeInTheDocument();
    expect(titleLname).toBeInTheDocument();
    expect(titleEmail).toBeInTheDocument();
    expect(titleMsg).toBeInTheDocument();
});