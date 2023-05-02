import { verificarCedula } from "./peticiones.js";

const formLogin = document.querySelector(".form--login");

formLogin.addEventListener("submit", iniciarSesion);

async function iniciarSesion(e){
    e.preventDefault();
    const cedula = document.querySelector(".form__input--cedula").value;
    const verificacion = await verificarCedula(cedula);

    if(verificacion){
        localStorage.setItem("cedula", cedula)
        window.location.href = "../inicio.html"
    } else{
        alert("Cedula no válida")
    }

}
