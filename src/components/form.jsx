'use client'
import { realAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { CircleAlert, RefreshCcw } from 'lucide-react'
import { toast } from "sonner";



const ErrorMessage = ({ message }) => (
    <div className="text-xs font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
        <CircleAlert className="inline m-2 size-4" /> {message}
    </div>
)



export default function Formulario() {

    const [state, action, pending] = useActionState(realAction, {})


    useEffect(() => {
        if (state.error) toast.error(state.error)
        if (state.success) toast.success(state.success)
    }, [state])


    return (
        <form action={action} className="mx-auto max-w-[600px] my-20 border-2 border-slate-300 p-4 flex flex-col gap-2 rounded-md shadow-xl">
            <h1 className="text-center text-xl">Formulario</h1>


            <div className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="nombre">Nombre:</label>
                <input id="nombre" name="nombre" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    // pattern="[A-Za-zÑñÁÉÍÓÚáéíóú]{1,15}"
                    // title="Mínimo 1 letra, máximo 15 letras"
                    defaultValue={state.values?.nombre}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.nombre && <ErrorMessage message={state.errors.nombre} />}



            <div className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$"
                    // title="Mínimo 8 caracteres, con una mayúscula, una minúscula y un número"
                    defaultValue={state.values?.password}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.password && <ErrorMessage message={state.errors.password.join(". ")} />}



            <div className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="confirmPassword">Confirmar Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    defaultValue={state.values?.confirmPassword}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.confirmPassword && <ErrorMessage message={state.errors.confirmPassword} />}



            <div className="grid grid-cols-2 gap-2  px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="edad">Edad:</label>
                <input type='number' id="edad" name="edad" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    // min={18} max={65}
                    defaultValue={state.values?.edad}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.edad && <ErrorMessage message={state.errors.edad} />}



            <div className="grid grid-cols-2 gap-2  px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="email">Email:</label>
                <input type='email' id="email" name="email" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    defaultValue={state.values?.email}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.email && <ErrorMessage message={state.errors.email} />}



            <div className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="telefono">Teléfono móvil:</label>
                <input type='tel' id="telefono" name="telefono" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    // pattern="[678]{1}[0-9]{8}"
                    // title="9 dígitos, siendo el primero 6,7 u 8"
                    defaultValue={state.values?.telefono}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.telefono && <ErrorMessage message={state.errors.telefono} />}



            <div className="grid grid-cols-2 gap-2  px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="fecha">Fecha de incidencia:</label>
                <input type="date" id="fecha" name="fecha" className="ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    // min="2026-01-01" max="2026-12-31"
                    defaultValue={state.values?.fecha || new Date().toISOString().split('T')[0]}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.errors?.fecha && <ErrorMessage message={state.errors.fecha} />}



            <fieldset className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <legend>Hobbies</legend>
                <label><input type="checkbox" name="hobbies" value="leer" defaultChecked={state.values?.hobbies.includes("leer")} /> Leer</label>
                <label><input type="checkbox" name="hobbies" value="deporte" defaultChecked={state.values?.hobbies.includes("deporte")} /> Deporte</label>
                <label><input type="checkbox" name="hobbies" value="cine" defaultChecked={state.values?.hobbies.includes("cine")} /> Cine</label>
                <label><input type="checkbox" name="hobbies" value="musica" defaultChecked={state.values?.hobbies.includes("musica")} /> Música</label>
            </fieldset>
            {state.errors?.hobbies && <ErrorMessage message={state.errors.hobbies} />}



            <fieldset className="px-4 py-2 rounded-md bg-indigo-50">
                <legend>Comentario</legend>
                <textarea id="comentario" name="comentario" className="w-full ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    defaultValue={state.values?.comentario}  // para recuperar el valor introducido previamente
                />
            </fieldset>
            {state.errors?.comentario && <ErrorMessage message={state.errors.comentario} />}



            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <input type="checkbox" name="condiciones" value="true" defaultChecked={state.values?.condiciones} />
                Acepto las condiciones
            </div>
            {state.errors?.condiciones && <ErrorMessage message={state.errors.condiciones} />}



            <button
                disabled={pending}
                className="disabled:bg-slate-600 bg-blue-600 text-white rounded-lg py-4 mt-4 hover:bg-blue-700 cursor-pointer" >
                {pending ? <RefreshCcw className="inline animate-spin size-4" /> : 'Insertar'}
            </button>

        </form >
    )
}

