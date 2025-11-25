
//Components
import { ToDoList } from "./ToDoList.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
            

			<h1 className="text-center mt-5">To Do List con FETCH</h1>
			<div>
				<ToDoList/>
			</div>
		</div>
	);
};

export default Home;