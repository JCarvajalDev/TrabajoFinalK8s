const INITIAL_STATE = {
  showAddContact: false,
  showSuccessMessage: false,
  showErrorMessage: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_CONTACT':
      return {
        ...currentState,
        showAddContact: !currentState.showAddContact,
        showSuccessMessage: false,
        showErrorMessage: false
      }
    case 'SHOW_ERROR_MESSAGE':
      return {
        ...currentState,
        showAddContact: currentState.showAddContact,
        showSuccessMessage: false,
        showErrorMessage: true
      }
    case 'SHOW_SUCCESS_MESSAGE':
      return {
        ...currentState,
        showAddContact: currentState.showAddContact,
        showSuccessMessage: true,
        showErrorMessage: false
      }
    default:
      return currentState;
    }
}
export default appReducer;
