import { verificarCedula } from "./peticiones.js";

const formLogin = document.querySelector(".form--login");

formLogin.addEventListener("submit", iniciarSesion);

async function iniciarSesion(e){
    e.preventDefault();
    const cedula = document.querySelector(".form__input--cedula").value;
    let respuesta;
    try {
        respuesta = await verificarCedula(cedula);
        //Extrae todos los datos del medico y los guarda en LocalStorage
        const {body} = respuesta
        console.log(respuesta)
        console.log(body)
        localStorage.setItem("cedula", body.cedulaMedico)
        localStorage.setItem("nombre", body.nombreMedico)
        localStorage.setItem("token", body.token)
        window.location.href = "../inicio.html"
    } catch (error) {
        //Si lanza un error lo muestra con un alert()
        alert(error)
    }
}
