const apiURL = "/api/contacts";

export const toggleAddContact = () => {
  return {
    type: "TOGGLE_ADD_CONTACT"
  }
}

/*
* Fetch Actions
*/

export const fetchContacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    return fetch(apiURL).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(fetchContactsSuccess(data, data.message));
        })
      } else {
        response.json().then(error => {
          dispatch(fetchContactsFailure(error));
          console.log(error);
        })
      }
    })
  }
}

export const fetchContactsRequest = () => {
  return {
    type: "FETCH_CONTACTS_REQUEST"
  }
}

export const fetchContactsSuccess = (contacts, message) => {
  return {
    type: "FETCH_CONTACTS_SUCCESS",
    contacts: contacts,
    message: message,
    receivedAt: Date.now
  }
}

export const fetchContactsFailure = (error)  => {
  return {
    type:  "FETCH_CONTACTS_FAILURE",
    error
  }
}

export const fetchContactById = (contactId) => {
  return (dispatch) => {
    dispatch(fetchContactByIdRequest());
    return fetch(apiURL + contactId, {
      method: 'GET'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(fetchContactByIdSuccess(data.contact, data.message));
        })
      } else {
        response.json().then(error => {
          dispatch(fetchContactByIdFailure(error));
        })
      }
    })
  }
}

export const fetchContactByIdRequest = () => {
  return {
    type: "FETCH_CONTACT_REQUEST"
  }
}
export const fetchContactByIdSuccess = (contact, message) => {
  return {
    type: "FETCH_CONTACT_SUCCESS",
    contact: contact,
    message: message,
    receivedAt: Date.now
  }
}

export const fetchContactByIdFailure = (error) => {
  return {
    type: "FETCH_CONTACT_FAILURE",
    error
  }
}

/*
* Add Contact Actions
*/

export const addContact = (contactToAdd) => {
  return (dispatch) => {
    dispatch(addContactRequest());
    return fetch(apiURL, {
      method: 'POST',
      body: contactToAdd
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(addContactSuccess(data[0], data.message));
        })
      } else {
        response.json().then(error => {
          dispatch(addContactFailure(error));
        })
      }
    })
  }
}

export const addContactRequest = (contact) => {
  return {
    type: 'ADD_CONTACT_REQUEST',
    contact
  }
}

export const addContactSuccess = (contact, message) => {
  return {
    type: 'ADD_CONTACT_SUCCESS',
    contact: contact,
    message: message
  }
}

export const addContactFailure = (error) => {
  return {
    type: 'ADD_CONTACT_FAILURE',
    error
  }
}

export const hideAddContactForm = () => {
  return {
    type: 'HIDE_ADD_CONTACT_FORM'
  }
}

/*
* Edit Actions
*/

export const editContact = (contactToEdit) => {
  return (dispatch) => {
    dispatch(editContactRequest(contactToEdit));
    return fetch(apiURL, {
      method: 'PUT',
      body: contactToEdit
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editContactSuccess(data[0], data.message));
        })
      } else {
        response.json().then(error => {
          dispatch(editContactFailure(error));
        })
      }
    })
  }
}

export const editContactRequest = (contact) => {
  return {
    type: 'EDIT_CONTACT_REQUEST',
    contact: contact
  }
}

export const editContactSuccess = (contact, message) => {
  return {
    type: 'EDIT_CONTACT_SUCCESS',
    contact: contact,
    message: message
  }
}

export const editContactFailure = (error) => {
  return {
    type: 'EDIT_CONTACT_FAILURE',
    error
  }
}

export const hideEditContactForm = () => {
  return {
    type: 'HIDE_EDIT_CONTACT_FORM'
  }
}

export const showEditContactForm = (contact) => {
  return {
    type: 'SHOW_EDIT_CONTACT_FORM',
    contact: contact
  }
}

export const showSuccessMessage = () => {
  return {
    type: 'SHOW_SUCCESS_MESSAGE'
  }
}

export const showErrorMessage = () => {
  return {
    type: 'SHOW_ERROR_MESSAGE'
  }
}

/*
* Delete Actions
*/

export const showDeleteModal = (contact) => {
  return {
    type: 'SHOW_DELETE_MODAL',
    contact
  }
}

export const hideDeleteModal = () => {
  return {
    type: 'HIDE_DELETE_MODAL'
  }
}

export const deleteContact = (contactToDelete) => {
  return (dispatch) => {
    dispatch(deleteContactRequest(contactToDelete));
    return fetch(apiURL + '/' + contactToDelete.id + '/' + contactToDelete.image, {
      method: 'DELETE',
      body: contactToDelete
    }).then(response => {
      if(response.ok) {
        response.json().then(data => {
          dispatch(deleteContactSuccess(data.message));
        })
      } else {
        console.log(response)
        response.json().then(error => {
          dispatch(deleteContactFailure(error));
        })
      }
    })
  }
}

export const deleteContactRequest = (contact) => {
  return {
    type: 'DELETE_CONTACT_REQUEST',
    contact: contact
  }
}

export const deleteContactSuccess = (message) => {
  return {
    type: 'DELETE_CONTACT_SUCCESS',
    message
  }
}

export const deleteContactFailure = (error) => {
  return {
    type: 'DELETE_CONTACT_FAILURE',
    error
  }
}
