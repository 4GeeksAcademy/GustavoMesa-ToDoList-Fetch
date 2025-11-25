import { useEffect, useState } from "react"


export const ToDoList = () => {

    const host = 'https://playground.4geeks.com/todo';
    const user = 'tavoo';

    //Crea la nota
    const [note, setNote] = useState('');
    //Muestra la nota 
    const [listNote, setlistNote] = useState([]);
    //Se edita la nota como tal
    const [noteEdit, setNoteEdit] = useState([]);
    //Para saber si la tarea esta completa
    const [noteComplete, setnoteComplete] =  useState();    
    //Se define si se muestra el edit o el crear Nota
    const [isEdit, setIsEdit] = useState(false);

    // se define una funcion asincrona para obtener la lista
    const handleListNote = async () => {

        //se define la url de la API
        const url = `${host}/users/${user}`;

        // se definen las opciones del request (peticion)
        const options = {
            method: 'GET'
        }
        //El fetch tiene 2 parametros URL y Options
        const response = await fetch(url, options)

        // Se verifica si la solicitud fue exitosa (peticion)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }

        // Si todo esta bien o la respuesta es OK se saca el JSON o (response) y se le asigna a un objeto
        const data = await response.json();
        setlistNote(data.todos);
        console.log(data);


    }

    const handleNote = (event) => { setNote(event.target.value) }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `${host}/todos/${user}`;

        const dataToSend = {
            label: note,
            is_done: false
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
        }

        const data = await response.json();
        handleListNote();
        setNote('');

        console.log(data);

    }

    const handleEditNote = (item) => {
        setIsEdit(!isEdit);
        setNoteEdit(item.label)
        setnoteComplete(item.is_done)
        console.log(item);
        
    }

    const handleDeleteNote = (deleteNote) => {
        setlistNote(listNote.filter(item => item.id != deleteNote.id))
    }

    useEffect(() => {
        handleListNote();
    }, [])

    return (
        <div className="col-12 d-flex justify-content-center">
            <div className="col-4 card text-center">
                {isEdit ?
                    // editar Nota
                    <form>
                        <div className="mb-3 card-header text-start">
                            <div className="">
                                <label htmlFor="inputEdit" className="form-label small">Editar nota</label>
                                <input type="text" className="form-control" value={noteEdit} onChange={handleEditNote} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label small" htmlFor="echeckEdit">Terminado</label>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="submit" className="btn btn-primary">Cancel</button>
                                </div>
                            </div>

                        </div>
                    </form>
                    :
                    //formulario para crear nota
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 card-header text-start">
                            <input type="text" className="form-control" placeholder="Nota para recordar da enter para guardar"
                                value={note} onChange={handleNote} />
                        </div>
                    </form>
                }

                <div className="card-body">
                    <div className="card">
                        <ul className="list-group list-group-flush text-start">
                            {listNote.map((item) => {
                                return (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div >
                                            {item.is_done ?
                                                <i className="fa-solid fa-circle-check text-success me-2"></i>
                                                :
                                                <i className="fa-solid fa-circle-xmark text-danger me-2"></i>
                                            }
                                            {item.label}
                                        </div>

                                        <div className="d-flex justify-content-between text-start">
                                            <span onClick={() => handleEditNote(item)}>

                                                <i className="fa-regular fa-pen-to-square text-success"></i>
                                            </span>
                                            <span onClick={() => handleDeleteNote(item)}>
                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="card-footer text-body-secondary text-start small">
                    {listNote.length == 0 ? 'No tienes' : listNote.length} Actividades pendientes
                </div>
            </div>
        </div>
    )
}


