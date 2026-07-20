'use server'

import { z } from "zod";

const DataSchema = z.object({
    id: z.union([
        z.coerce.number(),
        z.string().nullish()
    ]),
    nombre: z.string()
        .trim()
        .min(1, "Al menos debe tener una letra")
        .max(15, "Como máximo debe haber 15 letras"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, "La contraseña debe tener al menos una mayúscula, una minúscula y un número"),
    confirmPassword: z.string(),
    edad: z.coerce.number()
        .min(18, "La edad mínima debe ser 18 años")
        .max(65, "La edad máxima debe ser 65 años"),
    telefono: z.string()
        .trim()
        .regex(/[678]{1}[0-9]{8}/, "Escribe 9 dígitos, siendo el primero 6,7 u 8"),
    email: z.email({ message: "Email no válido" }),
    fecha: z.coerce.date()
        .min(new Date("2026-01-01"), "La fecha debe estar dentro del año 2026")
        .max(new Date("2026-12-31"), "La fecha debe estar dentro del año 2026"),
    comentario: z.string()
        .trim()
        .optional(),
    hobbies: z.array(z.string())
        .min(1, "Debes marcar al menos un hobbie"),
    nivel: z.enum(["AMATEUR", "JUNIOR", "SENIOR", "VETERANO"], "Debes seleccionar un nivel"),
    ciudad: z.union([
        z.enum(["MADRID", "BARCELONA", "VALENCIA", "SEVILLA"]),
        z.string().nullish()
    ]),
    condiciones: z.boolean()
        .refine((v) => v === true, "Debes aceptar las condiciones")
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})




export async function realAction(prevState, formData) {

    // LEEMOS DATOS
    const data = {
        nombre: formData.get("nombre"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        edad: formData.get("edad"),
        email: formData.get("email"),
        telefono: formData.get("telefono"),
        fecha: formData.get("fecha"),
        comentario: formData.get("comentario"),
        hobbies: formData.getAll("hobbies"),                  // getAll devuelve un array con los valores de los checkboxes marcados
        nivel: formData.get("nivel"),
        ciudad: formData.get("ciudad"),
        condiciones: formData.get("condiciones") === "true",  // true o false
    }


    // VALIDAMOS DATOS
    const result = DataSchema.safeParse(data)
    // https://zod.dev/ERROR_HANDLING?id=zodparsedtype
    // result puede ser de 2 tipos:
    // { success: true, data: z.infer<typeof schema> } 
    // { success: false, error: issues[] }  


    // SI HAY ERRORES: devolvemos un objeto con las propiedades errors y values
    if (!result.success) {
        const { formErrors, fieldErrors } = z.flattenError(result.error);   // https://zod.dev/error-formatting?id=zflattenerror#zflattenerror
        // console.log('FieldErrors ', fieldErrors);
        return { errors: fieldErrors, values: data }
    }


    // REALIZAMOS LA ACCIÓN SOBRE result.data
    try {
        // Hacemos algo (guardar en BD, enviar a API, ...) con result.data
        // console.log('result.data ', result.data);
        return { success: 'Éxito al realizar acción' }
    } catch (error) {
        console.log("Error:", error);
        return { error }
    }
}



