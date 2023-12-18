//funciones
function inicioSesion(usuarioIngresado, contraseñaIngresada, usuarioRegistrado, contraseñaRegistrada) {
    if (usuarioIngresado == usuarioRegistrado && contraseñaIngresada == contraseñaRegistrada) {
        Swal.fire({
            title: 'Bienvenido ' + usuarioRegistrado + '!',
            text: 'Ya estás listo para operar',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        document.getElementById('sesion').classList.add('oculto');
        sessionStorage.setItem('nombreUsuario', usuarioRegistrado);

    } else {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrectos. Inténtelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });

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
    registrarMovimiento('Deposito', 'Deposito realizado', monto);
}

function agregarContacto() {
    const nombre = document.getElementById('nombre').value;
    const alias = document.getElementById('alias').value;
    const cbu = document.getElementById('cbu').value;

    // verificar si se completó al menos uno de los campos
    if (nombre === '' && alias === '' && cbu === '') {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
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

function registrarMovimiento(tipo, descripcion, monto) {
    const nuevoMovimiento = {
        tipo: tipo,
        descripcion: descripcion,
        monto: monto,
        fecha: new Date().toLocaleString(),
    };
    movimientos.unshift(nuevoMovimiento);

    if (movimientos.length > 15) {
        movimientos.pop();
    }
}

function mostrarUltimosMovimientos() {
    const seccionUltimosMovimientos = document.getElementById('seccionUltimosMovimientos');
    const listaMovimientos = document.getElementById('listaMovimientos');

    // Iterar sobre el array de movimientos y mostrar cada movimiento en la lista
    movimientos.forEach(movimiento => {
        const itemMovimiento = document.createElement('div');
        itemMovimiento.innerHTML = `
            <p>Tipo: ${movimiento.tipo}</p>
            <p>Descripción: ${movimiento.descripcion}</p>
            <p>Monto: $${movimiento.monto}</p>
            <p>Fecha: ${movimiento.fecha}</p>
            <hr>
        `;
        listaMovimientos.appendChild(itemMovimiento);
    });

    // Mostrar la sección de Últimos Movimientos
    seccionUltimosMovimientos.classList.remove('oculto');
}

function limpiarUltimosMovimientos() {
    const listaMovimientos = document.getElementById('listaMovimientos');
    listaMovimientos.innerHTML = ''; // Limpiar la lista de movimientos
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
let montoAInvertir = "";
let opcionPlazo = "";
let plazosFijos = []; //array plazos fijos 
let movimientos = []; //array movimientos




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
            Swal.fire({
                title: 'Error',
                text: 'Por favor, complete todos los campos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // verificar contraseña
        if (contraseña !== confirmarContrasenia) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden. Inténtelo de nuevo',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        usuarioRegistrado = usuario;
        contraseñaRegistrada = contraseña;
        Swal.fire({
            title: 'Registro Exitoso!',
            text: 'Ahora seras redirigido a la página principal para iniciar sesión',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });


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
            const confirmacion = Swal.fire({
                title: 'Verifique los Datos',
                text: `Esta por depositar $${nuevoMonto}, esta seguro?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario confirmó la acción
                    deposito(nuevoMonto);
                    Swal.fire({
                        title: 'Operacion Exitosa',
                        text: 'Depósito realizado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    // limpiar el campo del formulario
                    document.getElementById('monto').value = '';

                    // ocultar la sección de depósito después de realizar el depósito
                    document.getElementById('seccionDeposito').classList.add('oculto');

                    // mostrar nuevamente la página principal
                    document.getElementById('paginaPrincipal').classList.remove('oculto');

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // El usuario canceló la acción
                    Swal.fire(
                        'Cancelado',
                        'La acción ha sido cancelada.',
                        'error'
                    );
                    // limpiar el campo del formulario
                    document.getElementById('monto').value = '';
                    //volver a la pagina principal
                    document.getElementById('seccionDeposito').classList.add('oculto');
                    document.getElementById('paginaPrincipal').classList.remove('oculto');
                }
            });

        } else {
            // monto ingresado no válido
            Swal.fire({
                title: 'Error',
                text: 'El monto ingresado no es válido',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    // botón "Cancelar" en la sección deposito
    document.getElementById('cancelarDeposito').addEventListener('click', function () {
        //Limpiar campo del formulario
        document.getElementById('monto').value = '';

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
            const confirmacion = Swal.fire({
                title: 'Verifique los Datos',
                text: `Usted está a punto de transferir $${montoTransferir} a ${aliasCBU}. ¿Desea confirmar la operación?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // actualizar saldo
                    saldo -= montoTransferir;
                    mostrarSaldo();
                    registrarMovimiento('Transferencia', `Transferencia a ${aliasCBU}`, montoTransferir);

                    // alert operación exitosa
                    Swal.fire({
                        title: 'Operación Exitosa!',
                        text: 'Transferencia realizada exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    // limpiar campos del formulario
                    document.getElementById('aliasCBU').value = '';
                    document.getElementById('montoTransferir').value = '';

                    // volver a la página principal
                    document.getElementById('paginaPrincipal').classList.remove('oculto');
                    document.getElementById('seccionTransferencias').classList.add('oculto');

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // El usuario canceló la acción
                    Swal.fire(
                        'Cancelado',
                        'La acción ha sido cancelada.',
                        'error'
                    );
                }
            });
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
        if (seccionAgenda.classList.contains('oculto')) {
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
    document.getElementById('botonPlazoFijo').addEventListener('click', function () {
        console.log('Click en el botón "Plazo Fijo"');
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionPlazoFijo').classList.remove('oculto');

    });

    //confirmacion de Plazo Fijo
    //confirmacion de Plazo Fijo
    document.getElementById('formularioPlazoFijo').addEventListener('submit', function (event) {
        event.preventDefault();

        console.log('Click en el botón "Confirmación Plazo Fijo"');
        const montoAInvertir = parseFloat(document.getElementById('montoAInvertir').value);
        const plazoElegido = parseInt(document.getElementById('plazoElegido').value);

        const opcionesPlazo = [30, 90, 180, 270, 360];

        if (montoAInvertir <= saldo) {
            if (opcionesPlazo.includes(plazoElegido)) {
                console.log('Plazo elegido:', plazoElegido);
                const tasaAnual = 1.10; // 110% anual
                const montoAPlazo = montoAInvertir + (montoAInvertir * (tasaAnual * plazoElegido / 365));

                Swal.fire({
                    title: 'Verifique los Datos',
                    text: `Está a punto de invertir $${montoAInvertir} a plazo fijo por ${plazoElegido} días y recibirá $${montoAPlazo.toFixed(2)}. ¿Desea confirmar?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        saldo -= montoAInvertir;
                        mostrarSaldo();
                        registrarMovimiento('Plazo Fijo', `Plazo fijo por ${plazoElegido} días`, montoAInvertir);
                        const plazoFijo = {
                            monto: montoAInvertir,
                            plazo: plazoElegido,
                            montoTotal: montoAPlazo,
                        };
                        plazosFijos.push(plazoFijo);

                        Swal.fire({
                            title: 'Constitucion de plazo exitosa!',
                            text: 'Datos del Plazo Fijo:' + JSON.stringify(plazoFijo),
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        });
                        //Si se realiza con exito se limpia el formulario, se oculta la seccion PF y se vuelve a la pagina principal
                        document.getElementById('montoAInvertir').value = '';
                        document.getElementById('plazoElegido').value = '';
                        document.getElementById('seccionPlazoFijo').classList.add('oculto');
                        document.getElementById('paginaPrincipal').classList.remove('oculto');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            title: 'Operacion Cancelada',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });

                        //Volver a la pagina principal
                        document.getElementById('seccionPlazoFijo').classList.add('oculto');
                        document.getElementById('paginaPrincipal').classList.remove('oculto');
                    } else {
                        Swal.fire({
                            title: 'Fondos Insuficientes',
                            text: 'No posee saldo suficiente para realizar la operación.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ingrese un plazo valido para realizar la operación.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
        } else {
            Swal.fire({
                title: 'Fondos Insuficientes',
                text: 'No posee saldo suficiente para realizar la operación.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });


    // botón "Cancelar" en la sección PF
    document.getElementById('cancelarPlazoFijo').addEventListener('click', function () {
        document.getElementById('montoAInvertir').value = '';
        document.getElementById('plazoElegido').value = '';
        // volver a la página principal
        document.getElementById('seccionPlazoFijo').classList.add('oculto');
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });

    //evento click en la seccion Ultimos MOvimientos
    document.getElementById('botonMovimientos').addEventListener('click', function () {
        document.getElementById('paginaPrincipal').classList.add('oculto');
        document.getElementById('seccionUltimosMovimientos').classList.remove('oculto');
    });

    // Mostrar sección de Últimos Movimientos al hacer click en el botón correspondiente
    document.getElementById('botonUltimosMovimientos').addEventListener('click', function () {
        mostrarUltimosMovimientos();
    });

    document.getElementById('volverAtras').addEventListener('click', function () {
        limpiarUltimosMovimientos();

        // volver a la página principal
        document.getElementById('seccionUltimosMovimientos').classList.add('oculto');
        document.getElementById('paginaPrincipal').classList.remove('oculto');

    });
});
