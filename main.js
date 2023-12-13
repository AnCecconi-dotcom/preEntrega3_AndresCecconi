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

function agregarContacto() {
    const nombre = document.getElementById('nombre').value;
    const alias = document.getElementById('alias').value;
    const cbu = document.getElementById('cbu').value;

    // verificar si se completó al menos uno de los campos
    if (nombre === '' && alias === '' && cbu === '') {
        alert('Por favor, complete al menos uno de los campos (Alias o CBU).');
        return null;
    }
    return {
        nombre: nombre,
        alias: alias,
        cbu: cbu
    }
}

function mostrarAgenda() {
    const agendaElemento = document.getElementById('agenda');
    agendaElemento.innerHTML = ''; // Limpiar contenido anterior
    if (agenda.length === 0) {
        // Si la agenda está vacía, mostrar un mensaje indicando que está vacía
        agendaElemento.innerHTML = '<p>No hay contactos en la agenda.</p>';
        return;
    }

    agenda.forEach(contacto => {
        const itemContacto = document.createElement('div');
        itemContacto.innerHTML = `
        <p>Nombre: ${contacto.nombre}</p>
        <p>Alias/CBU: ${contacto.alias} / ${contacto.cbu}</p>
        `;
        agendaElemento.appendChild(itemContacto);
    });
}

//clases
//clase Contacto
class Contacto {
    constructor(nombre, alias, cbu) {
        this.nombre = nombre;
        this.alias = alias;
        this.cbu = cbu;
    }
}

//variables Globales
let usuarioRegistrado = "";
let contraseñaRegistrada = "";
let saldo = 0;
let agenda = []; // array agenda contactos
let nombre = "";
let alias = "";
let cbu = "";



