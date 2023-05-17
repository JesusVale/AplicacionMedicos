import { getCitas } from "./peticiones.js";

const citasContenedor = document.querySelector(".citas");
const titulo = document.querySelector(".titulo");
const cedula = document.querySelector(".cedula");

let cedulaMedico = null;
let nombreMedico = null;
let citas = null;
let websocket = null;


window.onload =  async (e) =>{
    cedulaMedico = localStorage.getItem("cedula");
    nombreMedico = localStorage.getItem("nombre");
    titulo.innerHTML = "Bienvenido Dr. " + nombreMedico;
    cedula.innerHTML = "Cédula: " + cedulaMedico;

    console.log(cedulaMedico);
    const request = {
        nombreHospital: "CentroMedico",
        cedulaMedico
    }
    citas = await getCitas(request);

    

    const usuario = {
        identificador: cedulaMedico,
        tipo: "Medico"

    }
    const usuarioString = JSON.stringify(usuario);
    console.log(usuarioString)
    websocket = new WebSocket(`ws://localhost:8080/ServidorNotificaciones/websocketendpoint/${usuarioString}`);

    websocket.onopen = evt =>{
        //websocket.send(usuarioString);
    }
    

    websocket.onmessage = manejarMensaje

    llenarCitas();


}

function llenarCitas(){
    citas.forEach(cita => {
        const {nssPaciente} = cita;
        const divCita = document.createElement("div");
        const pCita = document.createElement("p");
        pCita.textContent = "Consulta Medica";
        const pPaciente = document.createElement("p");
        pPaciente.textContent = `NSS Paciente: ${nssPaciente}`;
        const btnSolicitar = document.createElement("button")
        btnSolicitar.addEventListener("click", (e) =>{
            websocket.send(JSON.stringify({
                destinatario: nssPaciente,
                evento: "Solicitar Expediente"
            }))
        })
        btnSolicitar.textContent = "Socitar Expediente"
        divCita.appendChild(pCita);
        divCita.appendChild(pPaciente);
        divCita.appendChild(btnSolicitar);
        citasContenedor.appendChild(divCita);
    });
}

function manejarMensaje(evt){
    const mensaje = JSON.parse(evt.data);
    const {tipo, datos} = mensaje

    if(tipo === "Expediente Subido"){
        alert(`Ya tiene acceso al expediente del paciente: ${datos}`)
    }

}