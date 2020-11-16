import React, { Component } from 'react'
import {Button, Grid, Form, Divider, Segment } from 'semantic-ui-react';
import logo from '../../public/imagenes/people-heart.png';
import '../../public/stylesheets/NoAutorizado.css';
import BotonLogout from "./../inicio-de-sesion/BotonLogout";

const origenSolicitud = 'http://localhost:3000/';
const solicitudAccesoNahual= 'https://nahual-admin.herokuapp.com/';
const clave = 'Nahual123';

export class VistaNoAutorizado extends Component {
    
    usuario = null;
    constructor(props){
        super(props);
        this.state = {
            usuario : null
        }
    }

    componentDidUpdate(){
        var datos = this.props.datosUsuario; 
        this.recibirDatos(datos);
    }

    recibirDatos(datos){
        this.usuario = datos
    }

    generarDatosDeSolicitud(datos){
        var datosUsuario = JSON.parse(datos);
        const datosEnvio = {
            nombre: datosUsuario.nombre,
            correo: datosUsuario.email,
            origen: datosUsuario.aplicacion,
            redirigir: origenSolicitud
        }
        console.log(datosEnvio);
    
          var AES = require('crypto-js/aes');
          let encriptado = AES.encrypt(JSON.stringify(datosEnvio), clave);
          let urlSolicitud = new URL(solicitudAccesoNahual);
          let parametros = urlSolicitud.searchParams;
          parametros.set('datos', encriptado.toString());
          urlSolicitud.search = parametros.toString();
          window.location.assign(urlSolicitud);
    }

    render() {
        return (
            <div>
                <div className="logoNoAutorizado">
                    <img src={logo} style={{ width: '300px', height: '300px' }}></img>
                    <h1>Lo sentimos, parece que no tienes acceso a la siguiente página</h1>
                </div>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column className="centrar">
                        <h2>Puedes solicitar acceso</h2>
                        <Button className="acceso" onClick={() => {this.generarDatosDeSolicitud(this.props.datosUsuario)}}>Solicitar Acceso</Button>
                    </Grid.Column>

                    <Grid.Column className="centrar" verticalAlign='middle'>
                        <h2>Volver al menú principal</h2>
                        <BotonLogout />
                    </Grid.Column>
                    </Grid>

                    <Divider vertical>Ó</Divider>
                </Segment>
            </div>
        )
    }
}
export default VistaNoAutorizado