import { getContacts } from 'redux/selectors'; 
import { getFilterValue } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import ContactItem from 'components/ContactItem';
import { ContList } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = () => {
    const filterValue = useSelector(getFilterValue);
    const contacts = useSelector(getContacts);
    const dispath = useDispatch();

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
    <ContList>
      {visibleContats.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ContList>
  );
};

ContactList.propTypes = {
  visibleContats: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;