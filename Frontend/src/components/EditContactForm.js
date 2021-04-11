import React from 'react';
import { Button, Header, Image, Modal, Form, Message } from 'semantic-ui-react';

const EditContactForm = (props) => (
  <Modal open={props.showEditModal} onClose={props.hideEditModal} closeIcon>
    <Modal.Header>Editar Contacto</Modal.Header>
    <Modal.Content >
      <Form success id="editContactForm" onSubmit={props.editContact} success={props.success} error={props.error}>
        <Form.Input type='hidden' name='contactId' value={props.contactToEdit.id} />
        <Form.Input label='Nombres' defaultValue={props.contactToEdit.first_name} name='contactFirstName' />
        <Form.Input label='Apellidos' defaultValue={props.contactToEdit.last_name} name='contactLastName' />
        <Form.Input label='Descripcion' defaultValue={props.contactToEdit.description} name='contactDescription' />
        <Form.Input label='Telefono' defaultValue={props.contactToEdit.phone_number} name='contactPhoneNumber' />
        <Form.Input type='file' label='Imagen (Optional)' name='contactProfilePicture' />
        <Message
          success
          header='Exitoso!'
          content="Tu contacto ha sido modificado!"
        />
        <Message
          error
          header='Que Mal!'
          content="no pudimos modificar tu contacto!"
        />
        <Button>Editar</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

export default EditContactForm;