//PROGRAMA
document.addEventListener('DOMContentLoaded', function () {
    // formulario de registro y listener para el evento 'submit'
    document.getElementById('registro').classList.remove('oculto');
    document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
        event.preventDefault();

        // obtener valores del formulario
        const usuario = document.getElementById('inputUsuario').value;
        const contraseña = document.getElementById('inputContrasenia').value;
        const confirmarContrasenia = document.getElementById('inputConfirmarContrasenia').value;

        console.log('Usuario:', usuario);
        console.log('Contraseña:', contraseña);
        console.log('Confirmar contraseña:', confirmarContrasenia);

        // verificar campos vacíos
        if (usuario == "" || contraseña == "" || confirmarContrasenia == "") {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // verificar contraseña
        if (contraseña !== confirmarContrasenia) {
            alert('Las contraseñas no coinciden. Inténtelo de nuevo.');
            return;
        }
        usuarioRegistrado = usuario;
        contraseñaRegistrada = contraseña;
        alert('Registro exitoso! Ahora seras redirigido a la página principal para iniciar sesión')

        // Ooultar el formulario de registro y mostrar el inicio de sesión
        document.getElementById('registro').classList.add('oculto');
        document.getElementById('sesion').classList.remove('oculto');
    });
    // formulario de inicio de sesión
    document.getElementById('inicioSesion').addEventListener('submit', function (event) {
        event.preventDefault();

        // obtener valores del formulario 
        const usuarioIngresado = document.getElementById('nombreUsuario').value;
        const contraseñaIngresada = document.getElementById('contrasenia').value;

        console.log('Usuario:', usuarioIngresado);
        console.log('Contraseña:', contraseñaIngresada);

        // comparar valores con los datos de registro
        inicioSesion(usuarioIngresado, contraseñaIngresada, usuarioRegistrado, contraseñaRegistrada);

        //guardar variable en local storage para recuperar luego
        if (usuarioIngresado === usuarioRegistrado && contraseñaIngresada === contraseñaRegistrada) {
            // almacenar el nombre de usuario en localStorage
            localStorage.setItem('nombreUsuario', usuarioRegistrado);

            // ocultar el formulario de inicio de sesion y mostrar la pagina principal
            document.getElementById('sesion').classList.add('oculto');
            document.getElementById('paginaPrincipal').classList.remove('oculto');

            //PAGINA PRINCIPAL
            // mostrar el nombre de usuario y el saldo
            const nombreUsuario = localStorage.getItem('nombreUsuario');
            document.getElementById('mensajeBienvenida').innerText = `Hola, ${nombreUsuario}`;

            mostrarSaldo();
        }
    });


    // evento click seccion deposito
    document.getElementById('botonDeposito').addEventListener('click', function () {
        //ocultar pagina principal
        document.getElementById('paginaPrincipal').classList.add('oculto');

        //mostrar seccion deposito con saldo actualizado
        document.getElementById('seccionDeposito').classList.remove('oculto');
        mostrarSaldoEnDeposito();
    });
    //evento submit formulario deposito
    document.getElementById('montoADepositar').addEventListener('submit', function (event) {
        event.preventDefault();

        let nuevoMonto = parseFloat(document.getElementById('monto').value);

        if (!isNaN(nuevoMonto) && nuevoMonto > 0) {
            //mensaje de confirmacion
            const confirmacion = confirm(`Usted esta a punto de depositar $${nuevoMonto}. Desea confirmar?`);
            if (confirmacion) {
                deposito(nuevoMonto);
                alert('Deposito realizado con exito!');
                // limpiar el campo del formulario
                document.getElementById('monto').value = '';

                // ocultar la sección de depósito después de realizar el depósito
                document.getElementById('seccionDeposito').classList.add('oculto');

                // mostrar nuevamente la página principal
                document.getElementById('paginaPrincipal').classList.remove('oculto');
            } else {
                // limpiar el campo del formulario
                document.getElementById('monto').value = '';
                //volver a la pagina principal
                document.getElementById('seccionDeposito').classList.add('oculto');
                document.getElementById('paginaPrincipal').classList.remove('oculto');
            }

        } else {
            // monto ingresado no válido
            alert('El monto ingresado no es válido.');
        }
    });
    // botón "Cancelar" en la sección deposito
    document.getElementById('cancelarDeposito').addEventListener('click', function () {

        // volver a la página principal
        document.getElementById('seccionDeposito').classList.add('oculto');
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });

    // evento click sección de transferencias
    document.getElementById('botonTransferencias').addEventListener('click', function () {
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionTransferencias').classList.remove('oculto');
    });
    // evento submit formulario de transferencias
    document.getElementById('formularioTransferencia').addEventListener('submit', function (event) {
        event.preventDefault();

        const aliasCBU = document.getElementById('aliasCBU').value;
        const montoTransferir = parseFloat(document.getElementById('montoTransferir').value);

        // verificar que el monto a transferir sea menor o igual al saldo disponible
        if (montoTransferir <= saldo) {
            // verificar si el alias o CBU está en la agenda (A REALIZAR)

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
    // botón "Cancelar" en la sección transferencias
    document.getElementById('cancelarTransferencia').addEventListener('click', function () {
        // Limpiar los campos del formulario
        document.getElementById('aliasCBU').value = '';
        document.getElementById('montoTransferir').value = '';
        document.getElementById('seccionAgenda').classList.add('oculto');

        // volver a la página principal
        document.getElementById('paginaPrincipal').classList.remove('oculto');
        document.getElementById('seccionTransferencias').classList.add('oculto');
    });

    // boton "Ver Agenda" en la seccion trasnferencias
    // Evento click en el botón "Agenda" para mostrar/ocultar la agenda de contactos
    document.getElementById('botonAgenda').addEventListener('click', function () {
        const seccionAgenda = document.getElementById('seccionAgenda');
        if (seccionAgenda.classList.contains('oculto')){
            seccionAgenda.classList.remove('oculto');
            mostrarAgenda();
        } else {
            seccionAgenda.classList.add('oculto');
        }
    });
    
    //evento click seccion agendar contacto
    document.getElementById('botonContacto').addEventListener('click', function () {
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionAgendarContacto').classList.remove('oculto');
    });
    //evento submit formulario contacto
    document.getElementById('formularioContacto').addEventListener('submit', function (event) {
        event.preventDefault();

        const datosContacto = agregarContacto();
        const { nombre, alias, cbu } = datosContacto;

        // nueva instancia de la clase Contacto con los datos del formulario
        const nuevoContacto = new Contacto(nombre, alias, cbu);

        // agregar nuevo contacto al array agenda
        agenda.push(nuevoContacto);
        console.log(nuevoContacto);


        // limpiar los campos del formulario después de agregar el contacto
        document.getElementById('nombre').value = '';
        document.getElementById('alias').value = '';
        document.getElementById('cbu').value = '';

        // ocultar el formulario de contacto
        document.getElementById('seccionAgendarContacto').classList.add('oculto');
        // mostrar la página principal
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });
    // botón "Cancelar" en la sección de Contacto
    document.getElementById('cancelarAgendar').addEventListener('click', function () {

        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('alias').value = '';
        document.getElementById('cbu').value = '';

        // volver a la página principal
        document.getElementById('seccionAgendarContacto').classList.add('oculto');
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });

    //evento click seccion Plazo Fijo

    document.getElementById('botonPlazoFijo').addEventListener('click', function(){
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionPlazoFijo').classList.remove('oculto');


  
    });

    // botón "Cancelar" en la sección PF
    document.getElementById('cancelarPlazoFijo').addEventListener('click', function () {

        // volver a la página principal
        document.getElementById('seccionPlazoFijo').classList.add('oculto');
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });

});






