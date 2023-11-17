//funciones
function inicioSesion(usuarioIngresado, contraseñaIngresada, usuarioRegistrado, contraseñaRegistrada) {
    if (usuarioIngresado == usuarioRegistrado && contraseñaIngresada == contraseñaRegistrada) {
        alert("Bienvenido " + usuarioRegistrado + ". Ya estás listo para operar!");
        document.getElementById('sesion').classList.add('oculto');
        sessionStorage.setItem('nombreUsuario', usuarioRegistrado);

    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.");

        document.getElementById('nombreUsuario').value = "";
        document.getElementById('contrasenia').value = "";
        return;
    }
}

function mostrarSaldo() {
    const saldoDisponible = document.getElementById('saldoDisponible');
    saldoDisponible.innerText = `$${saldo}`;
}

//variables Globales
let usuarioRegistrado = "";
let contraseñaRegistrada = "";
let saldo = 0


//PROGRAMA
document.addEventListener('DOMContentLoaded', function () {
    // formulario de registro y listener para el evento 'submit'
    document.getElementById('registro').classList.remove('oculto');
    document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const usuario = document.getElementById('inputUsuario').value;
        const contraseña = document.getElementById('inputContrasenia').value;
        const confirmarContrasenia = document.getElementById('inputConfirmarContrasenia').value;

        console.log('Usuario:', usuario);
        console.log('Contraseña:', contraseña);
        console.log('Confirmar contraseña:', confirmarContrasenia);

        // Verificar campos vacíos
        if (usuario == "" || contraseña == "" || confirmarContrasenia == "") {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Verificar contraseña
        if (contraseña !== confirmarContrasenia) {
            alert('Las contraseñas no coinciden. Inténtelo de nuevo.');
            return;
        }
        usuarioRegistrado = usuario;
        contraseñaRegistrada = contraseña;
        alert('Registro exitoso! Ahora seras redirigido a la página principal para iniciar sesión')

        // Ocultar el formulario de registro y mostrar el inicio de sesión
        document.getElementById('registro').classList.add('oculto');
        document.getElementById('sesion').classList.remove('oculto');
    });
    // Formulario de inicio de sesión
    document.getElementById('inicioSesion').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario 
        const usuarioIngresado = document.getElementById('nombreUsuario').value;
        const contraseñaIngresada = document.getElementById('contrasenia').value;

        console.log('Usuario:', usuarioIngresado);
        console.log('Contraseña:', contraseñaIngresada);

        // Comparar los valores con los datos de registro
        inicioSesion(usuarioIngresado, contraseñaIngresada, usuarioRegistrado, contraseñaRegistrada);

        //guardar variable en local storage para recuperar luego
        if (usuarioIngresado === usuarioRegistrado && contraseñaIngresada === contraseñaRegistrada) {
            // Almacenar el nombre de usuario en localStorage
            localStorage.setItem('nombreUsuario', usuarioRegistrado);

            // Ocultar el formulario de inicio de sesion y mostrar la pagina principal
            document.getElementById('sesion').classList.add('oculto');
            document.getElementById('paginaPrincipal').classList.remove('oculto');
           
            //Pagina Principal
            // Mostrar el mensaje de bienvenida con el nombre de usuario y el saldo
            const nombreUsuario = localStorage.getItem('nombreUsuario');
            document.getElementById('mensajeBienvenida').innerText = `Hola, ${nombreUsuario}`;

            mostrarSaldo();
        }
    });



});





