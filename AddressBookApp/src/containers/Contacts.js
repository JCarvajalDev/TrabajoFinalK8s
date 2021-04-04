import { connect } from 'react-redux';
import * as contactActions from '../actions/contactActions';
import Contacts from '../components/Contacts';

// map state to props
const mapStateToProps = (state) => {
  return {
    mappedContactState: state.contactState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(contactActions.fetchContacts()),
    mappedHideEditModal: () => dispatch(contactActions.hideEditContactForm()),
    mappedShowEditModal: (contactToEdit) => dispatch(contactActions.showEditContactForm(contactToEdit)),
    mappedEditContact: (contactToEdit) => dispatch(contactActions.editContact(contactToEdit)),
    mappedShowSuccessMessage: () => dispatch(contactActions.showSuccessMessage()),
    mappedShowErrorMessage: () => dispatch(contactActions.showErrorMessage()),
    mappedDeleteContact: (contactToDelete) => dispatch(contactActions.deleteContact(contactToDelete)),
    mappedHideDeleteModal: () => dispatch(contactActions.hideDeleteModal()),
    mappedShowDeleteModal: (contactToDelete) => dispatch(contactActions.showDeleteModal(contactToDelete)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
