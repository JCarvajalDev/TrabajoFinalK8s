import React from 'react';
import { Header, Icon, Button, Modal, Label } from 'semantic-ui-react';
import AddContactForm from './AddContactForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddContact = this.toggleAddContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.hideAddContactForm = this.hideAddContactForm.bind(this);
  }

  toggleAddContact(event) {
    event.preventDefault();
    this.props.mappedToggleAddContact();
  }

  addContact(event) {
    event.preventDefault();
    const form = document.getElementById('addContactForm')
    if(form.contactFirstName.value !== ""  && form.contactLastName.value !== "" && form.contactPhoneNumber.value !== ""){
      const data = new FormData();
      data.append('first_name', form.contactFirstName.value);
      data.append('phone_number', form.contactPhoneNumber.value);
      data.append('last_name', form.contactLastName.value);
      data.append('image', form.contactProfilePicture.files[0]);
      data.append('description', form.contactDescription.value);
      this.props.mappedAddContact(data);
      this.props.mappedShowSuccessMessage();
    }
    else {
      this.props.mappedShowErrorMessage();
      return ;
    }
  }

// not using
  hideAddContactForm() {
    this.props.mappedHideAddContactForm();
  }

  render() {
    const appState = this.props.mappedAppState;
    return(     
      <div>
         <div>

         <Label as='a' color='teal' tag>
              <Icon name='github' />Fuente Original https://github.com/Brandon05/Address-Book-          
         </Label>

         <Label as='a' color='red' tag>
              <Icon name='github' />Fuente Trabajo Final https://github.com/JCarvajalDev/TrabajoFinalK8s          
         </Label>
                      
        </div>

        <Header as='h1' size='huge' icon textAlign='center' style={{marginTop: 15}} >
          <Icon name='address book' circular size='mini' />
          <Header.Content>
            Mi Agenda de Contactos
          </Header.Content>
        </Header>
        <div>
          <Button fluid color='facebook' style={{borderRadius: 0}} onClick={this.toggleAddContact}>Agregar Contactos</Button>
        </div>
        <div className="container">
          <AddContactForm
            showAddContact={appState.showAddContact}
            hideAddContact={this.toggleAddContact}
            addContact={this.addContact}
            success={appState.showSuccessMessage}
            error={appState.showErrorMessage}
          />
          { /* Each Smaller Components */}
            {this.props.children}
        </div>
      </div>
    )
  }
}
