import React from 'react';

export default class Contact extends React.Component {
  componentDidMount(){
    this.props.mappedFetchContactById(this.props.params.id);
  }

  render() {
    const contactState = this.props.mappedContactState;
    return(
      <div className="contactDetails">
        <h2>Detalle Contactos</h2>
        {!contactState.contact && contactState.isFetching &&
         <div>
           <p>Cargando Contactos....</p>
         </div>
        }
        {contactState.contact && !contactState.isFetching &&
        <div>
         <h3>{contactState.contact.first_name}</h3>
         <p>{contactState.contact.last_name}</p>
         <p>{contactState.contact.phone_number}</p>
         <p>{contactState.contact.description}</p>
        </div>
       }
      </div>

    )
  }
}
