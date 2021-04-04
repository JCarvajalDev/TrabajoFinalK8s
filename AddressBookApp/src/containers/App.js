import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import * as contactActions from '../actions/contactActions';
import App from '../components/App';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    mappedAppState: state.appState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    mappedToggleAddContact: () => dispatch(appActions.toggleAddContact()),
    mappedAddContact: (contact) => dispatch(contactActions.addContact(contact)),
    mappedHideAddContactForm: () => dispatch(contactActions.hideAddContactForm()),
    mappedShowErrorMessage: () => dispatch(appActions.showErrorMessage()),
    mappedShowSuccessMessage: () => dispatch(appActions.showSuccessMessage())
  }
}

// must connect the container to the component in order to map
export default connect(mapStateToProps, mapDispatchToProps)(App);
