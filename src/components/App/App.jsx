import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { ContactsTitle, Container } from './App.styled';
import useInput from '../Hooks/useInput';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';



const App = () => {
  const input = useInput('');
  const contacts = useSelector(getContacts);


  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter {...input} />
      {contacts.length > 0 && (
        <ContactList/>
      )}
    </Container>
  );
};

export default App;
