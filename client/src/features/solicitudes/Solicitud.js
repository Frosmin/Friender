import React from 'react'
import "./Solicitud.css"

const Solicitud = ({solicitud}) => {
    return (
    <div className="solicitud-recibida-card" >
            <div id="datos-perfil">
                <img id="foto-perfil" src="https://lapi.com.mx/web/image/product.template/5138/image_1024?unique=f67111b" alt="foto-perfil"/>
                <p>NOMBRE DE USUARIO</p>
            </div>
            <div id="datos-solicitud">
                <p className="estrellas">★★★★☆</p>
                <div>
                    <img className="icono-solicitudes-recibidas" src="https://w7.pngwing.com/pngs/162/843/png-transparent-computer-icons-calendar-date-others-miscellaneous-text-calendar.png" alt="icono calendario"/>
                    <p>dd/mm/aa</p>
                </div>
                <div>
                    <img className="icono-solicitudes-recibidas" src="https://w7.pngwing.com/pngs/971/269/png-transparent-clock-computer-icons-clock-cdr-text-time.png" alt="icono hora"/>
                    <p>00:00</p>
                </div>
                <div>
                    <img className="icono-solicitudes-recibidas" src="https://w7.pngwing.com/pngs/912/661/png-transparent-computer-icons-location-location-icon-map-location-icon-miscellaneous-desktop-wallpaper-map-thumbnail.png" alt="icono ubicacion"/>
                    <p>BOLIVIA - COCHABAMBA</p>
                </div>
                <div id="button-box">
                    <button id="ver-perfil-button" type="button">Ver Perfil</button>
                </div>
            </div>
            <p className="hora-solicitud">1h</p>
    </div>
  )
}

export default Solicitud
