import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const ToDo = () => {//Esta es la versión con estados centralizados, la razón de usar estados centralizados es poder comunicar estados entre componentes
    const { store, actions } = useContext(Context);
    const [refresh, setRefresh] = useState(false) //estado del compoenente para controlar su reenderizado
    const [newTask, setNewTask] = useState("");
    useEffect(() => {
        //ejecutamos una función asíncrona que traerá la información de la lista de To Do
        const cargaDatos = async () => {
            actions.getToDoList()
        }
        cargaDatos()
        let limpiar = document.querySelector("#tarea")
        limpiar.value = ""
    }, [store.user, refresh]) //El componente se renderizará la primera vez y cada vez que el estado user o refresh cambien

    useEffect(() => { console.log(store.todoList) }, [store.todoList])
    

    return (
        <div className="text-center mt-5">
            Lista de Tareas
            <br />
            <input
            placeholder="agrear nueva tarea a la lista"
            id="tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyUp={async (e) => {
                if (e.key == "Enter") {
                    console.log("tarea", newTask);
                    let resultado = await actions.agregarToDo(newTask);
                    if (resultado) {
                        setRefresh(!refresh);
                        setNewTask(""); //restauro el valor a vacío
                        actions.getToDoList(); //Actualiza la lista de tareas después de agregar una tarea
                    }
                }
            }}
            />

            <br />
            {store.todoList && store.todoList.length > 0 ? //Verifico el estado
                <ul>{store.todoList.map((item, index) => { //Hago un map del estado y muestro los to do si existen
                    return <li key={index}>
                        {item.label}
                        <button type="button"    //Agrego un botón para eliminar el todo
                            onClick={() => {
                                actions.eliminarToDo(index)	//este botón ejecuta esta acción y le pasamos el índice
                            }}>
                            Eliminar
                        </button>
                    </li>
                })}</ul>
                :
                <>No hay tareas por hacer o no existe el usuario, presione la tecla ENTER en el input de tareas para crear el usuario</>
            }
        </div>
    );
};
