


function setFormularioMensaje(formularioElemento, tipo, mensaje) {
    const mensajeElemento = formularioElemento.querySelector(".formulario__mensaje");

    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.remove("formulario__mensaje--exito", "formulario__mensaje--error");
    mensajeElemento.classList.add(`formulario__mensaje--${tipo}`);
}
function setEntradaError(entradaElemento, mensaje){
    entradaElemento.classList.add("formulario__entrada--error");
    entradaElemento.parentElement.querySelector(".formulario__entrada-error-mensaje").textContent = mensaje;
}
function clearEntradaError(entradaElemento){
    entradaElemento.classList.remove("formulario__entrada--error")
    entradaElemento.parentElement.querySelector(".formulario__entrada-error-mensaje").textContent = "";
}
document.addEventListener("DOMContentLoaded", () => {
    const incioSFormulario = document.querySelector("#iniciarSesion");
    const crearCuentaFormulario = document.querySelector("#crearCuenta");
    let intentos = 0
    let usuario = "administrador"
    let contrasena = "administrador1234"
    
    document.querySelector("#enlaceCreacionCuenta").addEventListener("click", e => {
        
        e.preventDefault();    
        incioSFormulario.classList.add("formulario--oculto");
        crearCuentaFormulario.classList.remove("formulario--oculto");
    });

    document.querySelector("#enlaceInicioSesion").addEventListener("click", e => {
        e.preventDefault(); 
        incioSFormulario.classList.remove("formulario--oculto");
        crearCuentaFormulario.classList.add("formulario--oculto");
    });
    incioSFormulario.addEventListener("submit", e =>{
        if (intentos >= 3) {
            e.preventDefault();
            setFormularioMensaje(incioSFormulario, "error", "¡Lo hemos detectado, usted NO es de los nuestros!");
            document.querySelector("#formulario__boton--iniciarS").classList.add("formulario__boton--error-bloqueado");
            document.querySelector("#formulario__boton--iniciarS").textContent =("BLOQUEADO");
        }
        else if (!(document.getElementById("entradaUsuario").value === usuario) || !(document.getElementById("entradaContrasena").value === contrasena)){
        e.preventDefault();
        intentos += 1;
        setFormularioMensaje(incioSFormulario, "error", "¡Combinación errada de nombre de usuario y contraseña!");
        }
        else if (((document.getElementById("entradaUsuario").value === usuario) && (document.getElementById("entradaContrasena").value === contrasena) && (intentos < 3))){
            e.preventDefault();
            setFormularioMensaje(incioSFormulario, "exito", "¡Bienvenido! Ha iniciado sesión exitosamente.");
        }
    });
       

});
    document.querySelectorAll(".formulario__entrada").forEach(entradaElemento => {
    entradaElemento.addEventListener("blur", e => {
        if (e.target.id === "inscripcionNombreUsuario" && e.target.value.length > 0 && e.target.value.length < 10) {
            setEntradaError(entradaElemento, "El nombre de usuario debe tener una longitud de al menos 10 caracteres");
        }
    });
    entradaElemento.addEventListener("input", e => {
        clearEntradaError(entradaElemento);
    });
});


// Contrasena id = entradaContrasena
//Usuario id = entradaUsuario
// Funcion iniciarSesionIntento if contrasena === entradaContrasena && usuario === entrada