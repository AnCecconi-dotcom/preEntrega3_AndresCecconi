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

function mostrarSaldoEnDeposito() {
    const saldoDisponibleDeposito = document.getElementById('saldoDisponibleDeposito');
    saldoDisponibleDeposito.innerText = `Su saldo actual es $${saldo}`;
}

function deposito(monto) {
    saldo += monto;
    // Actualizar el saldo en el elemento correspondiente en la página
    mostrarSaldo();
}

//variables Globales
let usuarioRegistrado = "";
let contraseñaRegistrada = "";
let saldo = 0;



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
    document.getElementById('botonDeposito').addEventListener('click', function () {
        //ocultar pagina principal
        document.getElementById('paginaPrincipal').classList.add('oculto');

        //mostrar seccion deposito con saldo actualizado
        document.getElementById('seccionDeposito').classList.remove('oculto');
        mostrarSaldoEnDeposito();
    });

    document.getElementById('montoADepositar').addEventListener('submit', function (event) {
        event.preventDefault();

        let nuevoMonto = parseFloat(document.getElementById('monto').value);

        if (!isNaN(nuevoMonto) && nuevoMonto > 0) {
            //Mensaje de confirmacion
            const confirmacion = confirm(`Usted esta a punto de depositar $${nuevoMonto}. Desea confirmar?`);
            if (confirmacion) {
                deposito(nuevoMonto);
                alert('Deposito realizado con exito!');
                // Limpiar el campo del formulario
                document.getElementById('monto').value = '';

                // Ocultar la sección de depósito después de realizar el depósito
                document.getElementById('seccionDeposito').classList.add('oculto');

                // Mostrar nuevamente la página principal
                document.getElementById('paginaPrincipal').classList.remove('oculto');
            } else {
                // Limpiar el campo del formulario
                document.getElementById('monto').value = '';
                //volver a la pagina principal
                document.getElementById('seccionDeposito').classList.add('oculto');
                document.getElementById('paginaPrincipal').classList.remove('oculto');
            }

        } else {
            // Monto ingresado no válido
            alert('El monto ingresado no es válido.');
        }
    });

     // Evento click para mostrar la sección de transferencias
     document.getElementById('botonTransferencias').addEventListener('click', function () {
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionTransferencias').classList.remove('oculto');
    });

     // Evento submit para el formulario de transferencias
     document.getElementById('formularioTransferencia').addEventListener('submit', function (event) {
        event.preventDefault();

        const aliasCBU = document.getElementById('aliasCBU').value;
        const montoTransferir = parseFloat(document.getElementById('montoTransferir').value);

        // Verificar que el monto a transferir sea menor o igual al saldo disponible
        if (montoTransferir <= saldo) {
            // Verificar si el alias o CBU está en la agenda (A REALIZAR)
            
            // confirmar la transferencia
            const confirmacion = confirm(`Usted está a punto de transferir $${montoTransferir} a ${aliasCBU}. ¿Desea confirmar la operación?`);
            
            if (confirmacion) {
                // actualizar saldo
                saldo -= montoTransferir;
                mostrarSaldo();

                // alert operación exitosa
                alert('Transferencia realizada con éxito.');

                // limpiar campos del formulario
                document.getElementById('aliasCBU').value = '';
                document.getElementById('montoTransferir').value = '';

                // volver a la página principal
                document.getElementById('paginaPrincipal').classList.remove('oculto');
                document.getElementById('seccionTransferencias').classList.add('oculto');
            }
        } else {
            alert('Fondos insuficientes para realizar la transferencia.');
        }
    });

    // Botón "Cancelar" en la sección de transferencias
    document.getElementById('cancelarTransferencia').addEventListener('click', function () {
        // Limpiar los campos del formulario
        document.getElementById('aliasCBU').value = '';
        document.getElementById('montoTransferir').value = '';

        // Volver a la página principal
        document.getElementById('paginaPrincipal').classList.remove('oculto');
        document.getElementById('seccionTransferencias').classList.add('oculto');
    });
});






