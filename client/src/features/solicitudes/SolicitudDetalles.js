import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAceptarSolicitudMutation, useGetSolicitudPendienteByIdQuery, useRechazarSolicitudMutation } from './solicitudesSlice';
import Loading from '../../Components/Loading';
import "./SolicitudDetalles.css";
import { useGlobalContext } from '../../context';
import { FaMapMarkerAlt } from "react-icons/fa";
import Modal from './Modal'; 

const SolicitudDetalles = () => {
    const { id_solicitud } = useParams();
    const [enableBtn, setEnableBtn] = useState(true);
    const { showAlert } = useGlobalContext();
    const navigate = useNavigate();

    const [aceptar] = useAceptarSolicitudMutation();
    const [rechazar ] = useRechazarSolicitudMutation();
    const { data: solicitud, isFetching, isSuccess } = useGetSolicitudPendienteByIdQuery(id_solicitud);

    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleAccept = async () => {
        setEnableBtn(false);
        await aceptar(id_solicitud);
        showAlert('Solicitud Aceptada', 'success');
        navigate("/perfil");
    }

    const handleCancel = async () => {
        setEnableBtn(false);
        await rechazar(id_solicitud);
        showAlert('Solicitud Rechazada', 'danger');
        navigate("/perfil");
    }

    function formatFecha(fecha) {
        const [year, month, day] = fecha.split("-");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }

    if (isFetching) {
        return <Loading />
    } else if (isSuccess) {
        return (
            <>
                <div id='solicitud_detalles' className='page'>
                    <div className='solicitud-detalles-center'>
                        <div className='cliente-info'>
                            <div className='profile-image' style={{ backgroundImage: "url(/images/user.jpeg)" }}></div>
                            <h3>{solicitud.nombre_cliente}</h3>
                            <span className='text-warning'>★★★☆☆</span>
                            <p>Edad: {solicitud.edad_cliente} años</p>
                            <Link to={`/amigos/${solicitud.cliente}`} className='btn btn-azul btn-lg'>Ver Perfil</Link>
                        </div>
                        <div className='solicitud-details'>
                            <div className='title'>
                                <h1>Detalles de la solicitud</h1>
                            </div>
                            <div className='details'>
                                <p><strong>Fecha: </strong> {formatFecha(solicitud.fecha_inicio)}</p>
                                <p><strong>Hora: </strong> {solicitud.hora_inicio.slice(0, 5)}</p>
                                <p><strong>Tiempo: </strong> {solicitud.minutos} {solicitud.minutos === 1 ? "hr" : "hrs"}</p>
                                <p><strong>Lugar: </strong> {solicitud.lugar} <span><FaMapMarkerAlt /></span> </p>
                                <p><strong>Descripción:</strong></p>
                                <p>{solicitud.descripcion}</p>
                            </div>
                            <div className='footer'>
                                <p className='fw-light text-secondary'> Fecha solicitud: {solicitud.timestamp_registro}</p>
                                <h5>Total: {solicitud.precio * solicitud.minutos} Bs </h5>
                                <div className='btns'>
                                    <button
                                        onClick={() => setShowAcceptModal(true)}
                                        className={`btn btn-success btn-lg ${!enableBtn && "disabled"}`}
                                    >Aceptar</button>
                                    <button
                                        className={`btn btn-danger btn-lg ${!enableBtn && "disabled"}`}
                                        onClick={() => setShowCancelModal(true)}
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                    show={showAcceptModal}
                    onClose={() => setShowAcceptModal(false)}
                    onConfirm={handleAccept}
                    title="Confirmación de Aceptación"
                    message="¿Estás seguro de aceptar el encuentro?"
                    confirmText="Aceptar"
                    cancelText="Cancelar"
                />
                <Modal
                    show={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    onConfirm={handleCancel}
                    title="Confirmación de Rechazo"
                    message="¿Estás seguro de rechazar el encuentro?"
                    confirmText="Rechazar"
                    cancelText="Cancelar"
                />
                </div>
                
            </>
        )
    }
}

export default SolicitudDetalles;
