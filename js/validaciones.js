var aficiones = [];

var prefijos = {
    "CO": "+57", //Colombia
    "CL": "+56", //Chile
    "PE": "+51" //Peru :V
};

var longitudesMaximas = {
    "CO": 12, //Colombia
    "CL": 12, //Chile
    "PE": 12  //Peru :V
};

//ok
function validar() {
    var retorno_nombre_usuario = validar_nombre_usuario();
    var retorno_comuna = validar_comuna();
    var retorno_aficion = agregar_aficion();
    var retorno_aficion_validar = validar_aficiones();
    var retorno_contraseña = validar_contraseña();
    var retorno_confirmar_contraseña = validar_confirmar_contraseña();
    var retorno_url = validar_url_web();
    var retorno_direccion = validar_direccion();
    var retorno_confirm_prefijo = verificarSeleccionPais();
    actualizarPrefijo();
    console.log("retorno_nombre_usuario:", retorno_nombre_usuario);
    console.log("retorno_comuna:", retorno_comuna);
    console.log("retorno_aficion:", retorno_aficion);
    console.log("retorno_aficion_validar:", retorno_aficion_validar);
    console.log("retorno_contraseña:", retorno_contraseña);
    console.log("retorno_confirmar_contraseña:", retorno_confirmar_contraseña);
    console.log("retorno_url:", retorno_url);
    console.log("retorno_direccion:", retorno_direccion);
    console.log("retorno_confirm_prefijo:", retorno_confirm_prefijo);
    return retorno_confirm_prefijo && retorno_direccion && retorno_url && retorno_aficion_validar && retorno_aficion && retorno_nombre_usuario && retorno_contraseña && retorno_confirmar_contraseña && retorno_comuna;
};

//ok
function validar_nombre_usuario() {
    var input_nombre = document.getElementById('input-username');
    var div_error_nombre = document.getElementById('error-username');
    var nombre = input_nombre.value.trim();

    if (nombre === '') {
        div_error_nombre.innerHTML = 'El nombre de usuario es obligatorio';
        div_error_nombre.className = 'text-danger small mt-1 mb-2';
        return false;
    }

    if (nombre.length < 5 || nombre.length > 10) {
        div_error_nombre.innerHTML = 'El nombre de usuario debe tener entre 5 y 10 caracteres';
        div_error_nombre.className = 'text-danger small mt-1 mb-2';
        return false;
    }

    var primerCaracter = nombre.charAt(0);
    if (!tiene_letra(primerCaracter)) {
        div_error_nombre.innerHTML = 'El nombre de usuario debe comenzar con una letra';
        div_error_nombre.className = 'text-danger small mt-1 mb-2';
        return false;
    }

    var i;
    var seEncontraronDigitos = false;
    for (i = 1; i < nombre.length; i++) {
        var caracter = nombre.charAt(i);
        if (tiene_digito(caracter)) {
            seEncontraronDigitos = true;
            break;
        }
    }

    if (seEncontraronDigitos) {
        div_error_nombre.innerHTML = 'El nombre no puede contener letras después de los dígitos';
        div_error_nombre.className = 'text-danger small mt-1 mb-2';
        return false;
    }

    div_error_nombre.innerHTML = '';
    div_error_nombre.className = '';
    return true;
}

//ok
function validar_contraseña() {
    var nombre = document.getElementById('input-username').value;
    var contraseña = document.getElementById('input-contraseña').value;
    var div_error_contraseña = document.getElementById('error-contraseña');

    if (contraseña === '') {
        div_error_contraseña.innerHTML = 'La contraseña es obligatoria';
        div_error_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (contraseña.length < 3 || contraseña.length > 6) {
        div_error_contraseña.innerHTML = 'La contraseña debe tener entre 3 y 6 caracteres';
        div_error_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (nombre !== '' && contraseña.includes(nombre)) {
        div_error_contraseña.innerHTML = 'La contraseña no puede contener el nombre de usuario';
        div_error_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (!tiene_digito(contraseña)) {
        div_error_contraseña.innerHTML = 'La contraseña debe tener al menos un dígito';
        div_error_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (!tiene_letra(contraseña)) {
        div_error_contraseña.innerHTML = 'La contraseña debe tener al menos una letra';
        div_error_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else {
        div_error_contraseña.innerHTML = '';
        return true;

    };
};

//ok
function tiene_digito(str) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            return true;
        };
    };
    return false;
};

//ok
function tiene_letra(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z') || 'áéíóúÁÉÍÓÚñÑ'.includes(str[i])) {
            return true;
        };
    };
    return false;
};

