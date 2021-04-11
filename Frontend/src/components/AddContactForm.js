import React from 'react';
import { Button, Header, Image, Modal, Form, Message } from 'semantic-ui-react';

const AddContactForm = (props) => (
  <Modal open={props.showAddContact} onClose={props.hideAddContact} closeIcon>
    <Modal.Header>Agregar Contacto</Modal.Header>
    <Modal.Content >
      <Form success id="addContactForm" onSubmit={props.addContact} success={props.success} error={props.error}>
        <Form.Input label='Nombres' placeholder='John' name='contactFirstName' />
        <Form.Input label='Apellidos' placeholder='Doe' name='contactLastName' />
        <Form.Input label='Descripcion' placeholder='Optional e.g. Client, Friend, Barber..' name='contactDescription' />
        <Form.Input label='Telefono' placeholder='1-800-444-4444' name='contactPhoneNumber' />
        <Form.Input type='file' label='Imagen (Optional)' name='contactProfilePicture' />
        <Message
          success
          header='Exitoso!'
          content="Tu Contacto ha sido Agregado"
        />
        <Message
          error
          header='Que Mal!'
          content="no pudimos grabar su contacto!"
        />
        <Button>Guardar</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

export default AddContactForm;
