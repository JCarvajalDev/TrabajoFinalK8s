import { connect } from 'react-redux';
import * as contactActions from '../actions/contactActions';
import Contact from '../components/Contact';

const mapStateToProps = (state) => {
  return {
    mappedContactState: state.contactState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedFetchContactById: contactId => dispatch(contactActions.fetchContactById)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
