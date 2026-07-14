'use server'


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validate(formData) {

    const datos = Object.fromEntries(formData.entries());
    const issues = {};
    const validatedData = {};

    // Validar id: puede ser número, string o null
    const id = datos.id;
    if (id !== undefined && id !== null && id !== '') {
        const numId = Number(id);
        validatedData.id = isNaN(numId) ? id : numId;
    } else {
        validatedData.id = null;
    }

    // Validar nombre: string, trimmed, min 1, max 5
    const nombre = typeof datos.nombre === 'string' ? datos.nombre.trim() : '';
    if (nombre.length < 1 || nombre.length > 5) {
        issues.nombre = 'El nombre debe tener entre 1 y 5 letras'
    } else {
        validatedData.nombre = nombre;
    }

    // Validar edad: número, min 18, max 65
    const edad = Number(datos.edad);
    if (isNaN(edad) || edad < 18 || edad > 65) {
        issues.edad = 'La edad debe estar entre 18 y 65 años'
    } else {
        validatedData.edad = edad;
    }

    // Validar teléfono: regex /^[678][0-9]{8}$/
    const telefono = typeof datos.telefono === 'string' ? datos.telefono.trim() : '';
    const telefonoRegex = /^[678][0-9]{8}$/;
    if (!telefonoRegex.test(telefono)) {
        issues.telefono = 'Escribe 9 dígitos, siendo el primero 6,7 u 8'
    } else {
        validatedData.telefono = telefono;
    }

    // Validar email
    const email = typeof datos.email === 'string' ? datos.email : '';
    if (!isValidEmail(email)) {
        issues.email = 'Email no válido'
    } else {
        validatedData.email = email;
    }

    // Validar fecha: debe estar dentro del año 2024
    const fechaStr = datos.fecha;
    const fecha = new Date(fechaStr);
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');

    if (isNaN(fecha.getTime()) || fecha < minDate || fecha > maxDate) {
        issues.fecha = 'La fecha debe estar dentro del año 2024'
    } else {
        validatedData.fecha = fecha;
    }

    // Validar comentario: opcional
    if (datos.comentario !== undefined && datos.comentario !== null) {
        validatedData.comentario = String(datos.comentario);
    }

    // Retornar resultado con issues
    if (issues.length > 0) {
        return {
            success: false,
            issues
        };
    }

    return {
        success: true,
        data: validatedData
    };
}


// How to (not) reset a form after a Server Action in React:
// https://www.robinwieruch.de/react-server-action-reset-form/ 
export async function realAction(prevState, formData) {

    const result = validate(formData)

    if (!result.success) {
        console.log('issues (cocinados) ', issues);
        return { issues, payload: formData }
    }

    try {
        // Hacemos algo (guardar en BD, enviar a API, ...) con
        // result.data
        console.log('result.data ', result.data);
        return { success: 'Éxito al realizar acción' }
    } catch (error) {
        console.log("Error:", error);
        return { error }
    }
}



