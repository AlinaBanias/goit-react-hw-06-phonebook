import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { ContactsTitle, Container } from './App.styled';
import useInput from '../Hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { getFilterValue } from 'redux/filterSlice';

const App = () => {
  const input = useInput('');
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
  const dispath = useDispatch();

  const addNewContact = ({ name, number }) => {
    if (checkContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispath(addContact(name, number));
  };

  const checkContact = checkedNameContact => {
    const res = contacts.find(contact => contact.name === checkedNameContact);
    return res;
  };

  const getVisibleContacts = normalizedFilter => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = contactId => {
    dispath(deleteContact(contactId));
  };

  const normalizedFilter = filterValue.toLocaleLowerCase();
  const visibleContats = getVisibleContacts(normalizedFilter);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter {...input} />
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContats}
          onDeleteContact={onDeleteContact}
        />
      )}
    </Container>
  );
};

export default App;
