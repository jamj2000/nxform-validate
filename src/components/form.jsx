'use client'
import { realAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { CircleAlert, RefreshCcw } from 'lucide-react'
import { toast } from "sonner";
import Link from "next/link";



const ErrorMessage = ({ message }) => (
    <div className="text-xs font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
        <CircleAlert className="inline m-2 size-4" /> {message}
    </div>
)

const DocIcon = () => (
    <svg className="size-5" viewBox="0 0 56 56">
        <path d="M13.504 50.957h12.844a12.944 12.944 0 01-3.07-3.773h-9.563c-2.414 0-3.703-1.243-3.703-3.586V8.137c0-2.32 1.265-3.657 3.703-3.657h24.492c2.344 0 3.68 1.313 3.68 3.657v20.437a12.864 12.864 0 013.773 3.047V8.066c0-4.898-2.414-7.359-7.265-7.359H13.504c-4.828 0-7.266 2.484-7.266 7.36V43.62c0 4.898 2.438 7.336 7.266 7.336zm3.586-36.914h17.765c.82 0 1.454-.656 1.454-1.477 0-.796-.633-1.406-1.453-1.406H17.09c-.867 0-1.477.61-1.477 1.406 0 .82.61 1.477 1.477 1.477zm0 8.18h17.765c.82 0 1.454-.657 1.454-1.477 0-.797-.633-1.406-1.453-1.406H17.09c-.867 0-1.477.61-1.477 1.406 0 .82.61 1.477 1.477 1.477zm18.047 28.734c2.11 0 4.101-.61 5.742-1.71l5.273 5.296c.563.539 1.078.75 1.711.75 1.078 0 1.899-.844 1.899-2.04 0-.515-.258-1.03-.656-1.429l-5.344-5.343a10.526 10.526 0 001.898-6.047c0-5.836-4.71-10.547-10.523-10.547s-10.57 4.758-10.57 10.547c0 5.812 4.757 10.523 10.57 10.523zm0-3.352c-3.985 0-7.219-3.21-7.219-7.171 0-3.914 3.234-7.172 7.219-7.172 3.914 0 7.148 3.258 7.148 7.172 0 3.96-3.21 7.171-7.148 7.171z" />
    </svg>
)


export default function Formulario() {

    const [state, action, pending] = useActionState(realAction, {})


    useEffect(() => {
        if (state.error) toast.error(state.error)
        if (state.success) toast.success(state.success)
    }, [state])


    return (
        <form action={action} className="mx-auto max-w-150 my-20 border-2 border-slate-300 p-4 flex flex-col gap-2 rounded-md shadow-xl">
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



            <fieldset className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <legend>Nivel</legend>

                <label><input type="radio" name="nivel" value="AMATEUR" defaultChecked={state.values?.nivel === "AMATEUR"} /> Amateur</label>
                <label><input type="radio" name="nivel" value="JUNIOR" defaultChecked={state.values?.nivel === "JUNIOR"} /> Junior</label>
                <label><input type="radio" name="nivel" value="SENIOR" defaultChecked={state.values?.nivel === "SENIOR"} /> Senior</label>
                <label><input type="radio" name="nivel" value="VETERANO" defaultChecked={state.values?.nivel === "VETERANO"} /> Veterano</label>
            </fieldset>
            {state.errors?.nivel && <ErrorMessage message={state.errors.nivel} />}



            <div className="grid grid-cols-2 gap-2 px-4 py-2 rounded-md bg-indigo-50">
                <label htmlFor="ciudad">Ciudad</label>
                <select
                    id="ciudad"
                    key={state.values?.ciudad}
                    name="ciudad"
                    defaultValue={state.values?.ciudad ?? ""}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600"
                >
                    <option value="">Selecione una ciudad</option>
                    <option value="MADRID">Madrid</option>
                    <option value="BARCELONA">Barcelona</option>
                    <option value="VALENCIA">Valencia</option>
                    <option value="SEVILLA">Sevilla</option>
                </select>
            </div>
            {state.errors?.ciudad && <ErrorMessage message={state.errors.ciudad} />}


            <fieldset className="px-4 py-2 rounded-md bg-indigo-50">
                <legend>Comentario</legend>
                <textarea id="comentario" name="comentario" className="w-full ring-2 ring-blue-200 focus:ring-blue-300 focus:outline-none px-2 py-0.5 rounded-sm"
                    defaultValue={state.values?.comentario}  // para recuperar el valor introducido previamente
                />
            </fieldset>
            {state.errors?.comentario && <ErrorMessage message={state.errors.comentario} />}



            <div className="flex justify-between items-center px-4 py-2 rounded-md bg-indigo-50">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" name="condiciones" value="true" defaultChecked={state.values?.condiciones} />
                    Acepto las condiciones
                </label>
                <Link href="#"><DocIcon /></Link>
            </div>
            {state.errors?.condiciones && <ErrorMessage message={state.errors.condiciones} />}



            <button
                disabled={pending}
                className="disabled:bg-slate-600 bg-blue-600 text-white rounded-lg py-4 mt-4 hover:bg-blue-700 cursor-pointer" >
                {pending ? <RefreshCcw className="inline animate-spin size-4" /> : 'Enviar'}
            </button>

        </form >
    )
}

