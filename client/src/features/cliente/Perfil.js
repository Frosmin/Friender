import React, { useEffect, useState} from "react";
import "./Perfil.css";
import { useGlobalContext } from "../../context";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import SolicitudesPendientes from "../solicitudes/SolicitudesPendientes";
import SolicitudesAceptadas from "../solicitudes/SolicitudesAceptadas";
import PerfilCliente from "../cliente/PerfilCliente";
import HabilitarAmigo from "./HabilitarAmigo";
import MiPerfil from "../../Components/MiPerfil/MiPerfil"
import { useIsEnabledFriendModeQuery } from "./clienteSlice";
import Loading from "../../Components/Loading";

const optionsData = [
  // {
  //   id : 1,   
  //   name : "Editar Perfil",
  //   toRender : <div className='editar-perfil'><h1>Editar Perfil</h1></div>},
  {
    id: 1,
    name: "Mi Perfil",
    toRender: <MiPerfil />,
  },
  {
    id: 2,
    name: "Solicitudes Pendientes",
    toRender: <SolicitudesPendientes />,
  },
  {
    id:3,
    id:3,
    name: 'Encuentros Programados',
    toRender: <SolicitudesAceptadas/>
  },
  {
    id:4,
    name: 'Cuenta de Amigo',
    toRender: <HabilitarAmigo/>
  },
  
];

const Perfil = () => {
  const [currentOption, setCurrentOption] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const {userData : informacion,setIsFriendModeEnabled} = useGlobalContext();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");

  const {data,isFetching,isSuccess} = useIsEnabledFriendModeQuery({token : cookies.token});

  useEffect(() => {
    if (informacion) {
      console.log(informacion);
      setNombreCompleto(informacion.nombre_completo);
      setImagenBase64(informacion.imagenBase64);
      //nombre_completo = informacion.nombre_completo
    }
  }, [informacion]);

  const handleCloseSession = () => {
    removeCookie("token");
    navigate("/");
    window.location.reload();
  }   
  const handleOptionClick = (id) => {
    setCurrentOption(id);
    if (window.innerWidth < 576) {
      setShowContent(true);
    }
  };  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 576) {
        setShowContent(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data,"data");
      setIsFriendModeEnabled(data.data);
    }
  }, [isFetching, data, setIsFriendModeEnabled, isSuccess]);

  if(isFetching){
    return <Loading/>
  }else if(isSuccess){
    return (
      <div className="profile-section">
        <div
          className={`profile-section-center ${showContent && "show-content"}`}
        >
          <div className="profile-options">
            <div className="profile-info">
              <div className="profile-image">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${imagenBase64 ? `data:image/jpeg;base64,${imagenBase64}` : "/images/user.jpeg"})`,
                  }}
                ></div>
              </div>
              <h4>{nombreCompleto}</h4>
            </div>
            <div className="options">
              <ul>
                {optionsData.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleOptionClick(item.id)}
                    className={`option ${currentOption === item.id && "active"}`}
                  >
                    <p>{item.name}</p>
                  </li>
                ))}
                <li className='option'>
                  <li><button className="dropdown-item "onClick={handleCloseSession}>Cerrar Sesión</button></li>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-content">
            {optionsData.find((option) => option.id === currentOption).toRender}
  
            <div className="return-btn" onClick={() => setShowContent(false)}>
              <span>
                <GiReturnArrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
};

export default Perfil;
