import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label, Button } from './ContactForm.styled';
import styled from '@emotion/styled';
import * as yup from 'yup';
import 'yup-phone';
import PropTypes from 'prop-types';

const Input = styled(Field)`
  max-width: 100%;
  margin-left: auto;
  font-size: 20px;
`;

const ConttForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  gap: 10px;
  font-size: 20px;
`;

const initialValues = { name: '', number: '' };

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phoneRegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

let SignupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const ContactForm = () =>  {
    const dispath = useDispatch();
    const contacts = useSelector(getContacts);
    
     const checkContact = checkedNameContact => {
        const res = contacts.find(contact => contact.name === checkedNameContact);
        return res;
      };

    const addNewContact = ({ name, number }) => {
        if (checkContact(name)) {
          alert(`${name} is already in contacts`);
          return;
        }
        dispath(addContact(name, number));
      };
    
      

   const handleSubmit = (values, { resetForm }) => {
    addNewContact(values);

    resetForm();
  };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        <ConttForm autoComplete="off">
          <Label>
            Name
            <Input type="text" name="name" />
            <ErrorMessage name="name" component="span" />
          </Label>

          <Label>
            Number
            <Input type="tel" name="number" required />
            <ErrorMessage name="number" component="span" />
          </Label>

          <Button type="submit">Add contact</Button>
        </ConttForm>
      </Formik>
    );
  }


ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;