//ok 
function tiene_signo(str) {
    var signos = [',', '@', '%', '$', '#'];
    for (var i = 0; i < str.length; i++) {
        if (signos.includes(str[i])) {
            return true;
        };
    };
    return false;
};

//ok
function validar_confirmar_contraseña() {
    var contraseña = document.getElementById('input-contraseña').value;
    var confirmar_contraseña = document.getElementById('input-confirmar-contraseña').value;
    var div_error_confirmar_contraseña = document.getElementById('error-confirmar-contraseña');

    if (contraseña === '') {
        div_error_confirmar_contraseña.innerHTML = 'Primero debe ingresar una contraseña en el campo anterior.';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (confirmar_contraseña === '') {
        div_error_confirmar_contraseña.innerHTML = 'Debe confirmar su contraseña';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;

    } else if (contraseña !== confirmar_contraseña) {
        div_error_confirmar_contraseña.innerHTML = 'Las contraseñas no coinciden';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1 mb-2';
        return false;
    } else {
        div_error_confirmar_contraseña.innerHTML = '';
        return true;
    };
};

//ok
function validar_url_web() {
    var url_pagina_web = document.getElementById('input-url').value.trim();
    var div_error_url = document.getElementById('error-url');
    var formato_inicio_url = ['http://', 'https://', 'www.'];

    if (url_pagina_web === "") {
        div_error_url.innerHTML = '';
        div_error_url.className = '';
        return true;
    };

    if (url_pagina_web.includes(" ")) {
        div_error_url.innerHTML = 'La URL no puede contener espacios.';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    var url_inicio_valido = formato_inicio_url.some(iniciourl => url_pagina_web.startsWith(iniciourl));
    if (!url_inicio_valido) {
        div_error_url.innerHTML = 'La URL debe comenzar con "http://", "https://", o "www.".';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    var primerPunto = url_pagina_web.indexOf('.');
    var ultimoPunto = url_pagina_web.lastIndexOf('.');
    if (primerPunto === -1 || ultimoPunto === -1 || primerPunto === ultimoPunto) {
        div_error_url.innerHTML = 'La URL debe contener al menos un nombre de página y su dominio';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    var parteIntermedia = url_pagina_web.substring(primerPunto + 1, ultimoPunto);
    if (parteIntermedia.trim() === "") {
        div_error_url.innerHTML = 'La parte de la URL entre los puntos no puede estar vacía.';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    var extension = url_pagina_web.substring(ultimoPunto + 1);
    var dominio = extension.length >= 2 && extension.length <= 5;
    if (!dominio) {
        div_error_url.innerHTML = 'El dominio debe tener entre 2 y 5 caracteres.';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    div_error_url.innerHTML = '';
    div_error_url.className = '';
    return true;
};

//ok
function verificarSeleccionPais() {
    var selectPais = document.getElementById("select-pais");
    var div_error_telefono = document.getElementById('error-telefono');
    var inputTelefono = document.getElementById('input-telefono');
    if (selectPais.value === "default") {
        div_error_telefono.innerHTML = 'Primero seleccione un prefijo de país';
        div_error_telefono.className = 'text-danger small mt-1 mb-2';
        inputTelefono.blur();
        return false;
    };
    return true;
};

//ok
function validar_comuna() {
    var select_comuna = document.getElementById('select-comuna');
    var div_error_comuna = document.getElementById('error-comuna');
    var comuna = select_comuna.value;

    if (comuna === 'default') {
        div_error_comuna.innerHTML = 'Debe seleccionar una comuna';
        div_error_comuna.className = 'text-danger small mt-1 mb-2';
        return false;
    } else {
        div_error_comuna.innerHTML = '';
        div_error_comuna.className = '';
        return true;
    };

};

//ok
function agregar_aficion() {
    var input_aficion = document.getElementById("input-aficion");
    var div_error_aficiones = document.getElementById('error-aficiones');
    var aficion = input_aficion.value.trim();
    var array_aficiones_minus = aficiones.map(aficion_minus => aficion_minus.toLowerCase());

    if (aficion !== "") {
        if (tiene_digito(aficion)) {
            div_error_aficiones.innerHTML = '* No puede tener dígitos el nombre de la afición.';
            div_error_aficiones.className = 'text-danger small mt-1 mb-2 mb-2';
            return false;
        }

        if (array_aficiones_minus.includes(aficion.toLowerCase()) === true) {
            div_error_aficiones.innerHTML = 'No puede seleccionar la misma afición dos veces seguidas.';
            div_error_aficiones.className = 'text-danger small mt-1 mb-2 mb-2';
            return false;
        }

        aficiones.push(aficion);

        var ul = document.getElementById('ul-aficiones');
        var li = document.createElement('li');
        li.className = 'list-group-item custom-color d-flex justify-content-between align-items-center';
        
        var span = document.createElement('span');
        span.textContent = aficion;
        li.appendChild(span);

        var boton_delete = document.createElement('button');
        boton_delete.textContent = 'x';
        boton_delete.className = 'btn btn-danger btn-sm';
        boton_delete.addEventListener('click', function () {
            var index = aficiones.indexOf(aficion);
            if (index !== -1) {
                aficiones.splice(index, 1);
                ul.removeChild(li);
            }
        });
        
        li.appendChild(boton_delete);
        ul.appendChild(li);

        input_aficion.value = "";
        div_error_aficiones.innerHTML = '* Minimo 2 aficiones.';
        return true;
    }
    return true;
}

//ok
function validar_aficiones() {
    var div_error_aficiones = document.getElementById('error-aficiones');
    if (aficiones.length < 2) {
        div_error_aficiones.innerHTML = '* Recuerda agregar mínimo 2 aficiones.';
        div_error_aficiones.className = 'text-danger small mt-1 mb-2 mb-2';
        return false;
    } else {
        div_error_aficiones.innerHTML = '';
        div_error_aficiones.className = '';
    }
    return true;
}

//ok
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("select-pais").addEventListener("change", function () {
        actualizarPrefijo();
    });
});

//ok
function actualizarPrefijo() {
    var selectPais = document.getElementById("select-pais");
    var inputTelefono = document.getElementById("input-telefono");
    var div_error_telefono = document.getElementById('error-telefono');

    if (selectPais.value === "default") {
        inputTelefono.value = '';
        div_error_telefono.innerHTML = 'El número de teléfono es obligatorio';
        div_error_telefono.className = 'text-danger small mt-1 mb-2';
        return;
    };

    var prefijo = prefijos[selectPais.value];

    if (inputTelefono.value.startsWith("+")) {
        inputTelefono.value = inputTelefono.value.substring(inputTelefono.value.indexOf(" ") + 1);
    };

    var numeroSinEspacios = inputTelefono.value.split(' ').join('');
    var contieneSoloDigitos = true;
    for (var i = 0; i < numeroSinEspacios.length; i++) {
        if (!(numeroSinEspacios[i] >= '0' && numeroSinEspacios[i] <= '9') && numeroSinEspacios[i] !== '+') {
            contieneSoloDigitos = false;
            break;
        };
    };

    if (!contieneSoloDigitos) {
        div_error_telefono.innerHTML = 'El número de teléfono solo puede contener dígitos';
        div_error_telefono.className = 'text-danger small mt-1 mb-2';
        return;
    };

    var numeroCompleto = prefijo + " " + numeroSinEspacios;
    var longitudMaxima = longitudesMaximas[selectPais.value];
    if (numeroCompleto.length > longitudMaxima + 1) {
        div_error_telefono.innerHTML = 'El número de teléfono excede la longitud máxima permitida para este país';
        div_error_telefono.className = 'text-danger small mt-1 mb-2';
        return;
    };

    div_error_telefono.innerHTML = '';
    div_error_telefono.className = '';

    inputTelefono.value = numeroCompleto;
};

//ok
function validar_direccion() {
    var direccion = document.getElementById("input-direccion").value.trim();
    var div_error_direccion = document.getElementById('error-direccion');

    if (direccion === '') {
        div_error_direccion.innerHTML = 'La dirección no puede estar vacía.';
        div_error_direccion.className = 'text-danger small mt-1 mb-2';
        return false;
    };

    for (var i = 0; i < direccion.length; i++) {
        var caracter = direccion[i];
        if (!tiene_letra(caracter) && !tiene_digito(caracter) && caracter !== ',' && caracter !== '#' && caracter !== '-' && caracter !== ' ') {
            div_error_direccion.innerHTML = 'La dirección no puede contener símbolos no admitidos.';
            div_error_direccion.className = 'text-danger small mt-1 mb-2';
            return false;
        };
    };

    div_error_direccion.innerHTML = '';
    div_error_direccion.className = '';

    return true;
};
