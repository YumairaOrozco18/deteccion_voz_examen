let textCc = ''; // Variable que guardará el comando detectado
let comando = ''; // Variable que guardará el resultado de la detección de voz
let usuarioAutenticado = ''; // Variable para almacenar el nombre de usuario autenticado
let contraseñaAutenticada = ''; // Variable para almacenar la contraseña autenticada
let usuario = ''; // Variable para almacenar el nombre de usuario

// Función para obtener la hora del sistema
function obtenerHoraYFechaDelSistema() {
    // Obtener la fecha y hora actual
    var fechaHoraActual = new Date();

    // Extraer el año, mes y día
    var day = fechaHoraActual.getDate();
    var month = fechaHoraActual.getMonth() + 1; // Sumar 1 porque getMonth() devuelve valores de 0 a 11
    var year = fechaHoraActual.getFullYear();

    // Extraer la hora, minutos y segundos
    var hora = fechaHoraActual.getHours();
    var minutos = fechaHoraActual.getMinutes();
    var segundos = fechaHoraActual.getSeconds();

    // Formatear la fecha y hora en formato YYYY-MM-DD HH:MM:SS
    var fechaHoraFormateada = day + "-" + month + "-" + year + ", " + hora + ":" + minutos + ":" + segundos;

    // Devolver la fecha y hora formateada
    return fechaHoraFormateada;
}

// Función para enviar datos a una API ficticia
function almacenarOrden(orden, usuario) {
    // URL de la API de MockAPI.io donde almacenar la orden
    const apiUrl = 'https://662ef06d43b6a7dce30e0b6f.mockapi.io/comandos';

    // Datos de la orden a enviar
    const data = {
        orden: orden,
        usuario: usuario,
        fecha_hora: obtenerHoraYFecha() // Marcar el tiempo de la orden
    };

    // Configuración de la solicitud POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Realizar la solicitud POST a la API
    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => console.log('Orden almacenada:', data))
        .catch(error => console.error('Error al almacenar la orden:', error));
}

