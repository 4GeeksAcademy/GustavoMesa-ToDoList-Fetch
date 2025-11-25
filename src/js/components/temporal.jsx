import { use } from "react";
import { useEffect, useState } from "react"


export const ToDoList = () => {

    const host = "https://playground.4geeks.com/todo";
    const user = "tavoo";

    //crea la nota
    const [note, setNote] = useState('');
    // edita la nota
    const [listNote, setlistNote] = useState([]);
    // muestra la lista de notas
    const [listNote, setListNote]= useState([]);


    const handleNote = (event) => { setNote(event.target.value) }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            label: note,
            is_done: false
        }

        const uri = `${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        console.log(options);
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
        setListNote('');
        getUser();
    }

    const handleDeleteNote = (deleteNote) => {
        setListNote(listNote.filter(item => item.id != deleteNote.id))
    }


    const getTodos = async () => {
        const uri = `${host}/users/${user}`;

        const options = {
            method: 'GET'
        }

        const response = await fetch(uri, options);
        console.log(response);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 404) {
                console.log('Por favor, crea el usuario', user);
            }
            if (response.status == 400) {
                console.log("Verifica hay algun error y trata de resolver");
            }
            return
        }

        const data = await response.json();
        console.log(data);
        setListNote(data.todos);
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="col-12 d-flex justify-content-center">
            <div className="col-4 card text-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 card-header text-start">
                        <input type="text" className="form-control" placeholder="Nota para recordar da enter para guardar"
                            value={note} onChange={handleNote} />
                    </div>
                </form>
                <div className="card-body">
                    <div className="card">
                        <ul className="list-group list-group-flush text-start">
                            {console.log("tipo de dato de listnote:",typeof listNote)}
                            {listNote.map((item) => {
                                return (
                                    <li key={item.id} className="hidden-icon list-group-item d-flex justify-content-between">
                                        {item.label}
                                        <span>
                                            <button onClick={() => handleDeleteNote(item)} type="button" className="btn btn-danger">Borrar</button>
                                        </span>


                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="card-footer text-body-secondary text-start">
                    {listNote.length == 0 ? 'No tienes' : listNote.length} Actividades pendientes
                </div>
            </div>
        </div>
    )
}