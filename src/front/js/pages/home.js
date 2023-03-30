import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


const paperstyle={
	width:"800px",
	marginTop:"50px",
	border:"none",
	background: "#f5f5f5",
	boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
	padding: "30px",
	fontSize:"20px",
  }
  const inputstyle={
	border:"none",
	outline: "none",
	padding: "10px",
	borderRadius: "20px",
	background: "lightgreen",
	boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
	color: "white",
  }
  const buttonstyle={
	background: "#4caf50",
	border:"none",
	borderRadius: "20px",
	padding: "10px 20px",
	color: "#ff00ff",
	fontSize: "18px",
	cursor: "pointer",
	alignItems: "center",
  }
  const itemstyle={
	border: "none",
	borderBottom: "1px solid #ccc",
	padding: "10px",
	fontSize: "16px",
	color: "#333",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
  }
  

export const Home = () => {//Esta es la versión con estados dentro del componente
	const { store, actions } = useContext(Context);
	const [todos, setTodos] = useState([]); 	//[{},{},{}] estructura de la lista de tareas
	const [user, setUser] = useState("") // es el nombre del usuario propetario de la lista de To Do

	useEffect(() => {
		//creamos una función asíncrona que traerá la información de la lista de To Do
		const cargaDeDatos = async () => {
			let { respuestaJson, response } = await actions.useFetch(`/todos/user/${user}`)
			if (response.ok) {
				setTodos(respuestaJson)
			}
		}
		cargaDeDatos() //No olvidemos llamar a la función para que se ejecute

	}, [user]) //El componente se renderizará la primera vez y cada vez que el estado user cambie
	//useEffect(() => { console.log(user) }, [user])

	const eliminar = async (i) => {//Función para eliminar
		let arrTemp = todos.filter((item, index) => { return index != i })

		//Ahora envío la petición con la lista de To Do modificada, y espero la respuesta del servidor
		let { respuestaJson, response } = await actions.useFetch(`/todos/user/${user}`, arrTemp, "PUT")

		if (response.ok) {//Si la respuesta es positiva entonces se modificó en el backend
			console.log(response)
			setTodos(arrTemp) //reenderizando el componente con lo que está efectivamente en backend
		} else {
			alert("No se actualizó o no hubo conexión con la API")
		}

	}
	const añadir =  (value) => {
		let arrTemp = {label: value, done:false}
		setTodos([...todos, arrTemp])
		let { respuestaJson, response } = actions.useFetch(`/todos/user/${user}`, todos, "PUT")

		if (response.ok) {//Si la respuesta es positiva entonces se modificó en el backend
			console.log(response)
		} else {
			alert("No se actualizó o no hubo conexión con la API")
		}
	}

	return (
		<div >
			<div  className="container-fluid justify-content align-item-center" style={paperstyle}> 
			<input placeholder="Usa el usuario isrita" style={inputstyle} onChange={(e) => { setUser(e.target.value) }}></input>
			</div>
		<div className="container-fluid justify-content align-item-center" style={paperstyle}>
			<input style={inputstyle}  placeholder="Add Task" onKeyDown={(e)=>{
						if(e.keyCode=="13"){
							añadir(e.target.value)
						}
					}}></input>
			<hr />
			{todos && todos.length > 0 ? //Verifico el estado
				<ol>{todos.map((item, index) => { //Hago un map del estado y muestro los to do si existen
					return <li key={index} style={itemstyle} className="justify-content-between d-flex">
						{item.label}
						<button className="ocultar" type="button" style={buttonstyle}   //Agrego un botón para eliminar el todo
							onClick={() => {
								eliminar(index)	//este botón ejecuta esta acción y le pasamos el índice
							}}>
							X
						</button>
					</li>
				})}</ol>
				:
				<>No hay tareas por hacer</>
			}
		</div>
		</div>
		
	);
};