// Función para autenticar al usuario por voz
function autenticarUsuarioPorVoz() {
    // Verificar si el navegador soporta reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();

        recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

        // Iniciar el reconocimiento de voz para capturar el nombre de usuario y contraseña
        recognition.start();

        // Evento cuando la voz es detectada
        recognition.onresult = function (event) {
            const results = event.results;
            if (results && results.length > 0) {
                const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

                // Definir usuarios y contraseñas
                const usuariosContraseñas = [
                    { usuario: 'Ana', contraseña: '1234' },
                    { usuario: 'Fernando', contraseña: '0145' }
                ];

                let credencialesCorrectas = false;

                // Verificar si la oración contiene cada usuario y su contraseña correspondiente
                for (const { usuario, contraseña } of usuariosContraseñas) {
                    if (transcript.includes(usuario.toLowerCase()) && transcript.includes(contraseña.toLowerCase())) {
                        usuarioAutenticado = usuario;
                        contraseñaAutenticada = contraseña;
                        credencialesCorrectas = true;
                        break;
                    }
                }

                // Verificar si se encontraron credenciales correctas
                if (credencialesCorrectas) {
                    alert("Usuario autenticado: " + usuarioAutenticado);
                    iniciarReconocimientoDeVoz(); // Iniciar el reconocimiento de voz después de la autenticación
                } else {
                    alert("Credenciales incorrectas. Inténtalo de nuevo.");
                    autenticarUsuarioPorVoz(); // Volver a solicitar las credenciales
                }
            } else {
                console.log("No se detectaron resultados de voz.");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    } else {
        // Si no hay soporte para reconocimiento de voz
        console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
}
// Función para autenticar al usuario por voz
function autenticarUsuarioPorVoz() {
    // Verificar si el navegador soporta reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        const user = document.getElementById('usuario');

        recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

        // Iniciar el reconocimiento de voz para capturar el nombre de usuario y contraseña
        recognition.start();

        // Evento cuando la voz es detectada
        recognition.onresult = function (event) {
            const results = event.results;
            if (results && results.length > 0) {
                const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

                // Definir usuarios y contraseñas
                const usuariosContraseñas = [
                    { usuario: 'Ana', contraseña: '1234' },
                    { usuario: 'Fernando', contraseña: '8246' }
                ];

                let usuarioAutenticado = '';
                let contraseñaAutenticada = '';

                // Verificar si la oración contiene cada usuario y su contraseña correspondiente
                for (const { usuario, contraseña } of usuariosContraseñas) {
                    if (transcript.includes(usuario.toLowerCase()) && transcript.includes(contraseña.toLowerCase())) {
                        usuarioAutenticado = usuario;
                        contraseñaAutenticada = contraseña;
                        break;
                    }
                }

                // Verificar si se encontró un usuario autenticado
                if (usuarioAutenticado && contraseñaAutenticada) {
                    alert("Usuario autenticado: " + usuarioAutenticado);
                    user.textContent = 'Usuario Identificado: ' + usuarioAutenticado;
                    iniciarReconocimientoDeVoz(usuarioAutenticado); // Pasar el usuario autenticado como argumento
                } else {
                    alert("Credenciales incorrectas. Inténtalo de nuevo. (Recarga la página)");
                }
            } else {
                console.log("No se detectaron resultados de voz.");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    } else {
        // Si no hay soporte para reconocimiento de voz
        console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
}

// Función para iniciar el reconocimiento de voz después de la autenticación
function iniciarReconocimientoDeVoz() {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');

    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

    // Iniciar el reconocimiento de voz
    recognition.start();

    // Evento cuando la voz es detectada
    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript; // Obtener el texto reconocido

        comando = result;
        /* resultDiv.textContent = 'Orden identificada: ' + comando; */
        console.log("Comando Detectado: ", comando);

        switch (true) {
            case comando.includes('enciende la luz del cuarto'):
                outputDiv.textContent = 'enciende la luz del cuarto';
                almacenarOrden('Encender luz recamara', usuario);
                break;
        
            case comando.includes('apaga la luz del cuarto'):
                outputDiv.textContent = 'apaga la luz del cuarto';
                
                almacenarOrden('Apagar luz recamara', usuario);
                break;
        
            case comando.includes('enciende la luz de la sala'):
                outputDiv.textContent = 'enciende la luz de la sala';
                
                almacenarOrden('Encender  luz sala', usuario);
                break;
        
            case comando.includes('apaga la luz de la sala'):
                outputDiv.textContent = 'apaga la luz de la sala';
                
                almacenarOrden('Apagar luz sala', usuario);
                break;
        
            case comando.includes('enciende el foco uno del jardín'):
                outputDiv.textContent = 'enciende el foco uno del jardín';
                
                almacenarOrden('Encender foco uno jardín', usuario);
                break;
        
            case comando.includes('apaga el foco uno del jardín'):
                outputDiv.textContent = 'apaga el foco uno del jardín';
                
                almacenarOrden('Apagar foco uno jardín', usuario);
                break;
        
            case comando.includes('enciende el foco dos del jardín'):
                outputDiv.textContent = 'enciende el foco dos del jardín';
                
                almacenarOrden('Encender foco dos jardín', usuario);
                break;
        
            case comando.includes('apaga el foco dos del jardín'): 
                outputDiv.textContent = 'apaga el foco dos del jardín';
                
                almacenarOrden('Apagar foco dos jardín', usuario);
                break;
        
            case comando.includes('enciende el foco tres del jardín'):
                outputDiv.textContent = 'enciende el foco tres del jardín';
                
                almacenarOrden('Encender foco tres jardín', usuario);
                break;
        
            case comando.includes('apaga el foco tres del jardín'):
                outputDiv.textContent = 'apaga el foco tres del jardín';
                
                almacenarOrden('Apagar foco tres jardín', usuario);
                break;
        
            case comando.includes('enciende el foco cuatro del jardín'):
                outputDiv.textContent = 'enciende el foco cuatro del jardín';
                
                almacenarOrden('Encender foco cuatro jardín', usuario);
                break;
        
            case comando.includes('apaga el foco cuatro del jardín'):
                outputDiv.textContent = 'apaga el foco cuatro del jardín';
                
                almacenarOrden('Apagar foco cuatro jardín', usuario);
                break;
        
            case comando.includes('enciende el foco cinco del jardín'):
                outputDiv.textContent = 'enciende el foco cinco del jardín';
                
                almacenarOrden('Encender foco cinco jardín', usuario);
                break;
        
            case comando.includes('apaga el foco cinco del jardín'):
                outputDiv.textContent = 'apaga el foco cinco del jardín';
                
                almacenarOrden('Apagar foco cinco jardín', usuario);
                break;
        
            case comando.includes('enciende el ventilador'):
                outputDiv.textContent = 'enciende el ventilador';
                
                almacenarOrden('Encender ventilador', usuario);
                break;
        
            case comando.includes('apaga el ventilador'):
                outputDiv.textContent = 'apaga el ventilador';
                
                almacenarOrden('Apagar ventilador', usuario);
                break;
        
            case comando.includes('abre la primer cortina'):
                outputDiv.textContent = 'abre la primer cortina';
                
                almacenarOrden('Abrir cortina uno', usuario);
                break;
        
            case comando.includes('cierra la primer cortina'):
                outputDiv.textContent = 'cierra la primer cortina';
                
                almacenarOrden('Cerrar cortina uno', usuario);
                break;
        
            case comando.includes('abre la segunda cortina'):
                outputDiv.textContent = 'abre la segunda cortina';
                
                almacenarOrden('Abrir cortina dos', usuario);
                break;
        
            case comando.includes('cierra la segunda cortina'):
                outputDiv.textContent = 'cierra la segunda cortina';
                
                almacenarOrden('Cerrar cortina dos', usuario);
                break;
        
            case comando.includes('abre la tercer cortina'):
                outputDiv.textContent = 'abre la tercer cortina';
                
                almacenarOrden('Abrir cortina tres', usuario);
                break;
        
            case comando.includes('cierra la tercer cortina'):
                outputDiv.textContent = 'cierra la tercer cortina';
                
                almacenarOrden('Cerrar cortina tres', usuario);
                break;
        
            case comando.includes('activa la alarma'):
                outputDiv.textContent = 'activa la alarma';
                
                almacenarOrden('Activar alarma', usuario);
                break;
        
            case comando.includes('desactiva la alarma'):
                outputDiv.textContent = 'desactiva la alarma';
                
                almacenarOrden('Desactivar alarma', usuario);
                break;
        
            case comando.includes('enciende la primer camara de seguridad'):
                outputDiv.textContent = 'enciende la primer camara de seguridad';
                
                almacenarOrden('Encender camara uno', usuario);
                break;
        
            case comando.includes('Apaga la primer camara de seguridad'):
                outputDiv.textContent = 'Apaga la primer camara de seguridad';
                
                almacenarOrden('Apagar camara uno', usuario);
                break;
        
            case comando.includes('enciende la segunda camara de seguridad'):
                outputDiv.textContent = 'enciende la segunda camara de seguridad';
                
                almacenarOrden('Encender camara dos', usuario);
                break;
        
            case comando.includes('Apaga la segunda camara de seguridad'):
                outputDiv.textContent = 'Apaga la segunda camara de seguridad';
                
                almacenarOrden('Apagar camara dos', usuario);
                break;
        
            case comando.includes('enciende la tercer camara de seguridad'):
                outputDiv.textContent = 'enciende la tercer camara de seguridad';
                
                almacenarOrden('Encender camara tres', usuario);
                break;
        
            case comando.includes('Apaga la tercer camara de seguridad'):
                outputDiv.textContent = 'Apaga la tercer camara de seguridad';
                
                almacenarOrden('Apagar camara tres', usuario);
                break;
        
            default:
                alert('Comando no reconocido. Por favor, intenta de nuevo.');
        }
        
    };

    // Evento de error
    recognition.onerror = function (event) {
        console.error('Error de reconocimiento de voz:', event.error);
    };

    // Palabra clave para iniciar el reconocimiento de voz
    const activationKeyword = 'Ariel';

    // Evento para detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function () {
        console.log("Reconocimiento de voz terminado. Reiniciando...");
        recognition.start(); // Reinicia el reconocimiento de voz después de cada detección
    };
}
alert("Identifiquiese, a través de su usuario y contraseña por medio de voz");
// Verificar la autenticación del usuario por voz
autenticarUsuarioPorVoz();
