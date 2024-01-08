import React, {useEffect, useState} from "react"; 

export const Todolist = () =>{
    const baseUrl = 'https://playground.4geeks.com/apis/fake/todos';
    const [ user, setUser] = useState ("Leire")
    const [ task, setTask] = useState("");
    const [ list, setList ] = useState([]);
    
    const postUser = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify([])
        };

        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const getTodo = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "GET"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList(data)
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const updateTask = async (newTask) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify([...list, newTask])
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const addTask = (event) =>{
        event.preventDefault();
        if (task.trim() === ""){
            return
        };
        const newTask = {label: task, done: false};
        setList([...list, newTask]);
        updateTask(newTask);
        setTask("")
    }

    const deleteUser = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "DELETE"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList([])
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const deleteTask= (item) => {
        const listWithoutDelete = list.filter((element, id) =>{
            return item != element;
        });
        console.log(listWithoutDelete);
        setList(listWithoutDelete);
        actualiceTaskDelete(listWithoutDelete)
    }

    const actualiceTaskDelete = async (listWithoutDelete) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(listWithoutDelete)
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }


    useEffect(() =>{
        getTodo()
    }, [])

    return(
        <div className="container">
            <h1 className="text-center m-2">Lista de tareas</h1>
            <button type="button" className="btn btn-primary m-2" onClick={postUser} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Nuevo perfil
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-header bg-light rounded">
                        <h3 className="modal-title fs-5">perfil creado</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
            </div> 
            <button type="button" className="btn btn-success m-2" onClick={getTodo}> 
                Tareas
            </button>
            <button type="button" className="btn btn-danger m-2" onClick={deleteUser}>
                Eliminar perfil
            </button>
            <div className="mb-3">
                <form onSubmit={addTask}>
                    <input className="form-control" placeholder="¿Cositas por hacer?" type="tet" value={task} onChange={(e) =>{setTask(e.target.value);}}/>
                </form>
            </div>
            <div className="list">
                <ul className="list-group"> 
                    {list.map((item, index) => {
                        return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                            {item.label}: {item.done ? 'Terminado' : 'Pendiente'}
                            <span key={index} onClick={() => {deleteTask(item)}}><i className="far fa-trash-alt text-dark"></i></span>
                        </li>
                    })}
                    <span className="list-group-item bg-light text-end fw-lighter">
                        {list.length === 0 ? "Sin tareas. ¿quieres añadir?" : list.length + " items left."}
                    </span>
                </ul>
            </div>
        </div>
    )
}